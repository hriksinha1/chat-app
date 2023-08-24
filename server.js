const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the "public" directory
app.use(cors());
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (message) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
