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

    console.log(this.physics.config)

    this.p1 = this.add.sprite(100, 100, 'doux')

    this.physics.world.gravity.setTo(0, 200)
    this.physics.world.enable([this.p1])

    /** @type {Phaser.Physics.Arcade.Body} */
    const body = this.p1.body
    body.setCollideWorldBounds(true)
  }
}

export default Main
