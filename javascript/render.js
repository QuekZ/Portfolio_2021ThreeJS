var renderer;

function init() {

    let stats = new Stats();
    document.body.appendChild(stats.domElement);

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.autoClear = false;

    scene.background = null;


    renderer.setClearColor(new THREE.Color(0x000000, 0));
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.shadowMap.enabled = true;


    /*let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    let cube = new THREE.Mesh(cubeGeometry, material);
    scene.add(cube);*/

    let cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

    let textureLoader = new THREE.TextureLoader();
    let cubes = [];



    const textureMaterial = new THREE.MeshLambertMaterial({
        map: textureLoader.load('images/logoTexture.png'),
        transparent: true
    });

    const cube = new THREE.Mesh(cubeGeometry, textureMaterial);
    scene.add(cube);
    cubes.push(cube);
    cube.position.x = 0;
    cube.position.y = 0;

    let ambientLight = new THREE.AmbientLight(0x888888);
    scene.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(0, 2, 1);
    directionalLight.lookAt(cube);
    scene.add(directionalLight);


    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 5;
    camera.position.z = 5;
    camera.lookAt(scene.position);



    // add the output of the renderer to the html element
    document.getElementById("renderCanvas").appendChild(renderer.domElement);

    // call the render function
    renderScene();

    function renderScene() {
        updateCamera();
        stats.update();


        // render using requestAnimationFrame
        requestAnimationFrame(renderScene);

        renderer.render(scene, camera);
    }

    function updateCamera() {
        camera.updateProjectionMatrix();
        cube.rotation.y += 0.01;
        cube.rotation.x += 0.01;
    }




    function onResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onResize, false);

}