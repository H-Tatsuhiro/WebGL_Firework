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

    let vertices = [];
    vertices.push(new THREE.Vector3(0, -400, 0));
    const geo = new THREE.BufferGeometry().setFromPoints(vertices);
    const points_material = new THREE.PointsMaterial({
        size: 10,
        color: 0xFFFFFF,
    });
    const mesh = new THREE.Points(geo, points_material);
    scene.add(mesh)

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
    let moveToPlus = true;

    frameUpdate();

    function frameUpdate() {
        requestAnimationFrame(frameUpdate);

        const sec = performance.now() / 1000;

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

        let mt = true;
        if (vertices[0].y <= 400 && vertices[0].y >= -400) {
            if (mt) moveToPlus = 1;
            else moveToPlus = -1;
        } 
        else if (vertices[0].y > 400) mt = false;
        else if (vertices[0].y < -400) mt = true;
        vertices[0].y += moveToPlus * sec * 5;
        const geo = new THREE.BufferGeometry().setFromPoints(vertices);
        const mesh = new THREE.Points(geo, points_material);
        scene.add(mesh)
        renderer.render(scene, camera);
    }
}