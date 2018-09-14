document.addEventListener('DOMContentLoaded', e => {
  const socket = io();

  socket.on('message', data => {
    console.log(data);
  });
  
});
