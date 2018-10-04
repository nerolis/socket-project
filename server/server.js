/**
 * @todo Redis
 */
let players = {};

import Player from './player';

/**
 * @todo wrap socket on/emit
 */
export default class Server {
  constructor(socket) {
    this.socket = socket;
    this.player = new Player(this.socket, players);
    this.subscribers();
  }

  subscribers() {
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
