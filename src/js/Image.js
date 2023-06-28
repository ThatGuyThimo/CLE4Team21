import * as ex from 'excalibur';
export class Image extends ex.ScreenElement{

    scale
    offset
    source

    constructor(x, y, Zindex, image, scale, offset) {
        super({
            x: x,
            y: y,
            width: 10,
            height: 12,
        })
        this.z = Zindex
        this.scale = scale
        this.offset = offset
        this.source = image
    }

    onInitialize() {
        let image = this.source.toSprite()
        image.scale = this.scale

        this.graphics.add('image', image)
        this.graphics.show('image', {offset: this.offset})

    }
}