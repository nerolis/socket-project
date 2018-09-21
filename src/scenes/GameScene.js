import { socket } from '../client';

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }


    preload() {
        socket.emit('newPlayer');

        this.otherPlayers = this.physics.add.group();
        this.cursors      = this.input.keyboard.createCursorKeys();
    }

    create() { 
        
        socket.on('newPlayer', playerInfo => this.addOtherPlayer(this, playerInfo));

        socket.on('playerDisconnect', playerId => this.otherPlayers.getChildren().map(otherPlayer => playerId === otherPlayer.playerId ? otherPlayer.destroy() : null));

        socket.on('currentPlayers', players => Object.keys(players).map(id => players[id].playerId === socket.id ? this.addPlayer(this, players[id]) : this.addOtherPlayer(this, players[id])));

        socket.on('playerMoved', playerInfo => {
            this.otherPlayers.getChildren().map(otherPlayer => {
              if (playerInfo.playerId === otherPlayer.playerId) {
                otherPlayer.setRotation(playerInfo.rotation);
                otherPlayer.setPosition(playerInfo.x, playerInfo.y);
              }
            });
        });        
    }

    /**
     * @todo refactor
     */
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


    /**
     * 
     * @param {{}} self 
     * @param {{}} playerInfo
     * @description add player to the map 
     */
    addPlayer(self, playerInfo) {
        self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'ship').setOrigin(0.5, 0.5).setDisplaySize(53, 40);
        self.ship.setTint(playerInfo.team);
        self.ship.setDrag(100);
        self.ship.setAngularDrag(100);
        self.ship.setMaxVelocity(200);
    }

    /**
     * @param {{}} self 
     * @param {{}} playerInfo 
     * @description addother player to the map
     */
    addOtherPlayer(self, playerInfo) {
        const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'otherPlayer')
        
        otherPlayer.setOrigin(0.5, 0.5);
        otherPlayer.setDisplaySize(53, 40);
        otherPlayer.setTint(playerInfo.team);
        otherPlayer.playerId = playerInfo.playerId;

        self.otherPlayers.add(otherPlayer);
    }
}

export default GameScene;