const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Create the HTML file
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle incoming messages
    socket.on('message', (data) => {
        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



