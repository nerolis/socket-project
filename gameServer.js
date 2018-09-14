import uuidv1 from 'uuid/v1';

export default class GameServer {
    constructor(io, gameSocket) {
        this.init(io, gameSocket)
    }

    init(io, gameSocket) {
        gameSocket.emit('connected', {
            uuid : uuidv1(),
            date : Date.now()
        });
    }
}
