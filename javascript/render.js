var renderer;
let composer, shaderTime = 0,
    badTVPass, staticPass, rgbPass, filmPass, renderPass,
    copyPass;

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

function init() {

    let stats = new Stats();
    document.body.appendChild(stats.domElement);
    const color = 0x000000;
    let scene = new THREE.Scene();
    scene.fog = new THREE.Fog(color, 50, 500);
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        //alpha: true
    });
    camera.position.z = 8;
    //renderer.autoClear = false;
    //scene.background = null;
    renderer.setClearColor(new THREE.Color(0x000030, ));
    renderer.setSize(window.innerWidth, window.innerHeight);

    //### Postprocessing ###

    //Create Shader Passes
    //renderPass = new THREE.RenderPass(scene, camera);
    /*badTVPass = new ShaderPass(THREE.BadTVShader);
    rgbPass = new ShaderPass(THREE.RGBShiftShader);
    filmPass = new ShaderPass(THREE.FilmShader);
    staticPass = new ShaderPass(THREE.StaticShader);
    copyPass = new ShaderPass(THREE.CopyShader);*/

    //set shader uniforms
    //filmPass.uniforms.grayscale.value = 0;



    /*composer.addPass(renderPass);
    composer.addPass(filmPass);
    composer.addPass(badTVPass);
    composer.addPass(rgbPass);
    //composer.addPass(staticPass);
    composer.addPass(copyPass);
    copyPass.renderToScreen = true;*/

    //### Postprocessing ###

    particle = new THREE.Object3D();
    scene.add(particle);

    const textureLoader = new THREE.TextureLoader();
    const normalTexture = textureLoader.load('texture/normalMapMetal6.png');

    let geometry = new THREE.SphereBufferGeometry(6, 1, 1);
    let material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.2,
        metalness: 0.1,
        emissive: 0x000055,
        normalMap: normalTexture
    });

    for (var i = 0; i < 200; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(50 + (Math.random() * 65));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }

    let pointLightPink = new THREE.PointLight(0xff0080, 80);
    pointLightPink.position.x = 30;
    pointLightPink.position.y = 20;
    pointLightPink.position.z = 10;
    scene.add(pointLightPink);

    let pointLightGreen = new THREE.PointLight(0x00ff00, 60);
    pointLightGreen.position.x = 20;
    pointLightGreen.position.y = 10;
    pointLightGreen.position.z = 10;
    scene.add(pointLightGreen);

    let pointLightRed = new THREE.PointLight(0xff0000, 100);
    pointLightRed.position.x = 50;
    pointLightRed.position.y = 50;
    pointLightRed.position.z = 5;
    scene.add(pointLightRed);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 25);
    scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    // add the output of the renderer to the html element
    document.getElementById("renderCanvas").appendChild(renderer.domElement);

    // call the render function
    renderScene();

    function renderScene() {
        updateCamera();
        stats.update();
        particle.rotation.y += 0.0010;
        //composer.render();

        //###########################################################
        //To move the 3D meshes around but its not working in iframes
        //target.x = (1 - mouse.x) * 0.002;
        //target.y = (1 - mouse.y) * 0.002;
        //camera.rotation.x += 0.004 * (target.y - camera.rotation.x);
        //camera.rotation.y += 0.004 * (target.x - camera.rotation.y);
        //###########################################################
        requestAnimationFrame(renderScene);

        renderer.render(scene, camera);
    }

    function updateCamera() {
        camera.updateProjectionMatrix();
    }

    function onResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize, false);

    function onMouseMove(event) {
        mouse.x = (event.clientX - windowHalf.x);
        mouse.y = (event.clientY - windowHalf.x);
    }
    window.addEventListener("mousemove", onMouseMove);

}