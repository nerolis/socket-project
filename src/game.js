import Phaser      from 'phaser';
import BootScene   from './scenes/BootScene';
import GameScene   from './scenes/GameScene';

export const config = {
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
	scene: [ BootScene, GameScene ]
};

export const game = new Phaser.Game(config);