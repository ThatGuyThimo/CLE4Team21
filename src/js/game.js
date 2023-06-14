import '../css/style.css'
import * as ex from "excalibur"
import { DevTool } from '@excaliburjs/dev-tools'
import { Resources, ResourceLoader } from './resources.js'

import { Data } from './Data'
import { Mainmenu } from './Mainmenu'
// import { Level1 } from './Level1'
// import { Settings } from './Settings'
// import { PauseScreen } from "./Pause.js"

export class Game extends ex.Engine {

  DataClass
  mainmenu
  // settings
  // level1
  // pausescreen

    constructor() {
      super({
        width: 854,
        height: 480,
        displayMode: ex.DisplayMode.FitScreenAndFill,
        maxFps: 60,
      });
      const devtool = new DevTool(this);
      ex.Physics.acc = new ex.vec(0, 800)
      this.start(ResourceLoader).then(() => this.startGame());
      this.DataClass = new Data()
    }
  
    startGame() {

      this.mainmenu = new Mainmenu(this.DataClass)
      // this.settings = new Settings(this.DataClass)
      // this.level1 = new Level1(this.DataClass)
      // this.pausescreen = new PauseScreen(this.DataClass)

      this.add('mainmenu', this.mainmenu)
      // this.add('level1', this.level1)
      // this.add('settings', this.settings)
      // this.add('pausescreen', this.pausescreen)
      this.goToScene('mainmenu')
    }
  }
  
  new Game();