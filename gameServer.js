class World {
	constructor(socket) {
		return 0;
	}
}

let players = {};
class Player {
	constructor(socket) {
		this.rotation = 0,
		this.playerId = socket.id,
		this.x        = Math.floor(Math.random() * 700) + 50,
		this.y        = Math.floor(Math.random() * 500) + 50,
		this.team     = (Math.floor(Math.random() * 2) == 0) ? '0x0000ff' : '0xff0000';
	}
}


export default class Server {
	constructor(socket) {
		this.socket = socket;
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

	/**
     * 
     * @description создаем игрока, записываем в объект. Эмиттим в клиент. 
     */
	newPlayer() {
		players[this.socket.id] = new Player(this.socket);
		this.socket.emit('currentPlayers', players);
		this.socket.broadcast.emit('newPlayer', players[this.socket.id]);
	}

	/**
     * 
     * @description удаляем игрока, эммитим событие удаления. Клиент подхватывает и удаляет у себя.
     */
	removePlayer() {
		delete players[this.socket.id];
		this.socket.broadcast.emit('playerDisconnect', this.socket.id);
	}

	/**
     * 
     * @param {{x: number, y: number, rotation: number}} movement 
     * @description получаем от клиента координаты. Отдаем обратно.
     */
	playerMovement(movement) {
		players[this.socket.id].x = movement.x;
		players[this.socket.id].y = movement.y;
		players[this.socket.id].rotation = movement.rotation;
		this.socket.broadcast.emit('playerMoved', players[this.socket.id]);
	}
}
