import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

import { Platform } from './Platform';
import { BackgroundClass } from './Background.js';
import { Coin } from './Coin';
import { Player } from './Player.js';
import { Scorelabel } from './Scorelabel.js';

export class Level1 extends ex.Scene {

  player
  scorelabel
  DataClass

  constructor(DataClass) {
    super();
    this.DataClass = DataClass;
  }

  onInitialize(engine) {
    this.initaializeActors();
    this.initaializeCamera();
    this.initaializeBackground();
  }

  onPreUpdate() {
    this.scorelabel.updateText(`Score: ${this.DataClass.getScore()}`)
    console.log(this.DataClass.getScore())
  }

  initaializeActors() {
    this.player = new Player(new ex.Vector(100, 520), this.DataClass, false, 1, new ex.Vector(1.5,1.5), 200);
    const platform1 = new Platform(0, 585, 90000, 20);
    const coin = new Coin(new ex.Vector(900, 500), 64, 64, new ex.Vector(1, 1), this.DataClass);
    this.scorelabel = new Scorelabel();

    this.add(this.player);
    this.add(platform1);
    this.add(this.scorelabel);
    this.add(coin);

  }
  initaializeBackground() {
    const foreground = new BackgroundClass(-2, -100, 50, new ex.Vector(1,1), 1,  Resources.background[0]);
    const middleground = new BackgroundClass(-3, -125, -10, new ex.Vector(1,1), 0.8,  Resources.background[1]);
    const background = new BackgroundClass(-4, -250, -150, new ex.Vector(1,1.2), 0.6,  Resources.background[2]);

    this.add(foreground);
    this.add(middleground);
    this.add(background);
  }

  initaializeCamera() {
    let boundingBox = new ex.BoundingBox(
      0,
      -2000,
      40000,
      610
    );

    this.camera.strategy.lockToActor(this.player);
    this.camera.strategy.limitCameraBounds(boundingBox);
  }

  reset() {
    this.player.pos = new ex.Vector(100, 520);
  }
}
