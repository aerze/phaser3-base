import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'Title' })
  }

  preload () {
    console.log('Title::preload()')
    this.cameras.main.setBackgroundColor(DARK_BLUE)
  }

  create () {
    console.log('Title::create()')
    const { width: sw, height: sh } = this.sys.game.config

    const text = this.add.text(sw * 0.5, sh * 0.5, 'Play', { fontSize: '28px' })
    text.setOrigin(0.5, 0.5)
    text.setInteractive()
    text.on('pointerdown', () => {
      this.scene.start('Main')
    })
  }
}
