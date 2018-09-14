export default class GameSever {
    constructor(io) {
        this.init(io)
    }

    init(io) {
        
        io.on('connection', socket => console.log('Socket inited'));

        setInterval(() => {
            io.sockets.emit('message', 'hi!');
        }, 1000);
    }
}