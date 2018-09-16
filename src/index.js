import 'phaser';

import BootScene   from './scenes/BootScene';
import TitleScene  from './scenes/TitleScene';
import GameScene   from './scenes/GameScene';

const config = {
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ BootScene, TitleScene, GameScene ]
};

const game = new Phaser.Game(config);
