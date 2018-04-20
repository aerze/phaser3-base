import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} texture
   */
  constructor (scene, x, y, texture) {
    super(scene, x, y, texture)

    scene.physics.world.enable(this)

    /** @type {Phaser.Physics.Arcade.Body} */
    this.body = this.body
    this.body.setCollideWorldBounds(true)
  }

  // preUpdate () {}
}
