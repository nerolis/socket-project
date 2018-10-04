export default class Player {
  constructor(socket, players) {
    this.socket  = socket;
    this.players = players;
  }
  
  character() {
    return {
      playerId 	: this.socket.id,
      rotation	: 0,
      hp	   	: 100,
      speed	  	: 2,
      x			: Math.floor(Math.random() * 700) + 50,
      y			: Math.floor(Math.random() * 500) + 50,
      team	  	: (Math.floor(Math.random() * 2) == 0) ? '0x0000ff' : '0xff0000',
      alive	  	: true
    };
  }
  
  delete() {
    delete this.players[this.socket.id];
  }
  
  movement(movement) {
    this.players[this.socket.id].x = movement.x;
    this.players[this.socket.id].y = movement.y;
    this.players[this.socket.id].rotation = movement.rotation;
  }
}