import express        from 'express';
import http           from 'http'
import path           from 'path';
import socketIO       from'socket.io';
import initGameserver from './GameServer';

const app    = express(),
      server = http.Server(app),
      io     = socketIO(server);

app.use('/static', express.static(__dirname + '/static'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(5000, () => console.log('Starting server on port 5000'));

io.on('connection', socket => {
  new initGameserver(io, socket);
});