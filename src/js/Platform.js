import * as ex from 'excalibur';

export class Platform extends ex.Actor {

  DataClass

  constructor(x, y, width, height, DataClass) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Platform'),
    });
    this.DataClass = DataClass
  }

  onPreUpdate() {
    if(this.DataClass.getPlayerPosition() +1000 > this.width + this.pos.x){
      this.pos.x = this.width + this.pos.x -1000
    }
  }
}