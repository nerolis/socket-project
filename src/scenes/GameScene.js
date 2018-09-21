import { socket } from '../client';

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        socket.emit('newPlayer');
    }

    create() { 
        const self = this;

        this.otherPlayers = this.physics.add.group();

        socket.on('currentPlayers', players => {
            Object.keys(players).map(id => {
                if(players[id].playerId === socket.id) {
                    this.addPlayer(self, players[id]);
                } else {
                    this.addOthersPlayers(self, players[id]);
                }
            })
        });

        socket.on('newPlayer', playerInfo => {
            this.addOthersPlayers(self, playerInfo);
        });

        socket.on('playerDisconnect', playerId => {
            console.log(playerId);
            self.otherPlayers.getChildren().map(otherPlayer => {
              if (playerId === otherPlayer.playerId) {
                otherPlayer.destroy();
              }
            });
        });

        socket.on('playerMoved', playerInfo => {
            self.otherPlayers.getChildren().map(otherPlayer => {
              if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setRotation(playerInfo.rotation);
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
              }
            });
          });        

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.ship) {
            if (this.cursors.left.isDown) {
              this.ship.setAngularVelocity(-150);
            } else if (this.cursors.right.isDown) {
              this.ship.setAngularVelocity(150);
            } else {
              this.ship.setAngularVelocity(0);
            }
          
            if (this.cursors.up.isDown) {
              this.physics.velocityFromRotation(this.ship.rotation + 1.5, 100, this.ship.body.acceleration);
            } else {
              this.ship.setAcceleration(0);
            }
          
            this.physics.world.wrap(this.ship, 5);

            // emit player movement
            const x = this.ship.x,
                  y = this.ship.y,
                  r = this.ship.rotation;

            if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
                socket.emit('playerMovement', { 
                    x       : this.ship.x,
                    y       : this.ship.y,
                    rotation: this.ship.rotation 
                });
            }
            
            this.ship.oldPosition = {
                x       : this.ship.x,
                y       : this.ship.y,
                rotation: this.ship.rotation
            };            
          }
    }


    addPlayer(self, playerInfo) {
        self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

        if (playerInfo.team === 'blue') {
          self.ship.setTint(0x0000ff);
        } else {
            self.ship.setTint(0xff0000);
        }

        self.ship.setDrag(100);
        self.ship.setAngularDrag(100);
        self.ship.setMaxVelocity(200);
    }

    addOthersPlayers(self, playerInfo) {
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer').setOrigin(0.5, 0.5).setDisplaySize(53, 40);

        if (playerInfo.team === 'blue') {
          otherPlayer.setTint(0x0000ff);
        } else {
            otherPlayer.setTint(0xff0000);
        }

        otherPlayer.playerId = playerInfo.playerId;
        self.otherPlayers.add(otherPlayer);
    }
}

export default GameScene;