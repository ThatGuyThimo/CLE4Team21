import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

import { Platform } from './Platform';
// import { Player } from './player';

export class Level1 extends ex.Scene {

    DataClass

    constructor(DataClass) {
        super({})
        this.DataClass = DataClass
    }

    onInitialize(Engine) {
        // const fish = new Actor();
        // fish.graphics.use(Resources.Fish.toSprite());
        // fish.pos = new Vector(400, 300);
        // fish.vel = new Vector(-10, 0);
        // this.add(fish);
    
        const platform1 = new Platform(0, 0, 2000, 20, ex.Color.Green);
        this.add(platform1);
    
        // const player = new Player(100, 100, 50, 50);
        // game.add(player);
    }


}