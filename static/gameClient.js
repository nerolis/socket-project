class Client {}

class GameObject {}

class Player {
  constructor(player) {
    this.id    = player.id;
    this.name  = player.name;
    this.date  = player.date;
    this.speed = player.speed;
    this.hp    = player.hp;
  }
}


document.addEventListener('DOMContentLoaded', () => {

  const socket = io();

  socket.on('connected', playerStats => {

    const player = new Player(playerStats);

    console.log(player);
  
  });

});
