import * as ex from 'excalibur';

export class Background extends ex.Actor {
  constructor(x, y, width, height, image) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      anchor: ex.Vector.Zero,
    });

    const sprite = new ex.Sprite(image);
    this.graphics.use(sprite);
  }
}
