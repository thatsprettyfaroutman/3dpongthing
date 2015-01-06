var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;


// Camera
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 20;
camera.position.y = 6;

// Sphere
var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xff00ff,
  wireframe : !true
} );

var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.velocity = {
  x : 0.1,
  y : 0,
  z : 0.11
};
sphere.position.y = 1;



// Plane
var geometry = new THREE.PlaneGeometry( 32, 32, 32, 32 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xffff00,
  side: THREE.DoubleSide,
  wireframe : !true
});
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.receiveShadow	= true;
plane.rotation.x = 90 * Math.PI / 180;
camera.lookAt(plane.position);


// Light

var light = new THREE.SpotLight( 0xffffff );
light.position.set( 10, 20, 0 );
light.shadowCameraNear = 0.01;
light.castShadow = true;
light.shadowDarkness = 0.5;
light.shadowCameraVisible	= !true;
light.target = sphere;
scene.add( light );



// Render

function render() {
  requestAnimationFrame( render );

  sphere.position.x += sphere.velocity.x;
  sphere.position.y += sphere.velocity.y;
  sphere.position.z += sphere.velocity.z;

  if (sphere.position.x < -plane.geometry.parameters.width/2 || sphere.position.x > plane.geometry.parameters.width/2) {
    sphere.velocity.x *= -1;
  }

  if (sphere.position.y < -10 || sphere.position.y > 10) {
    sphere.velocity.y *= -1;
  }

  if (sphere.position.z < -plane.geometry.parameters.height/2 || sphere.position.z > plane.geometry.parameters.height/2) {
    sphere.velocity.z *= -1;
  }

  camera.lookAt(sphere.position);

  renderer.render( scene, camera );
}
render();
