import * as ex from 'excalibur'
import { Resources } from './resources'

export class Endgame extends ex.ScreenElement{

    constructor(x, y, Zindex) {
        super({
            x: x,
            y: y,
            width: 10,
            height: 12,
        })
        this.z = Zindex
    }

    onInitialize() {


        let blackscreen = Resources.blackscreen.toSprite()
        let gameover = Resources.gameover.toSprite()
        gameover.scale = ex.vec(0.3,0.3)
        blackscreen.opacity = 0.5


        this.graphics.add('blackscreen', blackscreen)
        this.graphics.add('gameover', gameover)
        this.graphics.show('blackscreen', {offset: new ex.Vector(-500, -500)})


        setTimeout(() => {
            this.graphics.show('gameover', {offset: new ex.Vector(0, 0)})
        }, 200)
    }
}