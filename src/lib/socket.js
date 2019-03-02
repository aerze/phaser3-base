import io from 'socket.io-client'
import { SOCKET_EVENTS, STATUS } from '../../common/constants'

console.log(SOCKET_EVENTS)

export default class Socket {
  static getInstance (options) {
    if (!Socket._socket) {
      Socket._socket = new Socket(options)
    }

    return Socket._socket
  }

  constructor (options) {
    this.socket = io()

    this.state = {
      user: null
    }
  }

  log (...args) {
    console.log('Socket::', ...args)
  }

  async connectToRoom (user) {
    const result = await this.message(SOCKET_EVENTS.CONNECT_TO_ROOM, user)
    if (STATUS.SUCCESS === result.status) {
      this.log('connected')
      return result
    }
  }

  on (eventName, callback) {
    return this.socket.on(eventName, callback)
  }

  message (eventType, payload) {
    return new Promise((resolve, reject) => {
      this.socket.once(eventType, resolve)
      this.socket.emit(eventType, payload)
    })
  }
}

// const form = document.getElementById('form')
// const name = document.getElementById('name')
// const room = document.getElementById('chat')
// const output = document.getElementById('output')

// const getName = () => name.value.trim()

// function sendChatMessage (value) {
//   socket.emit(SOCKET_EVENT_TYPES.MESSAGE, {
//     name: getName(),
//     value
//   })
// }

// form.addEventListener('submit', event => {
//   event.preventDefault()
//   sendChatMessage(room.value)
//   room.value = ''
//   return false
// })

// socket.on(SOCKET_EVENT_TYPES.MESSAGE, payload => {
//   console.log(SOCKET_EVENT_TYPES.MESSAGE, payload)
//   const p = document.createElement('p')
//   const text = document.createTextNode(`${payload.name}: ${payload.value}`)
//   p.appendChild(text)
//   output.append(p)
// })
