import Phaser from 'phaser'
import BootScene from './scenes/Boot'
import TitleScene from './scenes/Title'
import MainScene from './scenes/Main'

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 512,
  height: 512,
  zoom: 1,
  pixelArt: true,
  scaleMode: 0, // Phaser.ScaleManager.EXACT_FIT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [BootScene, TitleScene, MainScene]
})

window.game = game
