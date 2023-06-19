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
    /**
     * 
     * @param {Number} Zindex 
     * @param {Number} Xpos 
     * @param {Number} Ypos 
     * @param {ex.Vector} scale 
     * @param {Number} paralex 
     * @param {ex.ImageSource} sprite 
     */
    constructor(Zindex, Xpos, Ypos, scale, paralex, sprite) {
        super({
            pos: new ex.Vector(0,0)
        })

        sprite = sprite.toSprite()
        sprite.scale = scale
        this.offset = sprite.width
        this.z = Zindex


        const group = new ex.GraphicsGroup({
            members: [
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 2, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 3, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 4, Ypos),
                },
                {
                    graphic: sprite,
                    pos: new ex.Vector(Xpos + sprite.width * 5, Ypos),
                }
            ]
        })

        this.graphics.anchor = new ex.Vector(0,0)

        this.graphics.add(group)
        this.addComponent(new ex.ParallaxComponent(new ex.Vector(paralex, paralex)))
    }
}