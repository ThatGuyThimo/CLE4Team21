import * as ex from 'excalibur';
import { Resources } from './resources';
import { Player } from './Player';


export class Coin extends ex.Actor {

  Dataclass

    /**
     * 
     * @param {ex.Vector} pos 
     * @param {Number} width 
     * @param {Number} height 
     * @param {ex.Vector} scale 
     * @param {Class} Dataclass 
     */
    constructor(pos, width, height, scale, Dataclass) {
      super({
        pos: pos,
        width: width,
        height: height,
        anchor: ex.Vector.Zero,
      });

      let coinSheet = ex.SpriteSheet.fromImageSource({
        image: Resources.coinanim,
        grid: {
            rows: 3,
            columns: 2,
            spriteWidth: 32,
            spriteHeight: 32
        }
    })
    this.Dataclass = Dataclass
      

    const animation = ex.Animation.fromSpriteSheet(coinSheet, ex.range(0, 5), 150);

    this.scale = scale
    // const sprite = Resources.coin.toSprite();
    // this.graphics.use(sprite);
    this.graphics.use(animation);
  
      this.on('collisionstart', (event) => {
        if (event.other instanceof Player) {
          this.Dataclass.incrementScore();
          this.kill();
        }
      });
    }
  }