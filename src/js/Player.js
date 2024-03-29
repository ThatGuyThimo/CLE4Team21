import * as ex from "excalibur"
import { Resources } from "./resources"

// jouw eige classes gebruiken inheritance om over te erven van excalibur
export class Player extends ex.Actor {

    onGround = true
    jumped = false
    crouching = false
    hit = false
    health = 3
    animPlaying = 0
    attacking = 0
    attacked = false
    SFXVolume = localStorage.getItem('SFXvolume')
    facing = "R"
    playerAnimations = []
    transition
    attackTransition
    DataClass
    bubbleBox
    multiplayer = false
    player
    speed
    acceleration = 0
    speedPowerUp = false
    shieldPowerUp = false
    shieldIsActive = false
    speedIsActive = false
  

    /**
     * 
     * @param {ex.Vector} pos 
     * @param {Class} Dataclass 
     * @param {boolean} multiplayer 
     * @param {Number} player 
     * @param {ex.Vector} scale 
     * @param {Number} speed 
     * @param {ex.collisionGroup} collisionGroup 
     */
     constructor(pos, Dataclass, multiplayer, player, scale, speed, collisionGroup) {
        super({ 
            x: pos.x,
            y: pos.y,
            name: 'player',
            collisionType: ex.CollisionType.Active,
            // collisionGroup: collisionGroup,
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 20))
        })
        this.scale = scale
        this.DataClass = Dataclass
        this.multiplayer = multiplayer
        this.player = player
        this.speed = speed
    }

    onInitialize(engine) {

        this.DataClass.setPlayerHealth(this.player, this.health)

        // Create all the SpriteSheets
        let idleSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playeridle,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let runSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerrun,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let jumpSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerjump,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let fallSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerfall,
            grid: {
                rows: 1,
                columns: 3,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let jumpToFallSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.playerjumptofall,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let crouching = Resources.crouchinganims[0].toSprite()

        let crouchTarnsition = Resources.crouchinganims[1].toSprite()

        let crouchWalking = ex.SpriteSheet.fromImageSource({
            image: Resources.crouchinganims[2],
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let deathAnim = ex.SpriteSheet.fromImageSource({
            image: Resources.playerdeath,
            grid: {
                rows: 1,
                columns: 10,
                spriteWidth: 120,
                spriteHeight: 80
            }
        })

        let hitAnim = Resources.playerhit.toSprite()

        // Collect animations into an array
        this.playerAnimations['idleAnim'] = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 9), 100);
        this.playerAnimations['runAnim'] = ex.Animation.fromSpriteSheet(runSheet, ex.range(0, 9), 50);
        this.playerAnimations['jumpAnim'] = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 2), 50);
        this.playerAnimations['fallAnim'] = ex.Animation.fromSpriteSheet(fallSheet, ex.range(0, 2), 50);
        this.playerAnimations['jumpToFallAnim'] = ex.Animation.fromSpriteSheet(jumpToFallSheet, ex.range(0, 1), 50);
        this.playerAnimations['crouching'] = crouching;
        this.playerAnimations['crouchTarnsition'] = crouchTarnsition;
        this.playerAnimations['crouchWalking'] = ex.Animation.fromSpriteSheet(crouchWalking, ex.range(0, 5), 50);
        this.playerAnimations['deathAnim'] = ex.Animation.fromSpriteSheet(deathAnim, ex.range(0, 9), 100, ex.AnimationStrategy.Freeze);
        this.playerAnimations['playerHit'] = hitAnim;
        this.bubbleBox = new ex.Actor({
            x: -5,
            y: 20,
            name: 'bubblebox',
            collisionType: ex.CollisionType.Passive,
            collider: ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(0, 20))
        })
                    let bubbleSprite = Resources.shieldbubble.toSprite()
            bubbleSprite.opacity = 0.5
            bubbleSprite.scale = ex.vec(1.5,1.5)
        this.bubbleBox.graphics.add("bubblesprite", bubbleSprite)

        this.addChild(this.bubbleBox)

        this.on('collisionstart', (event) => {
            if (event.other._name == "damageObstacle" && !this.hit ) {
                if(this.shieldPowerUp) {
                    this.shieldPowerUp = false
                    this.shieldIsActive = false
                    this.bubbleBox.graphics.hide('bubblesprite')
                    this.hit = true
                    setTimeout(() => {
                        this.hit = false
                    }, 800)
                } else {
                    this.takeDamage(1, event.contact.info.sideId)
                    this.hit = true
                }
            }
            if (event.other._name == "shieldPowerUp") {
                if(!this.shieldPowerUp) {
                    let sound = Resources.shieldpowerupsound
                    sound.play(this.DataClass.getSFXvolume())
                }
                this.shieldPowerUp = true

            }
            if (event.other._name == "speedPowerUp") {
                if(!this.speedPowerUp) {
                    let sound = Resources.speedpowerupsound
                    sound.play(this.DataClass.getSFXvolume())
                }
                this.speedPowerUp = true
            }
        })

    }

    update(engine) {
        if(this.vel.x < 500 && !this.speedPowerUp && !this.speedIsActive) {
            this.acceleration = (this.pos.x / 10000) * this.speed 
        } else if(this.speedPowerUp && !this.speedIsActive) {
            this.speedIsActive = true
            if(this.acceleration > 200) {
                this.acceleration = this.acceleration - 200
            } else {
                this.acceleration = 0
            }
            setTimeout(() => {
                this.speedPowerUp = false
                this.speedIsActive = false
            },10000)
        } else if(!this.speedPowerUp) {
            this.acceleration = 305
        }

        if(this.shieldPowerUp && !this.shieldIsActive) {
            this.shieldIsActive = true
            this.bubbleBox.graphics.show("bubblesprite")
        }

        if(this.crouching) {
            this.vel.x = (this.speed + this.acceleration) / 2
        } else if(this.health > 0){
            this.vel.x = this.speed + this.acceleration
        } else {
            this.vel.x = 0
        }

        this.DataClass.setPlayerXpos(this.pos.x)
        this.SFXVolume = localStorage.getItem('SFXvolume')

        if(this.vel.y == 0) {
            if(this.onGround == false) {
                let sound = Resources.landingsounds[ex.randomIntInRange(0, 2)] 
                sound.play(this.SFXVolume)
            }
            this.onGround = true
            this.jumped = false
        } else {
            this.onGround = false
        }

        if(
            this.crouching &&
            !engine.input.keyboard.isHeld(ex.Input.Keys.S) && 
            !engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown) && 
            !engine.input.gamepads.at(0).getButton(ex.Input.Buttons.DpadDown) &&
            this.player == 1 && 
            !this.multiplayer ||
            !engine.input.gamepads.at(0).getButton(ex.Input.Buttons.DpadDown) && 
            this.player == 2 &&
            this.multiplayer ||
            this.player == 1 && 
            this.multiplayer &&
            !engine.input.keyboard.isHeld(ex.Input.Keys.S) && 
            !engine.input.keyboard.isHeld(ex.Input.Keys.ArrowDown)
            ) {
            this.crouching = false
        }

        // Hitbox state machine
        switch(true) {
            case this.facing == "R" && !this.crouching:
                this.collider.set(ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(-5, 20)))
                break;
            case this.facing == "L" && !this.crouching:
                this.collider.set(ex.Shape.Box(20, 40, ex.Vector.Half, ex.vec(5, 20)))
                break;
            case this.facing == "R" && this.crouching:
                this.collider.set(ex.Shape.Box(20, 20, ex.Vector.Half, ex.vec(-5,30)))
                break;
            case this.facing == "L" && this.crouching:
                this.collider.set(ex.Shape.Box(20, 20, ex.Vector.Half, ex.vec(5, 30)))
                break;
        }

        // Animation state machine
        switch(true) {
            case !this.hit && this.attacking == 0 && !this.crouching && this.vel.x > 0 && this.vel.y == 0: // Right running
                this.vel.x = this.vel.x - 1
                if (this.animPlaying != 1) {
                    this.animPlaying = 1
                    this.facing = "R"
                    this.playerAnimations['runAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && !this.crouching && this.vel.x < 0 && this.vel.y == 0: // Left running
                this.vel.x = this.vel.x + 1
                if (this.animPlaying != 2) {
                    this.animPlaying = 2
                    this.facing = "L"
                    this.playerAnimations['runAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['runAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x < 0: // Left jumping
                if (this.animPlaying != 3) {
                    this.animPlaying = 3
                    this.facing = "L"
                    this.playerAnimations['jumpAnim'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x > 0: // Right jumping
                if (this.animPlaying != 4) {
                    this.animPlaying = 4
                    this.facing = "R"
                    this.playerAnimations['jumpAnim'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x > 0: // Right falling
                if (this.animPlaying != 5) {
                    this.facing = "R"
                    this.playerAnimations['fallAnim'].flipHorizontal = false
                    this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
                    if (this.animPlaying != 9) {
                        this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                        this.animPlaying = 9
                    }
                    if(this.transition.currentFrameIndex == 1) {
                        this.graphics.use(this.playerAnimations['fallAnim'])
                        this.animPlaying = 5
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x < 0: // Left falling
                if (this.animPlaying != 6) {
                    this.facing = "L"
                    this.playerAnimations['fallAnim'].flipHorizontal = true
                    this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
                    if (this.animPlaying != 9) {
                        this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                        this.animPlaying = 9
                    }
                    if(this.transition.currentFrameIndex == 1) {
                        this.graphics.use(this.playerAnimations['fallAnim'])
                        this.animPlaying = 6
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y > 0 && this.vel.x == 0: // Falling no movement
                if (this.animPlaying != 7) {
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['fallAnim'].flipHorizontal = false
                            this.playerAnimations['jumpToFallAnim'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['fallAnim'].flipHorizontal = true
                            this.playerAnimations['jumpToFallAnim'].flipHorizontal = true
                            break;
                    }
                    
                    if (this.animPlaying != 9) {
                        this.transition = this.graphics.use(this.playerAnimations['jumpToFallAnim'])
                        this.animPlaying = 9
                    }
                    if(this.transition.currentFrameIndex == 1) {
                        this.animPlaying = 7
                        this.graphics.use(this.playerAnimations['fallAnim'])
                        this.transition.reset()
                    }
                }
                break;
            case !this.hit && this.attacking == 0 && this.vel.y < 0 && this.vel.x == 0 : // Jumping no movement 
                if (this.animPlaying != 8) {
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['jumpAnim'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['jumpAnim'].flipHorizontal = true
                            break;
                    }
                    this.animPlaying = 8
                    this.graphics.use(this.playerAnimations['jumpAnim'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.y == 0 && this.vel.x == 0 : // Crouching no movement
                if (this.animPlaying != 12) {
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['crouching'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['crouching'].flipHorizontal = true
                            break;
                    }
                    this.graphics.use(this.playerAnimations['crouching'])
                    this.animPlaying = 12
                }
                break;
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.x < 0 && this.vel.y == 0 : // Right crouch walking
                if (this.animPlaying != 13) {
                    this.animPlaying = 13
                    this.facing = "L"
                    this.playerAnimations['crouchWalking'].flipHorizontal = true
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case !this.hit && this.attacking == 0 && this.crouching && this.vel.x > 0 && this.vel.y == 0 : // Left crouch walking
                if (this.animPlaying != 14) {
                    this.animPlaying = 14
                    this.facing = "R"
                    this.playerAnimations['crouchWalking'].flipHorizontal = false
                    this.graphics.use(this.playerAnimations['crouchWalking'])
                }
                break;
            case !this.hit && !this.crouching && this.animPlaying != 0 && this.attacking == 0 && this.health > 0: // Idle
                this.animPlaying = 0
                switch(this.facing){
                    case "R":
                        this.playerAnimations['idleAnim'].flipHorizontal = false
                        break;
                    case "L":
                        this.playerAnimations['idleAnim'].flipHorizontal = true
                        break;
                }
                this.graphics.use(this.playerAnimations['idleAnim'])
                break;
                case this.health == 0 : // Death
                    switch(this.facing){
                        case "R":
                            this.playerAnimations['deathAnim'].flipHorizontal = false
                            break;
                        case "L":
                            this.playerAnimations['deathAnim'].flipHorizontal = true
                            break;
                    }
                    this.graphics.use(this.playerAnimations['deathAnim'])
                break;
        }
       

        // Input logic
        if (engine.input.keyboard.isHeld(ex.Input.Keys.Space) && this.attacking == 0 && this.health > 0 && this.player == 1 || engine.input.keyboard.isHeld(ex.Input.Keys.ArrowUp) && this.player == 1 && this.attacking == 0 && this.health > 0 ) {
            this.jump()
            this.jumped = true
        }

        //controller once input
        engine.input.gamepads.at(0).on('button', (event) => {
            if (event.button === ex.Input.Buttons.Face1 && this.player == 1 && !this.multiplayer && this.attacking == 0 && this.health > 0 || event.button === ex.Input.Buttons.Face1 && this.player == 2 && this.multiplayer && this.attacking == 0 && this.health > 0 || event.button === ex.Input.Buttons.DpadUp && this.player == 1 && !this.multiplayer && this.attacking == 0 && this.health > 0 || event.button === ex.Input.Buttons.DpadUp && this.player == 2 && this.multiplayer && this.attacking == 0 && this.health > 0) {
            this.jump()
            this.jumped = true
            }
        })
            
    }

    // Movement logic
    movePlayer(key) {
        if (this.attacking == 0) {
            switch(key){
                case  "D":
                    switch(this.crouching){
                        case true:
                            this.vel.x = (this.speed + this.acceleration) / 2 + 20
                            break;
                        default:
                            this.vel.x = (this.speed + this.acceleration) + 20
                            break;
                    }
                    break;
                case "A":
                    switch(this.crouching){
                        case true:
                            this.vel.x = (this.speed + this.acceleration) / 2 - 20
                            break;
                        default:
                            this.vel.x = (this.speed + this.acceleration) - 20
                            break;
                    }
                    break;
    
            }
        }
    }
    jump() {
        if(!this.jumped && this.onGround){
            this.transition.reset()
            this.vel.y = -300
            let sound = Resources.jumpingsounds[ex.randomIntInRange(0, 2)] 
            sound.play(this.SFXVolume)
        } else if(this.vel.y < -200) {
            this.vel.y = this.vel.y -10
        }
    }
    crouch() {
        if (!this.crouching) {
            let sound = Resources.crouchingsounds[ex.randomIntInRange(0, 2)]
            sound.play(this.SFXVolume)
        }
    }
    getHealth() {
        return this.health
    }
    setPlayer(value, mp) {
        this.player = value
        this.multiplayer = mp
    }
    takeDamage(ammount, side) {
        if (this.health > 0) {
            switch(this.facing){
                case "R":
                    this.playerAnimations['playerHit'].flipHorizontal = false
                    break;
                case "L":
                    this.playerAnimations['playerHit'].flipHorizontal = true
                    break;
            }
            this.graphics.use(this.playerAnimations['playerHit'])
            this.health -= ammount
            let sound = Resources.playerhitsounds[ex.randomIntInRange(0, 3)] 
            sound.play(this.SFXVolume)
            setTimeout(() => {
                this.hit = false
            }, 1000)
        }
        this.DataClass.setPlayerHealth(this.player, this.health)
    }
}