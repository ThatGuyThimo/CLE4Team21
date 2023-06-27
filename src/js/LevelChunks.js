import * as ex from 'excalibur';
import { Box, Trash, Plantenbak, Spike } from './Obstacle.js';
import { SpeedPowerUp, ShieldPowerUp } from './Powerup.js';
import { Coin } from './Coin';

export class levelChunks {

    DataClass
    offset = 200
    posOffset = 0
    currentPos = 1000
    Chunks = [
        [1, 2, 0, 7, 2],
        [2, 3, 1, 0, 7],
        [5, 7, 3, 7, 2],
        [1, 2, 4, 0, 2],
        [2, 3, 0, 2, 5],
        [3, 2, 6, 0, 2],
        [4, 1, 0, 2, 3],
        [1, 2, 7, 0, 2],
        [2, 4, 0, 7, 4],
        [1, 2, 0, 0, 2],
        [7, 1, 2, 0, 7],
        [7, 2, 0, 7, 3],
        [1, 1, 0, 0, 2],
        [3, 1, 0, 2, 4],
        [6, 7, 0, 7, 2],
        [1, 2, 3, 0, 5],
      ]

    constructor(DataClass, offset) {
        this.DataClass = DataClass
        this.offset = offset
        this.posOffset = this.offset * 5
    }

    createChunk(Engine) {
        if(this.DataClass.getPlayerPosition() > this.currentPos - 1000 ) {
            let Chunk = this.readChunk(this.getRandomChunk())
            this.currentPos = this.currentPos + this.posOffset
            Chunk.forEach(item => {
                Engine.add(item)
            });
        }
    }

    readChunk(chunk) {

        let index = 0
        let generatedChunk = []

        chunk.forEach(item => {
            switch(item) {
                case 0 :{ //empty

                    break;
                }
                case 1 :{ //box
                    generatedChunk.push(new Box(this.currentPos + (this.offset * index) ,525, 30, 50))
                    break;
                }
                case 2 :{ //trash
                    generatedChunk.push(new Trash(this.currentPos + (this.offset * index) ,542, 30, 50))
                    break;
                }
                case 3 :{ //plantenbak
                    generatedChunk.push(new Plantenbak(this.currentPos + (this.offset * index) ,535, 30, 50))
                    break;
                }
                case 4 :{ //spike
                    generatedChunk.push(new Spike(this.currentPos + (this.offset * index) ,560, 30, 50))
                    break;
                }
                case 5 :{ //speedpowerup
                    generatedChunk.push(new SpeedPowerUp(this.currentPos + (this.offset * index) ,525, 50, 50))
                    break;
                }
                case 6 :{ //shieldpowerup
                    generatedChunk.push(new ShieldPowerUp(this.currentPos + (this.offset * index) ,510, 50, 50))
                    break;
                }
                case 7 :{ //coin
                    generatedChunk.push(new Coin(new ex.Vector(this.currentPos + (this.offset * index) ,550), 64, 64, new ex.Vector(1, 1), this.DataClass))
                    break;
                }
                
            }
            index++
        });

        return generatedChunk
    }

    getRandomChunk() {
        return this.Chunks[ex.randomIntInRange(0, this.Chunks.length - 1)]
    }

}