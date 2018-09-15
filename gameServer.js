class Player {
    constructor() {
      this.name  = 'Player';
      this.speed = 2;
      this.hp    = 100; 
    }
}

export default class GameServer {
    constructor(io, socket) {
        this.initEmiters(io, socket);
        this.initSubsribers(io, socket);
        this.players = [];
    }
    
    initEmiters(io, socket) {

        const player = new Player();
        
        socket.emit('connected', {
            id    : socket.id,
            date  : Date.now(),
            hp    : player.hp,
            speed : player.speed,
            name  : player.name
        });

    }

    initSubsribers(io, socket) {

        socket.on('player', player => {
            this.player(player);
        })

        socket.on('movement', movement => {
            console.log(movement);
        })

    }

    player(data) {
        console.log(data);
    }



}
