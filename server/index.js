const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const Users = {
  async findOrCreate (name) {
    return {
      name
    }
  }
}
const Rooms = {
  async findOrCreate (code) {
    return {
      code,
      players: [],

      async addPlayer (user) {
        this.players = this.players || []
        this.players.push(user)
      },

      toJson () {
        return {
          code: this.code,
          players: this.players
        }
      }
    }
  }
}

const { SOCKET_EVENTS, STATUS } = require('../common/constants')

const app = express()
const server = http.Server(app)
const io = socketio(server)

app.get(
  '/*',
  express.static(path.join(__dirname, '../build/')),
  express.static(path.join(__dirname, '../'))
)

io.on('connection', socket => {
  console.log('client connected')

  socket.on(SOCKET_EVENTS.MESSAGE, payload => {
    console.log('Message from', payload.name, ':', payload.value)
    io.emit(SOCKET_EVENTS.MESSAGE, payload)
  })

  socket.on(SOCKET_EVENTS.CONNECT_TO_ROOM, async state => {
    const { name, code } = state.user

    try {
      const room = await Rooms.findOrCreate(code)
      const user = await Users.findOrCreate(name)

      await room.addPlayer(user)

      const result = {
        status: STATUS.SUCCESS,
        room,
        user
      }

      socket.join(code)

      return socket.emit(SOCKET_EVENTS.CONNECT_TO_ROOM, result)
    } catch (error) {
      return socket.emit(SOCKET_EVENTS.CONNECT_TO_ROOM, {
        status: STATUS.FAILED,
        error
      })
    }
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on post 3000')
  console.log('Events', Object.keys(SOCKET_EVENTS))
})
