import { socket } from '../client';

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        console.log(socket);
    }

    create() {

    }
}

export default GameScene;