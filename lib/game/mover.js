import Base from './base';

class Mover extends Base {
  constructor(scene, camera, bounds) {
    super(scene, camera);

    this.velocity = {
      x : 0.41,
      y : 0,
      z : 0.1
    };

    this.bounds = bounds;
  }
}

export default Mover;
