const io = require('socket.io')(2000)

io.on('connection', socket => {
    console.log(socket.id)
})