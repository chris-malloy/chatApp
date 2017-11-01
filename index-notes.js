// DEPENDENCIES
// set up server listener for socket.io to run in node.js
const http = require('http');
const express = require('express');
const socketio = require('socket.io'); // server version -- find client version in index.html

// APP
const app = express();
app.use(express.static(__dirname + '/public'));

//SERVER
const server = http.createServer(app);
server.listen(8080);

// users array for socket
var users = [];

const io = socketio.listen(server); // only listening at ws://localhost:8080
// The way that socketio works is
// 1. .on to listen
// 2. .emit to send
io.sockets.on('connect', (socket) => { // this is like an event listener, socket is a particular client
    console.log("Socket Connection");
    // ADD ALL EVENT LISTENERS
    // socket is a client, on is listen, nameToServer is event, then comes the callback
    socket.on('nameToServer', (data) => {
        console.log(data);
        var clientInfo = {
            name: data,
            clientId: socket.id
        }
        users.push(clientInfo);
        // emit takes 2 args (just like client)
        // 1. event (we make the up. the only time we don't make this up is for connect and disconnet and few other times)
        // 2. Data to send
        io.sockets.emit('newUser', users)
    });
    socket.on('messageToServer', (messageObject) => {
        console.log(messageObject);
        io.sockets.emit('messageToClient', messageObject)
    })
});