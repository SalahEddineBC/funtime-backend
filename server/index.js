const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const port = process.env.PORT || 9000;

const DB_URI = 'mongodb+srv://funtime:funtime@funtimedb.zmbnn.mongodb.net/sandbox?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.get('/', (request, response) => {
  response.send('<h1>Funtime server</h1>');
});

// Connect to DB
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

// socket listners
io.on('connection', (socket) => {
  socket.on('join-room', (roomID, peerID) => {
    console.log(`${peerID} connected to room ${roomID}`);
    socket.join(roomID);
    socket.to(roomID).broadcast.emit('user-connected', peerID);

    socket.on('disconnect', () => {
      socket.to(roomID).broadcast.emit('user-disconnected', peerID);
      console.log(`${peerID} disconnected from room ${roomID}`);
    });

    socket.on('game-started', () => {
      socket.to(roomID).broadcast.emit('game-started');
    });

    socket.on('pose', (poseKey) => {
      socket.to(roomID).broadcast.emit('pose', poseKey);
    });

    socket.on('update-scores', () => {
      socket.to(roomID).broadcast.emit('update-scores');
    });

    socket.on('myscore', (id, points) => {
      socket.to(roomID).broadcast.emit('remotescore', id, points);
    });
    socket.on('gameover', () => {
      socket.to(roomID).broadcast.emit('gameover');
    })
  });
});

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
