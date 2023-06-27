import { ImageSource, Sound, Loader} from 'excalibur'

import idleImageSrc from '../images/120x80_PNGSheets/_idle.png'
import crouchImageSrc from '../images/120x80_PNGSheets/_Crouch.png'
import crouchWalkImageSrc from '../images/120x80_PNGSheets/_CrouchWalk.png'
import crouchTransitionImageSrc from '../images/120x80_PNGSheets/_CrouchTransition.png'
import uiImageSrc from '../images/button_UI.png'
import runImageSrc from '../images/120x80_PNGSheets/_Run.png'
import jumpImageSrc from '../images/120x80_PNGSheets/_Jump.png'
import damageImageSrc from '../images/120x80_PNGSheets/_Hit.png'
import fallImageSrc from '../images/120x80_PNGSheets/_Fall.png'
import jumptofallImageSrc from '../images/120x80_PNGSheets/_JumpFallInbetween.png'
import shieldbubbleImageSrc from '../images/ShieldBubbleEffect.png'
import shieldbubbleSheetImageSrc from '../images/ShieldBubble.png'
import slowdownSheetImageSrc from '../images/SlowDown.png'
import deathImageSrc from '../images/120x80_PNGSheets/_Death.png'
import healthImageSrc from '../images/Heart&ManaUi.png'
import level1trackAudioSrc from '../sounds/tracks/Dream.mp3'
import pauseAudioSrc from '../sounds/090_Pause_02.wav'
import unpauseAudioSrc from '../sounds/096_Unpause_02.wav'
import uiHoverAudioSrc from '../sounds/001_Hover_01.wav'
import jump_1AudioSrc from '../sounds/28_jump_01.wav'
import jump_2AudioSrc from '../sounds/29_jump_02.wav'
import jump_3AudioSrc from '../sounds/30_jump_03.wav'
import landing_1AudioSrc from '../sounds/45_Landing_01.wav'
import landing_2AudioSrc from '../sounds/46_Landing_02.wav'
import landing_3AudioSrc from '../sounds/47_Landing_03.wav'
import crouch_1AudioSrc from '../sounds/16_Crouch_01.wav'
import crouch_2AudioSrc from '../sounds/17_Crouch_02.wav'
import crouch_3AudioSrc from '../sounds/18_Crouch_03.wav'
import hit_1AudioSrc from '../sounds/01_Claw_01.wav'
import hit_2AudioSrc from '../sounds/02_Claw_02.wav'
import hit_3AudioSrc from '../sounds/03_Claw_03.wav'
import hit_4AudioSrc from '../sounds/04_Claw_04.wav'
import background from '../images/Background.png'
import middelground from '../images/Middleground.png'
import foreground from '../images/Foreground.png'
import coinImageSrc from '../images/Coin.png'
import coinanimImageSrc from '../images/Coinsheet.png'
import boxImage from '../images/box.png'
import trashImage from '../images/Trash.png'
import PlantenbakImage from '../images/Plantenbak.png'
import spikeImage from '../images/Spike.png'

const Resources = {
    
    plantenbak: new ImageSource(PlantenbakImage),
    trash: new ImageSource(trashImage),
    box: new ImageSource(boxImage),
    spike: new ImageSource(spikeImage),
    playeridle: new ImageSource(idleImageSrc),
    playerrun: new ImageSource(runImageSrc),
    playerjump: new ImageSource(jumpImageSrc),
    playerjumptofall: new ImageSource(jumptofallImageSrc),
    shieldbubble: new ImageSource(shieldbubbleImageSrc),
    shieldbubblesheet: new ImageSource(shieldbubbleSheetImageSrc),
    slowdownsheet: new ImageSource(slowdownSheetImageSrc),
    playerfall: new ImageSource(fallImageSrc),
    playerdeath: new ImageSource(deathImageSrc),
    uibuttons: new ImageSource(uiImageSrc),
    healthui: new ImageSource(healthImageSrc),
    level1track: new Sound(level1trackAudioSrc),
    pausesound: new Sound(pauseAudioSrc),
    unpausesound: new Sound(unpauseAudioSrc),
    uihoversound: new Sound(uiHoverAudioSrc),
    background: [new ImageSource(foreground), new ImageSource(middelground), new ImageSource(background)],
    jumpingsounds: [new Sound(jump_1AudioSrc), new Sound(jump_2AudioSrc), new Sound(jump_3AudioSrc)],
    landingsounds: [new Sound(landing_1AudioSrc), new Sound(landing_2AudioSrc), new Sound(landing_3AudioSrc)],
    crouchingsounds: [new Sound(crouch_1AudioSrc), new Sound(crouch_2AudioSrc), new Sound(crouch_3AudioSrc)],
    playerhitsounds: [new Sound(hit_1AudioSrc), new Sound(hit_2AudioSrc), new Sound(hit_3AudioSrc), new Sound(hit_4AudioSrc)],
    crouchinganims: [new ImageSource(crouchImageSrc), new ImageSource(crouchTransitionImageSrc), new ImageSource(crouchWalkImageSrc)],
    playerhit: new ImageSource(damageImageSrc),
    coin: new ImageSource(coinImageSrc),
    coinanim: new ImageSource(coinanimImageSrc)
}

const ResourceLoader = new Loader([
    Resources.spike,
    Resources.plantenbak,
    Resources.trash, 
    Resources.box, 
    Resources.uibuttons, 
    Resources.playerdeath, 
    Resources.playeridle, 
    Resources.playerrun, 
    Resources.playerfall, 
    Resources.playerjump, 
    Resources.playerjumptofall, 
    Resources.coin, 
    Resources.level1track, 
    Resources.shieldbubble, 
    Resources.shieldbubblesheet, 
    Resources.slowdownsheet, 
    Resources.playerhit,
    Resources.healthui,
    Resources.coinanim,
    Resources.background[0],
    Resources.background[1],
    Resources.background[2],
    Resources.playerhitsounds[0],
    Resources.playerhitsounds[1],
    Resources.playerhitsounds[2],
    Resources.playerhitsounds[3],
    Resources.pausesound,
    Resources.unpausesound,
    Resources.uihoversound,
    Resources.jumpingsounds[0], 
    Resources.jumpingsounds[1], 
    Resources.jumpingsounds[2], 
    Resources.crouchinganims[0], 
    Resources.crouchinganims[1], 
    Resources.crouchinganims[2], 
    Resources.crouchinganims[3], 
    Resources.landingsounds[0], 
    Resources.landingsounds[1], 
    Resources.landingsounds[2], 
    Resources.crouchingsounds[0], 
    Resources.crouchingsounds[1], 
    Resources.crouchingsounds[2], 
    ])

export { Resources, ResourceLoader }
