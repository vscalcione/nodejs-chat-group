let app = require('express')()
let http = require('http').Server(app)
let ioSocket = require('socket.io')(http)

let clients = []
const port = 3000

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.ejs')
})

ioSocket.on('connection', (socket) => {
  socket.on('storeClientInfo', function (data) {
    clients.push(data)
    console.log(data.id + ' is connected ')
    ioSocket.emit('onlineUsers', [clients.map((item) => item.id)])
  })

  socket.on('message', (req) => {
    let client = clients.find((x) => x.id === response.id)
    console.log('new message from ' + client.id + ': ' + response.msg)
    ioSocket.send(msg)
  })

  socket.on('disconnect', () => {
    let client = clients.findIndex((x) => x.socket_id === socket.id)
    console.log(clients[client].id + 'disconnect')
    clients.splice(client, 1)
    ioSocket.emit('onlineUsers', [clients.map((item) => item.id)])
  })
})

http.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
