import THREE from 'three';
import Mover from './mover';

class Ball extends Mover {
  constructor(scene, camera, bounds) {
    super(scene, camera, bounds);
    this.init();
  }

  init() {

    var geometry = new THREE.SphereGeometry( 1, 32 / 2, 32 / 2 );
    var material = new THREE.MeshBasicMaterial( {
      color: 0xff00ff,
      wireframe : !true
    } );

    this.sphere = new THREE.Mesh( geometry, material );

    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;
    this.sphere.position.y = 1;
    this.scene.add( this.sphere );

    console.log(this.bounds);
  }

  updatePosition () {
    this.sphere.position.y += this.velocity.y;
    this.sphere.position.x += this.velocity.x;
    this.sphere.position.z += this.velocity.z;

    if (this.sphere.position.x < this.bounds.x || this.sphere.position.x > this.bounds.x + this.bounds.width) {
      this.velocity.x *= -1;
    }

    if (this.sphere.position.z < this.bounds.z || this.sphere.position.z > this.bounds.z + this.bounds.height) {
      this.velocity.z *= -1;
    }

    return this.sphere.position;
  }
}

export default Ball;
