import { socket } from '../client';

class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        console.log(socket);

        this.scene.start('TitleScene');
    }

}

export default BootScene;