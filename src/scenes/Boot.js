import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
  }

  preload () {
    console.log('Boot::preload()')
    this.cameras.main.setBackgroundColor(DARK_BLUE)

    // load dinos
    const dinos = ['doux', 'mort', 'tard', 'vita']
    dinos.forEach(dinoName => {
      this.load.atlas(
        dinoName,
        `assets/dino/${dinoName}.png`,
        `assets/dino/${dinoName}.json`,
        Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY
      )
    })

    // load ball
    this.load.image('ball', 'assets/ball.png')

    // logo
    this.load.image('logo', 'assets/logo.png')
  }

  create () {
    console.log('Boot::create()')

    this.scene.start('Title')
  }
}
