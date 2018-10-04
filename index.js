import express        from 'express';
import http           from 'http';
import path           from 'path';
import socketIO       from'socket.io';
import GameServer     from './server/server';

const app    = express(),
      server = http.Server(app),
      io     = socketIO(server);

app.use('/dist', express.static(__dirname + '/dist'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

server.listen(5001, () => console.log('Starting server on port 5001'));

// Entry point.
io.on('connection', socket => new GameServer(socket));

export default app;