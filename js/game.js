var config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [ mainScene ]
};

var game = new Phaser.Game(config);