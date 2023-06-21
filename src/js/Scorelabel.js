import * as ex from 'excalibur'

export class Scorelabel extends ex.ScreenElement{

    text

    constructor(){
        super({
            x: 30,
            y: 15,
            width: 10,
            height: 12,
        })
        this.text = new ex.Text({
            pos: ex.vec(30, 15),
            text: "Score: 0",
            color: ex.Color.White,
            font: new ex.Font({ size: 15 }),
        })
        this.graphics.show(this.text)
    }

    updateText(value) {
        this.text.text = value
    }
} 