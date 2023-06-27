import { Resources } from './resources';
import * as ex from 'excalibur';

class Box extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Box')
    });
    const box = Resources.box.toSprite();
    this.graphics.use(box);
    this.scale = ex.vec(2,2);
    
  }
}

class Trash extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      name: "damageObstacle",
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Trash')
    });
    const trash = Resources.trash.toSprite();
    this.graphics.use(trash);
    this.scale = ex.vec(2,2);
    
  }
}

class Plantenbak extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Plantenbak')
    });
    const plantenbak = Resources.plantenbak.toSprite();
    this.graphics.use(plantenbak);
    this.scale = ex.vec(1.6,1.6);
    
  }
}

class Spike extends ex.Actor {
  constructor(x, y, width, height) {
    super({
      pos: new ex.Vector(x, y),
      width: width,
      height: height,
      name: "damageObstacle",
      anchor: ex.Vector.Zero,
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName('Spike')
    });
    const spike = Resources.spike.toSprite();
    this.graphics.use(spike);
    this.scale = ex.vec(1.6,1.6);
    
  }
}


export {Trash, Box, Plantenbak, Spike}