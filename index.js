window.addEventListener("DOMContentLoaded", init)

function init() {
    const width = window.innerWidth, height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        10000
    );
    camera.position.set(0, 0, +1000);

    const material = new THREE.LineBasicMaterial({
        color: 0x990000
    });

    let points = [];
    points.push(new THREE.Vector3(150, 0, 0));
    points.push(new THREE.Vector3(0, 150, 0));
    points.push(new THREE.Vector3(0, 0, 0))
    points.push(new THREE.Vector3(150, 0, 0));

    const points_tmp = points;

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);

    const directionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, 1, 1);

    scene.add(directionalLight);

    renderer.render(scene, camera);

    resizeEvent();

    window.addEventListener("resize", resizeEvent);

    function resizeEvent() {
        const width = window.innerWidth, height = window.innerHeight;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }

    let moveToRight = true;

    frameUpdate();

    function frameUpdate() {
        requestAnimationFrame(frameUpdate);
        if (points[2].x == 350) {
            moveToRight = false;
        } else if (points[2].x == -350) {
            moveToRight = true;
        }
        for (let i = 0; i < points.length; i++) {
            let diff = 0;
            if (moveToRight) diff = 10;
            else diff = -10;
            points[i].x += diff;
        }
        const scene = new THREE.Scene();
        scene.add(directionalLight);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        renderer.render(scene, camera);
    }
}