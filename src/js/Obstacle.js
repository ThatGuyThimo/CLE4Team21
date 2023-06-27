import { Resources } from './resources';
import * as ex from 'excalibur';

export class Box extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Box')
    });
    const boxSprite = Resources.box.toSprite();
    this.graphics.use(boxSprite);
    this.scale = ex.vec(2.2);
  }
}
