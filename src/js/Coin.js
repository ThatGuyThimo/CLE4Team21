import * as ex from 'excalibur';
import { Player } from './player';


export class Coin extends ex.Actor {
    constructor(x, y, width, height, image, scoreCounter) {
      super({
        pos: new ex.Vector(x, y),
        width: width,
        height: height,
        anchor: ex.Vector.Zero,
      });
  
      const sprite = new ex.Sprite(image);
      this.graphics.use(sprite);
  
      this.scoreCounter = scoreCounter;
  
      this.on('precollision', (event) => {
        if (event.other instanceof Player) {
          this.scoreCounter.incrementScore();
          this.kill();
        }
      });
    }
  }
