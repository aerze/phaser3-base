import io from 'socket.io-client'
import { SOCKET_EVENTS, STATUS } from '../../common/constants'

console.log(SOCKET_EVENTS)

/**
 * @typedef {String} Event
 */

export default class Socket {
  /**
   * @param {} options
   * @returns {Socket}
   */
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

  on (event, callback) {
    return this.socket.on(event, callback)
  }

  message (event, payload) {
    return new Promise((resolve, reject) => {
      this.socket.once(event, resolve)
      this.socket.emit(event, payload)
    })
  }

  connect ({ name, code }, cb) {
    this.log('connect()')
    this.state.user = { name, code }
    this.socket.emit(SOCKET_EVENTS.CONNECT_TO_ROOM, this.state)
    this.socket.once(SOCKET_EVENTS.CONNECT_TO_ROOM, state => {
      if (state.status === STATUS.SUCCESS) {
        return cb(state)
      }

      console.log(state)
    })
  }
}
