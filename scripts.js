var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xed1c24 );

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.z = 200;
camera.position.z = 350;

var renderer = new THREE.WebGLRenderer({ antialias: true  });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;

// var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
// keyLight.position.set(-100, 0, 100);

var keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(-100, 0, 100);
keyLight.castShadow = true;

// var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
// fillLight.position.set(100, 0, 100);

var fillLight = new THREE.DirectionalLight(0xffffff, 1);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('assets/tree/');
mtlLoader.setPath('assets/tree/');
mtlLoader.load('asian_tree_export.mtl', function (materials) {

    materials.preload();
    console.log(materials);
    for (key in materials.materials) {
      console.log('key:', key);
      if (materials.materials.hasOwnProperty(key)) {
        console.log('has own property ', key);
        materials.materials[key].alphaTest = 0.5;
        materials.materials[key].side = THREE.DoubleSide;
      }
    }

    // materials.materials.flower.side = THREE.DoubleSide;

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/tree/');
    objLoader.load('asian_tree_export.obj', function (object) {

        scene.add(object);
        object.position.y -= 60;


    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
  scene.rotation.y += 0.002;
	renderer.render(scene, camera);
};

animate();
