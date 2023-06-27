import * as ex from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';

import { Platform } from './Platform';
import { BackgroundClass } from './Background.js';
import { Coin } from './Coin';
import { Player } from './Player.js';
import { Scorelabel } from './Scorelabel.js';
import { Hp } from './Hp.js';
import { Box, Trash, Plantenbak, Spike } from './Obstacle.js';
import { SpeedPowerUp, ShieldPowerUp } from './Powerup.js';
import { levelChunks } from './LevelChunks.js';


export class Level1 extends ex.Scene {

  player
  scorelabel
  DataClass
  trackplaying
  dead
  muisicVolume
  playerHP
  paused
  trackIsLoaded = false
  isPlaying = false
  Box
  
  constructor(DataClass) {
    super();
    this.DataClass = DataClass;
  }

  onInitialize(engine) {
    this.initaializeActors();
    this.initaializeCamera();
    this.initaializeBackground();

    this.levelchunks = new levelChunks(this.DataClass, 500)

    this.muisicVolume = this.DataClass.getMuisicvolume()
    this.trackplaying = Resources.level1track

    engine.input.gamepads.at(0).on('button', (event) => {
      if(event.button === ex.Input.Buttons.Select) {
          if(!this.paused) {
              this.paused = true
              this.trackplaying.pause()
              engine.goToScene('pausescreen')
          }
      }
  })
  engine.input.keyboard.on("press", (KeyEvent) => {
      if(KeyEvent.key == "Escape") {
          if(!this.paused) {
              this.paused = true
              this.trackplaying.pause()
              engine.goToScene('pausescreen')
          }
      }
  });
  }

  onActivate() {
    this.DataClass.setScene('level1')
    if(this.paused) {
      this.muisicVolume = this.DataClass.getMuisicvolume()
      this.trackplaying.play(this.muisicVolume)
      this.paused = false
    }
  }

  onPreUpdate(Engine) {
    this.levelchunks.createChunk(Engine)
    this.scorelabel.updateText(`Score: ${this.DataClass.getScore()}`)
    this.DataClass.setCurrentPlayerPosition(this.player.pos.x)
    if(Resources.level1track.isLoaded()) {
      this.initializeAudio()
    }
    if (this.player.pos.x ) {

    }
    if(Resources.level1track.isLoaded() && !this.isPlaying) {
      this.isPlaying = true
      this.trackplaying.play(this.muisicVolume)
    }
  }

  initaializeActors() {
    this.player = new Player(new ex.Vector(100, 520), this.DataClass, false, 1, new ex.Vector(1.5,1.5), 200);
    const platform1 = new Platform(0, 585, 5000, 20, this.DataClass);
    const coin = new Coin(new ex.Vector(900, 500), 64, 64, new ex.Vector(1, 1), this.DataClass);
    this.scorelabel = new Scorelabel();
    this.playerHP = new Hp(10, 20, this.DataClass, 1)
    this.playerHP.scale = new ex.Vector(2,2)
    const box1 = new Box(1200, 525, 30, 50)
    const trash1 = new Trash(1500, 542, 30, 50)
    const plantenbak1 = new Plantenbak(1800, 535, 30, 50)
    const spike1 = new Spike(2100, 560, 30, 50)
    const shieldpowerup = new ShieldPowerUp(500, 560, 50, 50)
    const speedpowerup = new SpeedPowerUp(8000, 560, 50, 50)

    

    this.add(this.player);
    this.add(platform1);
    this.add(this.scorelabel);
    // this.add(coin);
    this.add(this.playerHP)
    // this.add(box1)
    // this.add(trash1)
    // this.add(plantenbak1)
    // this.add(spike1)
    // this.add(shieldpowerup)
    // this.add(speedpowerup)

  }
  initaializeBackground() {
    const foreground = new BackgroundClass(-2, -100, 50, new ex.Vector(1,1), 1,  Resources.background[0], this.DataClass);
    const middleground = new BackgroundClass(-3, -125, -10, new ex.Vector(1,1), 0.8,  Resources.background[1], this.DataClass);
    const background = new BackgroundClass(-4, -250, -150, new ex.Vector(1,1.2), 0.6,  Resources.background[2], this.DataClass);


    this.add(foreground);
    this.add(middleground);
    this.add(background);
  }

  initaializeCamera() {
    let boundingBox = new ex.BoundingBox(
      0,
      -2000,
      900000,
      610
    );

    this.camera.strategy.lockToActor(this.player);
    this.camera.strategy.limitCameraBounds(boundingBox);
  }

  resetLevel() {
    this.player.pos = new ex.Vector(100, 520);
  }

  initializeAudio() {
    if(this.muisicVolume != 0) {
      if (this.player.getHealth() <= 0 && this.dead == false) {
          this.trackplaying.stop()
          setTimeout(()=> {
              // this.trackplaying = Resources.trackgameover
              this.trackplaying.play(this.muisicVolume)
              this.looping = true
          }, 200)
          this.dead = true
      }
      // if(Resources.level1track.getPlaybackPosition() +0.2 >= Resources.level1track.getTotalPlaybackDuration()){
          this.looping = true
      // }
      // console.log(this.trackplaying.getPlaybackPosition(), this.trackplaying.getTotalPlaybackDuration() )
      if(this.trackplaying.getPlaybackPosition() +0.2 >= this.trackplaying.getTotalPlaybackDuration() && this.looping ){
          if(this.dead) {
              this.trackplaying.stop()
              // this.trackplaying = Resources.trackgameoverloop
              setTimeout(()=> {
                  this.trackplaying.stop()
                  this.trackplaying.play(this.muisicVolume)
              },200)
          } else {
              this.trackplaying.stop()
              this.trackplaying = Resources.level1track
              setTimeout(()=> {
                  this.trackplaying.stop()
                  this.trackplaying.play(this.muisicVolume)
              },200)
          }
      }
    }
  }
}
