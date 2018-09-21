let players = {};

class Player {
    constructor() {
      this.name  = 'Player';
      this.speed = 2;
      this.hp    = 100; 
    }
}

class World {}

export default class GameServer {
    constructor(io, socket) {
        this.player = new Player();
        this.world  = new World();

        this.initEmiters(io, socket);
        this.initSubscribers(io, socket);
    }
    
    initEmiters(io, socket) {        
        setInterval(() => { 
            socket.emit('state', players);
        }, 1000 / 60);
    }
    
    initSubscribers(io, socket) {
        socket.on('newPlayer', () => this.newPlayer(socket));
        socket.on('disconnect', () => this.removePlayer(socket));
        socket.on('playerMovement', movement => this.playerMovement(movement, socket));
    }

    /**
     * 
     * @param {{id: number}} socket
     * @description создаем игрока, записываем в объект. Эмиттим в клиент. 
     */
    newPlayer(socket) {
        players[socket.id] = {
            rotation    : 0,
            x           : Math.floor(Math.random() * 700) + 50,
            y           : Math.floor(Math.random() * 500) + 50,
            playerId    : socket.id,
            team        : (Math.floor(Math.random() * 2) == 0) ? '0x0000ff' : '0xff0000'
        };

        socket.emit('currentPlayers', players);
        socket.broadcast.emit('newPlayer', players[socket.id]);
    }

    /**
     * 
     * @param {{id: number}} socket 
     * @description удаляем игрока, эммитим событие удаления. Клиент подхватывает и удаляет у себя.
     */
    removePlayer(socket) {
        delete players[socket.id];
        socket.broadcast.emit('playerDisconnect', socket.id);
    }

    /**
     * 
     * @param {{x: number, y: number, rotation: number}} movement 
     * @param {{id: number}} socket 
     * @description получаем от клиента координаты. Отдаем обратно.
     */
    playerMovement(movement, socket) {
        players[socket.id].x = movement.x;
        players[socket.id].y = movement.y;
        players[socket.id].rotation = movement.rotation;
        socket.broadcast.emit('playerMoved', players[socket.id]);
    }
}
