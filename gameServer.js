import { debug } from "util";

let players = {};

class Player {
    constructor() {
      this.name  = 'Player';
      this.speed = 2;
      this.hp    = 100; 
    }
}

class World {}

export default class GameServer {
    constructor(io, socket) {
        this.player = new Player();
        this.world  = new World();

        this.initEmiters(io, socket);
        this.initSubscribers(io, socket);
    }
    
    initEmiters(io, socket) {        
        setInterval(() => { 
            socket.emit('state', players);
        }, 1000 / 60);
    }

    initSubscribers(io, socket) {
        socket.on('newPlayer', () => this.newPlayer(socket));
        socket.on('disconnect', () => this.removePlayer(socket));
        socket.on('playerMovement', movement => this.playerMovement(movement, socket));
    }

    newPlayer(socket) {
        players[socket.id] = {
            rotation    : 0,
            x           : Math.floor(Math.random() * 700) + 50,
            y           : Math.floor(Math.random() * 500) + 50,
            playerId    : socket.id,
            team        : (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue'
        };

        socket.emit('currentPlayers', players);
        socket.broadcast.emit('newPlayer', players[socket.id]);
    }

    removePlayer(socket) {
        delete players[socket.id];
        socket.broadcast.emit('playerDisconnect', socket.id);
    }

    playerMovement(movement, socket) {
        players[socket.id].x = movement.x;
        players[socket.id].y = movement.y;
        players[socket.id].rotation = movement.rotation;
        socket.broadcast.emit('playerMoved', players[socket.id]);
    }
}
