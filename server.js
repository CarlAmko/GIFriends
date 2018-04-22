var express = require('express');
var socket = require('socket.io')
var app = express();

server = app.listen(8080, function () {
    console.log('server is running on port 8080')
});

io = socket(server)

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('NEW_CHAT_MESSAGE', (data) => {
        io.emit('NEW_CHAT_MESSAGE', data);
    })
});