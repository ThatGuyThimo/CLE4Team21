import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

import { Platform } from './Platform';
import { Background } from './Background';

export class Level1 extends ex.Scene {
  DataClass;

  constructor(DataClass) {
    super({});
    this.DataClass = DataClass;
  }

  onInitialize(engine) {
    const backgroundImage = Resources.hofbg1.toSprite(); 
    const background = new Background(0, 80, 200, 20, backgroundImage);
    this.add(background);

    const platform1 = new Platform(0, 580, 2000, 20, ex.Color.Green);
    this.add(platform1);

    // const player = new Player(100, 100, 50, 50);
    // game.add(player);
  }
}
