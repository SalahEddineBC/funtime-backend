const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
const port = process.env.PORT || 9000;

const DB_URI = 'mongodb+srv://funtime:funtime@funtimedb.zmbnn.mongodb.net/sandbox?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.get('/', (request, response) => {
  response.send('<h1>Funtime server</h1>');
});


http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
