import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'
import Socket from '../lib/socket'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({ key: 'boot' })
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
  }

  create () {
    console.log('Boot::create()')
    const { width, height } = this.game.scale.displaySize
    const HALF = 0.5
    this.cameras.main.setBackgroundColor(DARK_BLUE)

    this.text = this.add.bitmapText(width * HALF, height * HALF, '72', '', 36)
    this.text.setOrigin(HALF, HALF)

    this.socket.connect(this.user, state => {
      this.text.setText('Connected!')
      setTimeout(() => {
        this.scene.start('title')
      }, 2500)
    })
    this.text.setText(`Connecting ${this.user.name} to ${this.user.code}`)
  }
}
