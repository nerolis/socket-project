document.addEventListener('DOMContentLoaded', e => {

  const socket = io();

  socket.on('connected', playerInfo => console.log(playerInfo));
});
