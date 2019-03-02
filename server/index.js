const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

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

  socket.on(SOCKET_EVENTS.CONNECT_TO_ROOM, payload => {
    const { name, room } = payload

    const result = { status: 404 }

    socket.emit(SOCKET_EVENTS.CONNECT_TO_ROOM, result)
  })

  socket.on('disconnect', () => {
    console.log('client disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on post 3000')
  console.log('Events', Object.keys(SOCKET_EVENTS))
})
