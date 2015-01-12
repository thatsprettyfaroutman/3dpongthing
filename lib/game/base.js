class Base {
  constructor (scene, camera) {
    if (!scene) {
      console.warn('"scene" missing');
      return false;
    }
    this.scene = scene;

    if (!camera) {
      console.warn('"camera" missing');
      return false;
    }
    this.camera = camera;
  }
}

export default Base;
