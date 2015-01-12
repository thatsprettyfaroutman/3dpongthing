import THREE from 'three';
import Base from './base';
import Ball from './ball';

class Field extends Base {

  constructor(scene, camera, width, height) {
    super(scene, camera);
    this.width = width;
    this.height = height;
    this.init();
  }

  init () {

    // Plane or field
    var geometry = new THREE.PlaneGeometry(this.width, this.height, 32);
    var material = new THREE.MeshBasicMaterial({
      color : 0xffff00,
      side : THREE.DoubleSide
    });

    this.plane = new THREE.Mesh(geometry, material);
    this.plane.receiveShadow	= true;
    this.plane.rotation.x = 90 * Math.PI / 180;
    this.camera.lookAt(this.plane.position);
    this.scene.add( this.plane );

    // Lights
    var ambientLight = new THREE.AmbientLight( 0xeeeeee );
    this.scene.add( ambientLight );

    var light = new THREE.SpotLight( 0xffffff );
    light.position.set( 0, 40, 0 );
    light.shadowCameraNear = 0.01;
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    light.shadowCameraVisible	= !true;
    light.target = this.plane;
    this.scene.add( light );

    // Ball
    this.ball = new Ball(this.scene, this.camera, {
      x : this.width / -2,
      z : this.height / -2,
      width : this.width,
      height : this.height
    });

  }

  onRender() {
    var ballPosition = this.ball.updatePosition();

    this.camera.lookAt({
      y : this.plane.position.y,
      z : this.plane.position.z,
      x : ballPosition.x / 2
    });

  }

}

export default Field;
