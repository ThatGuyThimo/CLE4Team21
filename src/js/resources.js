import { ImageSource, Sound, Resource, Loader} from 'excalibur'

import tempImageSrc from '../images/sign.png'

const Resources = {
    temp: new ImageSource(tempImageSrc),
}

const ResourceLoader = new Loader([
        Resources.temp, 
    ])

export { Resources, ResourceLoader }