let players = {};

class Player {
    constructor() {
      this.name  = 'Player';
      this.speed = 2;
      this.hp    = 100; 
    }
}

export default class GameServer {
    constructor(io, socket) {
        this.player  = new Player();
        this.initEmiters(io, socket);
        this.initSubscribers(io, socket);
    }
    
    initEmiters(io, socket) {
        socket.emit('connected', {
            id    : socket.id,
            date  : Date.now(),
            hp    : this.player.hp,
            speed : this.player.speed,
            name  : this.player.name
        });
        
        setInterval(() => { 
            socket.emit('state', players);
          }, 1000 / 60);
          
    }

    initSubscribers(io, socket) {
        socket.on('newPlayer', () => {
            this.newPlayer(socket)
        });

        socket.on('disconnect', () => this.removePlayer(socket.id));
            
        socket.on('movement', movement => this.playerMovement(movement, socket.id));
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

    removePlayer(id) {
        //delete players[id];
        //io.emit('disconnect', socket.id);
    }

    playerMovement(movement, id) {

        let player = players[id] || {};

        if (movement.left) 
            player.x -= 5;
        
        if (movement.up) 
            player.y -= 5;

        if (movement.right)
            player.x += 5;
        
        if (movement.down)
            player.y += 5;
    }
}
