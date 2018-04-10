import Phaser from 'phaser'
import Demo from './scene'

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600
});

game.scene.add('demo', Demo)
game.scene.start('demo')

console.log(Demo)
