import * as ex from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Button } from './Button.js'
import { Image } from "./Image.js"

export class Mainmenu extends ex.Scene {
    startButton
    settingsButton
    DataClass

    constructor(Dataclass){
        super({})
        this.DataClass = Dataclass
    }

    onInitialize(Engine) {

        this.DataClass.setScene('mainmenu')

        let uiButtonsSpriteSheet = ex.SpriteSheet.fromImageSource({
            image: Resources.uibuttons,
            grid: {
                rows: 12,
                columns: 12,
                spriteHeight: 16,
                spriteWidth: 16
            },
            spacing: {
                margin: {
                    x: 0,
                    y: 0
                }
            }
        });

        const image = new Image( 0, 0, -1, Resources.mainmenuImage, ex.vec(1.6, 1.5), ex.vec(0, 0))

        this.startButton = new Button(16, 16, 50, 50, this.DataClass)
        this.startButton.setText('Start', 12)
        this.startButton.setImages(uiButtonsSpriteSheet.sprites[115], uiButtonsSpriteSheet.sprites[1])
        
        this.settingsButton = new Button(16, 16, 50, 75, this.DataClass)
        this.settingsButton.setText('Settings', 12)
        this.settingsButton.setImages(uiButtonsSpriteSheet.sprites[116], uiButtonsSpriteSheet.sprites[2])
        
        this.add(this.startButton)
        this.add(this.settingsButton)
        this.add(image)
    }

    onPreUpdate(Engine) {
        Engine.input.keyboard.on("press", (KeyEvent) => {
            if(KeyEvent.key == "Enter") {
                Engine.goToScene("level1")
            }
        });
        if(this.startButton.isClicked()) {
            this.startButton.setClicked()
            Engine.goToScene('level1')
        }
        if(this.settingsButton.isClicked()) {
            this.settingsButton.setClicked()
            Engine.goToScene('settings')
        }
    }
}