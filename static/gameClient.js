class World {
  constructor() {
    this.canvas  = document.getElementById('canvas');
    this.initWorld();
    this.context = this.canvas.getContext('2d');
  }

  initWorld() {
    this.canvas.width = 800;
    this.canvas.height = 600;
  }
}


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
    this.world = new World();
    this.initEmiters(socket);
    this.initSubscribers(socket);
    this.player;
  }

  initEmiters(socket) {
    // Send info that there is an player.
    socket.emit('newPlayer');

    setInterval(() => {
      if (this.player) {
        socket.emit('movement', this.player.movement);
      }
    }, 1000 / 60);

  }

  initSubscribers(socket) {
    socket.on('connected', playerStats =>  this.player = new Player(playerStats));
    socket.on('state', players => this.worldState(players));
  }

  worldState(players) {
    this.world.context.clearRect(0, 0, 800, 600);
    this.world.context.fillStyle = 'green';
    
    for (let id in players) {
      
      let player = players[id];

      this.world.context.beginPath();
      this.world.context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
      this.world.context.fill();
    }
  }
}



document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  new Client(socket);
});
