window.addEventListener("DOMContentLoaded", init)

function init() {
    const width = window.innerWidth, height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas")
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        10000
    );
    camera.position.set(0, 0, +1000);

    // 箱を作成
    const material = new THREE.LineBasicMaterial({
        color: 0x990000
    });

    const points = [];
    points.push(new THREE.Vector3(150, 0, 0));
    points.push(new THREE.Vector3(0, 150, 0));
    points.push(new THREE.Vector3(0, 0, 150));
    points.push(new THREE.Vector3(150, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(
        0xffffff
    );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    // 初回実行
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
}