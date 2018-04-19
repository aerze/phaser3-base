import Phaser from 'phaser'
import { DARK_BLUE } from '../constants'

class Main extends Phaser.Scene {
  constructor () {
    super({ key: 'Main' })
  }

  preload () {
    console.log('Main::preload()')
    this.cameras.main.setBackgroundColor(DARK_BLUE)
  }

  create () {
    console.log('Main::create()')
    const { width, height } = this.sys.game.config
    console.log(width, height)

    const logo = this.add.image(10, 10, 'logo')
    this.tweens.add({
      targets: logo,
      y: 250,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1
    })
  }
}

export default Main
