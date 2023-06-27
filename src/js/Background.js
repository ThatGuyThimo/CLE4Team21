// import * as ex from 'excalibur';

// export class Background extends ex.Actor {
//   constructor(x, y, width, height, image) {
//     super({
//       pos: new ex.Vector(x, y),
//       width: width,
//       height: height,
//       anchor: ex.Vector.Zero,
//     });

//     const sprite = new ex.Sprite(image);
//     this.graphics.use(sprite);
//   }
// }
import * as ex from "excalibur"

export class BackgroundClass extends ex.Actor {

    offset
    newOffset = 0 
    sprite
    Xpos
    Ypos
    playerPosition
    DataClass
    

    /**
     * 
     * @param {Number} Zindex 
     * @param {Number} Xpos 
     * @param {Number} Ypos 
     * @param {ex.Vector} scale 
     * @param {Number} paralex 
     * @param {ex.ImageSource} sprite 
     */
    constructor(Zindex, Xpos, Ypos, scale, paralex, sprite, DataClass) {
        super({
            pos: new ex.Vector(0,0)
        })

        this.sprite = sprite.toSprite()
        this.sprite.scale = scale
        this.offset = sprite.width
        this.z = Zindex
        this.Xpos = Xpos
        this.Ypos = Ypos
        this.DataClass = DataClass


        const group = new ex.GraphicsGroup({
            members: [
                {
                    graphic: this.sprite,
                    pos: new ex.Vector(Xpos, Ypos),
                },
                {
                    graphic: this.sprite,
                    pos: new ex.Vector(Xpos + this.sprite.width, Ypos),
                },
            ]
        })

        this.graphics.anchor = new ex.Vector(0,0)

        

        this.graphics.add(group)
        this.addComponent(new ex.ParallaxComponent(new ex.Vector(paralex, paralex)))
    }

    onPreUpdate() {
        if (this.DataClass.getPlayerPosition() > this.newOffset) {
            this.graphics.add(this.createGroup())
        }
    }

    createGroup() {
        this.newOffset = this.newOffset + this.sprite.width * 2;
        return new ex.GraphicsGroup({
            members: [
                {
                    graphic: this.sprite,
                    pos: new ex.Vector( this.Xpos + this.newOffset, this.Ypos),
                },
                {
                    graphic: this.sprite,
                    pos: new ex.Vector(this.Xpos + this.newOffset + this.sprite.width, this.Ypos),
                },
            ]
        })
    }
}