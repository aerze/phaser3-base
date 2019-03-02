import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'title' })
  }

  preload () {
    console.log('Title::preload()')
    this.cameras.main.setBackgroundColor(DARK_BLUE)
  }

  create () {
    console.log('Title::create()')
    const { width: sw, height: sh } = this.game.scale.displaySize

    const text = this.add.bitmapText(sw * 0.5, sh * 0.5, '72', 'Play', 72)
    text.setOrigin(0.5, 0.5)
    text.setInteractive()
    text.on('pointerdown', () => {
      this.scene.start('Main', { test: 'true' })
    })
  }
}
