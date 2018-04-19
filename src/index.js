import Phaser from 'phaser'
import BootScene from './scenes/Boot'
import TitleScene from './scenes/Title'
import MainScene from './scenes/Main'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 128,
  height: 128,
  zoom: 4,
  pixelArt: true,
  scaleMode: 0, // Phaser.ScaleManager.EXACT_FIT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  },
  scene: [BootScene, TitleScene, MainScene]
})

window.game = game
