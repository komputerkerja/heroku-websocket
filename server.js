const express = require('express')
const cors = require('cors')
const app = express()
const ejsLayouts  =require('express-ejs-layouts')
const server = require('http').Server(app)
const socketIO = require('socket.io')
const io = socketIO(server) 
const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.static('public'))
app.use(cors())

app.get('/', (req,res) => {
  res.render('home', {
    port: PORT
  })
})
app.get('/port', (req,res) => {
  res.json({"port": `${PORT}`})
})

io.on('connection', socket => {
  console.log(`client connected id:${socket.id}`)
  socket.on('message', data => {
    console.log(data)
    io.emit('message', data);
  })
})

server.listen(PORT, () => console.log(`http://localhost:${PORT}`))