import 'phaser';

import BootScene   from './scenes/BootScene';
import TitleScene  from './scenes/TitleScene';
import GameScene   from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
    scene: [ BootScene, TitleScene, GameScene ]
};

const game = new Phaser.Game(config);
