var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;


// Camera
var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );

// camera.position.z = 20;
camera.position.y = 16;

// Sphere
var geometry = new THREE.SphereGeometry( 1, 32 / 2, 32 / 2 );
var material = new THREE.MeshBasicMaterial( {
  color: 0xff00ff,
  wireframe : !true
} );

// var material = new THREE.MeshPhongMaterial({
//   color : 0xff00ff,
//   // metal: false,
//   // map: THREE.ImageUtils.loadTexture('img/bump.jpg'),
//   // bumpMap : THREE.ImageUtils.loadTexture('img/bump2.jpg'),
//   // bumpScale: 0.2,
//   // side: THREE.DoubleSide
// });

var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

sphere.castShadow = true;
sphere.receiveShadow = true;
sphere.velocity = {
  x : 0.41,
  y : 0,
  z : 0.1
};
sphere.position.y = 1;



// Plane

var geometry = new THREE.PlaneGeometry( 32, 32, 32 / 4 );

var material = new THREE.MeshBasicMaterial( {
  color: 0xffff00,
  side: THREE.DoubleSide,
  wireframe : !true
});

// var material = new THREE.MeshPhongMaterial({
//   // color : 0xffff00,
//   // metal: false,
//   map: THREE.ImageUtils.loadTexture('img/bump.jpg'),
//   // bumpMap : THREE.ImageUtils.loadTexture('img/bump2.jpg'),
//   // bumpScale: 0.2,
//   side: THREE.DoubleSide
// });


var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

plane.receiveShadow	= true;
plane.rotation.x = 90 * Math.PI / 180;
camera.lookAt(plane.position);


// Light

ambientLight = new THREE.AmbientLight( 0xeeeeee );
scene.add( ambientLight );

var light = new THREE.SpotLight( 0xffffff );
light.position.set( 0, 40, 0 );
light.shadowCameraNear = 0.01;
light.castShadow = true;
light.shadowDarkness = 0.5;
light.shadowCameraVisible	= !true;
light.target = plane;
scene.add( light );




function bounceSphere() {
  TweenMax.killTweensOf(sphere.position);
  TweenMax.to(sphere.position, 0.1, {
    y : 2,
    ease : Quart.easeOut,
    onComplete : function () {
      TweenMax.to(sphere.position, 0.8, {
        y : 1,
        ease : Bounce.easeOut
      });
    }
  });
}


// Render

function render() {
  requestAnimationFrame( render );

  sphere.position.x += sphere.velocity.x;
  sphere.position.y += sphere.velocity.y;
  sphere.position.z += sphere.velocity.z;

  if (sphere.position.x < -plane.geometry.parameters.width/2 || sphere.position.x > plane.geometry.parameters.width/2) {
    sphere.velocity.x *= -1;
    bounceSphere();
  }

  if (sphere.position.y < -10 || sphere.position.y > 10) {
    sphere.velocity.y *= -1;
  }

  if (sphere.position.z < -plane.geometry.parameters.height/2 || sphere.position.z > plane.geometry.parameters.height/2) {
    sphere.velocity.z *= -1;
    // bounceSphere();
  }

  camera.position.x = sphere.position.x / 4;
  camera.position.z = 26 + sphere.position.z / 8;

  camera.lookAt({
    y : plane.position.y,
    z : plane.position.z,
    x : sphere.position.x / 2
  });

  renderer.render( scene, camera );
}
render();
