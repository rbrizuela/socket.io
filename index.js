const path = require('path')
const express = require('express')
const app = express()

//settings
app.set('port', process.env.PORT || 3000)

//static files
app.use(express.static(path.join(__dirname, 'public')))

//start the server
const server = app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'))
})

//websockets
const SocketIO = require('socket.io')
const io = SocketIO(server)

io.on('connection', function (socket) {
  console.log('new connection', socket.id)

  socket.on('chat:message', function (data) {
    io.sockets.emit('chat:message', data)
  })

  socket.on('chat:typing', function (data) {
    socket.broadcast.emit('chat:typing', data)
  })

})
