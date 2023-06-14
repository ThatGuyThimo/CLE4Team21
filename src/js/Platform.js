import * as ex from 'excalibur';

export class Platform extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      color: ex.Color.Green, // Set the color to Green
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Platform'),
    });
  }
}