class Player {
  constructor(player) {

    this.id    = player.id;
    this.name  = player.name;
    this.date  = player.date;
    this.speed = player.speed;
    this.hp    = player.hp;
    
    this.keyboard();

    this.movement = {
      up    : false,
      down  : false,
      left  : false,
      right : false
    }
  }
  
  keyboard() {

    document.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case 65: // A
          this.movement.left = false;
          break;
        case 87: // W
          this.movement.up = false;
          break;
        case 68: // D
          this.movement.right = false;
          break;
        case 83: // S
          this.movement.down = false;
          break;
      }
    });

    document.addEventListener('keydown', event => {
      switch (event.keyCode) {
        case 65: // A
        this.movement.left = true;
          break;
        case 87: // W
        this.movement.up = true;
          break;
        case 68: // D
        this.movement.right = true;
          break;
        case 83: // S
        this.movement.down = true;
          break;
      }
    });
  }
}


class Client {
  constructor(socket) {
    this.initEmiters(socket);
    this.initSubscribers(socket);
    this.player;
  }

  initEmiters(socket) {

    setInterval(() => {
      if (this.player) {
        socket.emit('movement', this.player.movement);
      }
    }, 1000 / 60);

  }

  initSubscribers(socket) {
    socket.on('connected', playerStats =>  this.player = new Player(playerStats));
  }

}

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  new Client(socket);
});
