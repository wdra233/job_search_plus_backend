module.exports = function(server) {
    const io = require('socket.io')(server)
    io.on('connection', function(socket) {
        console.log('socketio connected....')
        socket.on('sendMsg', function(data) {
            console.log('server received msg from browser', data)
            io.emit('receiveMsg', data.name + '_' + data.date)
            console.log('server send msg to browser', data)
        })
    })

}