const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io'); 

const app = express();

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

const users = {};
const sockets = {};

io.on('connection', socket => {

  socket.on('connect', () => {
    console.log(socket.handshake.query.userId, 'Connected to server');
    users[socket.handshake.query.userId] = socket.id;
    sockets[socket.id] = socket.handshake.query.userId;
  });
  
  socket.on('sendMessage', ({ senderId, recipientIds, chatId, message }) => {
    for (let recipientId in recipientIds) {
      const recipientSocketId = users[recipientId];

      if (recipientSocketId) {
        io.to(recipientSocketId).emit('receiveMessage', { senderId, chatId, message });
      } else {
        console.log(`Recipient ${recipientId} is not connected`);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');

    const userId = sockets[socket.id];
    if (userId) {
      delete users[userId]; 
      delete sockets[socket.id]; 
    }
  });
});

server.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});


