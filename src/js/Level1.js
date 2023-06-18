import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

import { Platform } from './Platform';
import { Background } from './Background';
import { Coin } from './Coin';
import { Player } from './player';

export class Level1 extends ex.Scene {
  constructor(DataClass) {
    super();
    this.DataClass = DataClass;
  }

  onInitialize(engine) {
    const backgroundImage = Resources.hofbg1.toSprite();
    const background = new Background(0, 80, 300, 20, backgroundImage);
    this.add(background);

    const platform1 = new Platform(0, 580, 2000, 20, ex.Color.Green);
    this.add(platform1);

    const scoreCounter = {
      score: 0,
      incrementScore: function () {
        this.score++;
        console.log('Score:', this.score);
      },
    };

    const player = new Player();
    this.add(player);

    const coinImage = Resources.sign.toSprite();
    const coin = new Coin(100, 200, 32, 32, coinImage);
    this.add(coin);

    // Check for collision at every update
    this.update = function (engine, delta) {
      if (player.collides(coin)) {
        console.log('Collided with coin');
        scoreCounter.incrementScore();
        coin.kill();
      }

      ex.Scene.prototype.update.call(this, engine, delta);
    };
  }
}
