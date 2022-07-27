const express = require('express')
const app = express()
const server = require('http').Server(app)
const socketIO = require('socket.io')
const io = socketIO(server)
const PORT = process.env.PORT || 5000

app.get('/', (req,res) => res.end(`<h1>port open in ${PORT}</h1>`))

io.on('connection', socket => socket.on('message', msg => io.emit('message', msg)))

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))