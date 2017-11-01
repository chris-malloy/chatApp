// DEPENDENCIES
const http = require('http');
const express = require('express');
const socketio = require('socket.io'); // server version -- find client version in index.html

// APP
const app = express();
app.use(express.static(__dirname + '/public'));

//SERVER
const server = http.createServer(app);
server.listen(8080);

var users = [];

// LISTEN FOR USER CONNECT
const io = socketio.listen(server);
io.sockets.on('connect', (socket) => {
    socket.on('nameToServer', (data) => {
        var clientInfo = {
            name: data,
            clientId: socket.id
        }
        users.push(clientInfo);
        io.sockets.emit('newUser', users)
    });
    socket.on('messageToServer', (messageObject) => {
        io.sockets.emit('messageToClient', messageObject)
    })
});