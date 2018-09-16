import { socket } from '../client';

class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        this.load.image('ship', '/dist/assets/spaceShips_001.png')
        this.scene.start('TitleScene');
    }

}

export default BootScene;