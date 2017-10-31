// We need to bring in the Express module so we can use the router, public folder, etc.
const http = require('http');
const express = require('express');
// invoke express
const app = express();

app.get('/', (req, res, next) => {
    res.send('Sanity Check.');
});
// after you make app (express) you must hand it to the server
const server = http.createServer(app);
server.listen(8080);
console.log('The server is lisening on port 8080');