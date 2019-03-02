import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'
import Socket from '../lib/socket'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Boot' })
  }

  init (data) {
    console.log('Boot::init()', data)
    this.socket = Socket.getInstance()
    this.user = this.game.registry.get('user')
  }

  preload () {
    console.log('Boot::preload()')
    this.cameras.main.setBackgroundColor(DARK_BLUE)

    this.load.bitmapFont('72', 'assets/fonts/font0.png', 'assets/fonts/font0.xml')
    this.load.bitmapFont('36', 'assets/fonts/font1.png', 'assets/fonts/font1.xml')

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

    // // load ball
    // this.load.image('ball', 'assets/ball.png')

    // logo
    // this.load.image('logo', 'assets/logo.png')
  }

  create () {
    console.log('Boot::create()')
    const { width, height } = this.game.scale.displaySize
    const HALF = 0.5
    this.cameras.main.setBackgroundColor(DARK_BLUE)
    this.text = this.add.bitmapText(width * HALF, height * HALF, '72', 'Connecting', 36)
    this.text.setOrigin(HALF, HALF)
    // this.scene.start('Title')
  }
}
