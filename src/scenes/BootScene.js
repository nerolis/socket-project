import { socket } from '../client';

class BootScene extends Phaser.Scene {
    constructor() {
        super({key: 'BootScene'});
    }

    preload() {
        const progress = this.add.graphics();

        this.load.image('ship', './dist/assets/spaceShips_001.png');

        this.load.on('progress', value => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            // prepare all animations, defined in a separate file
            progress.destroy();
            this.scene.start('TitleScene');
        });
    }

}

export default BootScene;