let players = {};

class Player {
  constructor(socket) {
    this.socket = socket;
  }

  character() {
    return {
      playerId 	: this.socket.id,
      rotation	: 0,
      hp		: 100,
      speed		: 2,
      x			: Math.floor(Math.random() * 700) + 50,
      y			: Math.floor(Math.random() * 500) + 50,
      team		: (Math.floor(Math.random() * 2) == 0) ? '0x0000ff' : '0xff0000',
      alive		: true
    };
  }

  delete() {
    delete players[this.socket.id];
  }

  movement(movement) {
    players[this.socket.id].x 		 = movement.x;
    players[this.socket.id].y		 = movement.y;
    players[this.socket.id].rotation = movement.rotation;
  }

}


/**
 * @todo врап для emit & on
 */
export default class Server {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player(this.socket);
    this.initEmiters();
    this.initSubscribers();
  }

  initEmiters() {        
    setInterval(() => { 
      this.socket.emit('state', players);
    }, 1000 / 60);			
  }
    
  initSubscribers() {
    this.socket.on('newPlayer', () => this.newPlayer());
    this.socket.on('disconnect', () => this.removePlayer());
    this.socket.on('playerMovement', movement => this.playerMovement(movement));
  }

  newPlayer() {
    players[this.socket.id] = this.player.character();
    this.socket.emit('currentPlayers', players);
    this.socket.broadcast.emit('newPlayer', players[this.socket.id]);
  }

  removePlayer() {
    this.player.delete();
    this.socket.broadcast.emit('playerDisconnect', this.socket.id);
  }

  playerMovement(movement) {
    this.player.movement(movement);
    this.socket.broadcast.emit('playerMoved', players[this.socket.id]);
  }
}
