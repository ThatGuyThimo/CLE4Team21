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

    //   let coinSheet = ex.SpriteSheet.fromImageSource({
    //     image: image,
    //     grid: {
    //         rows: 1,
    //         columns: 4,
    //         spriteWidth: 64,
    //         spriteHeight: 64
    //     }
    // })
    this.Dataclass = Dataclass
      

    // const animation = ex.Animation.fromSpriteSheet(coinSheet, ex.range(0, 3), 50);

    this.scale = scale
    const sprite = Resources.coin.toSprite();
    this.graphics.use(sprite);
    // this.graphics.use(animation);
  
      this.on('collisionstart', (event) => {
        if (event.other instanceof Player) {
          this.Dataclass.incrementScore();
          this.kill();
        }
      });
    }
  }
