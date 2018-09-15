class Player {
    constructor() {
      this.name  = 'Player';
      this.speed = 2;
      this.hp    = 100; 
    }
}

export default class GameServer {
    constructor(io, gameSocket) {
        this.init(io, gameSocket)
    }
    

    init(io, gameSocket) {

        const player = new Player();

        gameSocket.emit('connected', {
            id    : gameSocket.id,
            date  : Date.now(),
            hp    : player.hp,
            speed : player.speed,
            name  : player.name
        });

    }
}
