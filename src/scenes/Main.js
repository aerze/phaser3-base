import Phaser from 'phaser'
import Player from '../objects/Player'
import { DARK_BLUE } from '../constants'

class Main extends Phaser.Scene {
  constructor () {
    super({ key: 'Main' })
  }

  init (data) {
    this.data = data
  }

  preload (...args) {
    console.log('Main::preload()', ...args, ';')
    this.cameras.main.setBackgroundColor(DARK_BLUE)
  }

  create () {
    console.log('Main::create()')
    const { width, height } = this.sys.game.config
    console.log(width, height)

    this.physics.world.gravity.setTo(0, 0)

    this.p1 = this.add.existing(new Player(this, 25, 25, 'doux'))
    this.p2 = this.add.existing(new Player(this, 100, 100, 'mort'))

    this.ball = this.add.sprite(width * 0.5, height * 0.5, 'ball')
    this.physics.world.enable(this.ball)

    this.ball.setScale(0.14)
    this.ball.body.setCollideWorldBounds(true)
  }

  update () {}
}

export default Main
