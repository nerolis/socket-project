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
        this.players = {};

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
            io.sockets.emit('state', this.players);
          }, 1000 / 60);
    }

    initSubscribers(io, socket) {
        socket.on('newPlayer', () => this.newPlayer(socket.id));

        socket.on('movement', movement => this.playerMovement(movement, socket.id));
    }

    newPlayer(id) {
        this.players[id] = {
            x: 300,
            y: 300
          };
    }

    playerMovement(movement, id) {

        let player = this.players[id] || {};

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
