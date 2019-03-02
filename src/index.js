import Phaser from 'phaser'
import BootScene from './scenes/Boot'
// import TitleScene from './scenes/Title'
// import MainScene from './scenes/Main'
import Socket from './lib/socket'

const menu = document.getElementById('menu')
const form = document.getElementById('form')
const name = document.getElementById('name')
const room = document.getElementById('room')
const send = document.getElementById('send')

const socket = Socket.getInstance()

form.addEventListener('submit', event => {
  event.preventDefault()

  if (socket.socket.disconnected) {
    send.innerText = 'Failed'
    setTimeout(() => {
      send.innerText = 'Connect'
    }, 1000)
    return false
  }

  const nameValue = name.value
  const roomValue = room.value

  menu.remove()

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    input: {
      gamepad: true
    },
    scale: {
      width: '100%',
      height: '100%',
      mode: Phaser.Scale.NONE,
      autoRound: true,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [BootScene],
    // scene: [BootScene, TitleScene, MainScene]
    callbacks: {
      preBoot: game => {
        game.registry.set({ user: { name: nameValue, room: roomValue } })
      }
    }
  })

  window.game = game

  return false
})
