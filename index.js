const http = require('http');
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res, next) => {
    res.send('Sanity Check.');
});
const server = http.createServer(app);
server.listen(8080);
console.log('The server is listening on port 8080');