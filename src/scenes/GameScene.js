import { socket } from '../client';

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.emiters();
        this.subscribers();
    }

    create() { 
        socket.on('currentPlayers', players => {
            Object.keys(players).map(id => {
                if(players[id].playerId === socket.id) {
                    this.addPlayer(this, players[id]);
                }
            })
        });
    }

    emiters() {
        socket.emit('newPlayer');
    }

    subscribers() {
        socket.on('state',  players => {
            
        });
    }

    addPlayer(self, playerInfo) {
        self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        console.log(self.ship);
        if (playerInfo.team === 'blue') {
          self.ship.setTint(0x0000ff);
        } else {
          self.ship.setTint(0xff0000);
        }
        self.ship.setDrag(100);
        self.ship.setAngularDrag(100);
        self.ship.setMaxVelocity(200);
    }
}


export default GameScene;