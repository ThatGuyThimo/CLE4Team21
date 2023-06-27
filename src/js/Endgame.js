import * as ex from 'excalibur';


export class Endgame extends ex.Scene {

    ui = document.getElementById('ui')
    input = document.createElement('input')
    btn = document.createElement('button')

    onPreUpdate() {
        ui.classlist.add('endGame')
        input.className = 'inputName'    
        this.btn.className = 'button button-input'

        this.btn.onclick = (e) => {
            e.preventDefault()

            const value = input.value;

            
        }

        ui.appendChild(this.input ,this.btn)
    }

}