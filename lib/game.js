import THREE from 'three';
import Level from './game/level';

class Game {
  constructor(container) {
    var self = this;

    // Create scene
    self.scene = new THREE.Scene();

    // Create renderer
    self.renderer = new THREE.WebGLRenderer({ antialias : true });
    self.renderer.setSize( window.innerWidth, window.innerHeight );
    self.renderer.shadowMapEnabled = true;
    self.renderer.shadowMapType = THREE.PCFSoftShadowMap;
    container.appendChild( self.renderer.domElement );

    // Create camera
    self.camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 1000 );
    self.camera.position.y = 16;
    self.camera.position.z = 26;


    self.level = new Level(self.scene, self.camera, 32, 32);

    self.render();

    window.addEventListener('resize', function () {
      self.resize();
    });

  }

  render () {
    var self = this;
    requestAnimationFrame( function () {
      self.render();
    });

    self.level.onRender();

    self.renderer.render( self.scene, self.camera );
  }

  resize () {
    var self = this;

    self.camera.aspect = window.innerWidth / window.innerHeight;
    self.camera.updateProjectionMatrix();
    self.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}

export default Game;
