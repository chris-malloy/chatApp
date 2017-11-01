$(document).ready(() => {
    // remember, this file is talking to index.html
    // set the route to piggyback on
    // you can also think of this as the client listener
    const socketUrl = 'http://127.0.0.1:8080';
    const socketio = io.connect(socketUrl);
    // var name = prompt('What is your name?');
    var name = 'Chris';
    // Take the users name and send it t the server 
    // emit takes 2 args:
    // 1. Event (we made this up)
    // 2. Data to send via ws
    socketio.emit('nameToServer', name);
    // SEND NEW USERS TO SERVER
    socketio.on('newUser', (users) => {
        // console.log(`${userName} just joined`)
        // $('#users').append(`<div class="col-sm-12>${userName}</div>`)
        var usersHTML = `<h3>Connected Users</h3>`;
        users.map((user) => {
            usersHTML += `<div class="col-sm-12">${user.name}</div>`;
        });
        $('#users').html(usersHTML);
    })

    // SUBMIT MESSAGES TO SERVER
    $('#submit-message').submit((event) => {
        event.preventDefault();
        var newMessage = $('#new-message').val();
        socketio.emit('messageToServer', {
            name: name,
            message: newMessage
        });
    });
    // RENDER MESSAGES TO DOM
    socketio.on('messageToClient', (messageObject) => {
        $('#messages').append(`<p>${messageObject.message} -- ${messageObject.name}</p>`)
    })
});