const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send a message immediately after connection
  socket.emit("welcome", {
    message: "Hello from server",
  });

  // Example: periodic server → client message
  const interval = setInterval(() => {
    socket.emit("server-message", {
      time: new Date().toISOString(),
    });
  }, 3000);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});