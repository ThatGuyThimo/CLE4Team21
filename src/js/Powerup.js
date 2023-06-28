import * as ex from 'excalibur'
import { Resources } from './resources';

class ShieldPowerUp extends ex.Actor {
    constructor(x, y, width, height) {
      super({
        pos: new ex.Vector(x, y),
        width: width,
        height: height,
        name: "shieldPowerUp",
        anchor: ex.Vector.Zero,
        collisionType: ex.CollisionType.Passive,
        collisionGroup: ex.CollisionGroupManager.groupByName('shieldpowerup')
      });

      let spriteSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.shieldbubblesheet,
        grid: {
            rows: 3,
            columns: 2,
            spriteWidth: 64,
            spriteHeight: 64
        }
    })

    const animation = ex.Animation.fromSpriteSheet(spriteSheet, ex.range(0, 5), 150);

    this.graphics.use(animation);
    this.scale = ex.vec(1,1);
      
    }
  }

class SpeedPowerUp extends ex.Actor {
    constructor(x, y, width, height) {
      super({
        pos: new ex.Vector(x, y),
        width: width,
        height: height,
        name: "speedPowerUp",
        anchor: ex.Vector.Zero,
        collisionType: ex.CollisionType.Passive,
        collisionGroup: ex.CollisionGroupManager.groupByName('shieldpowerup')
      });

      let spriteSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.slowdownsheet,
        grid: {
            rows: 3,
            columns: 3,
            spriteWidth: 32,
            spriteHeight: 32
        }
    })

    const animation = ex.Animation.fromSpriteSheet(spriteSheet, ex.range(0, 7), 150);

    this.graphics.use(animation);
    this.scale = ex.vec(1.5,1.5);
      
    }
  }

  export {ShieldPowerUp, SpeedPowerUp}