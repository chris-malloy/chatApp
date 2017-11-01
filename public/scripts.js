$(document).ready(() => {
    const socketUrl = 'http://127.0.0.1:8080';
    const socketio = io.connect(socketUrl);

    var date = new Date();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    date = `${hour}:${minutes}`;

    var name = 'Hallow Minion';
    socketio.emit('nameToServer', name);

    // LISTEN FOR NEW USERS
    socketio.on('newUser', (users) => {
        var usersHTML = `<h3>Connected Users</h3>`;
        users.map((user) => {
            usersHTML += `<div class="col-sm-12">${user.name}</div>`;
        });
        $('#users').html(usersHTML);
    });

    // SUBMIT MESSAGES TO SERVER
    $('#submit-message').submit((event) => {
        event.preventDefault();
        var newMessage = $('#new-message').val();
        socketio.emit('messageToServer', {
            name: name,
            message: newMessage,
            time: date
        });
        $("#new-message").val("");
    });

    // LISTEN FOR MESSAGES RENDER MESSAGES TO DOM
    socketio.on('messageToClient', (messageObject) => {
        $('#messages').append(`<p>${messageObject.message} -- ${messageObject.name} -- ${messageObject.time}</p>`)
    })
});