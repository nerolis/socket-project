import { socket } from '../client';

class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }

    preload() {
        console.log(socket);
        this.scene.start('GameScene');
    }
}

export default TitleScene;