class Preload extends Phaser.Scene {
    constructor() {
        super({key:"Preload"});
    }

    preload(){
    var progress = this.add.graphics();

    this.load.on('progress', function (value) {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', function () {

        progress.destroy();

    });

    this.load.image('Casa1', 'assets/CasaMonstro/CasaMonstro1.png');
    this.load.image('Casa2', 'assets/CasaMonstro/CasaMonstro2.png');
    this.load.image('Casa3', 'assets/CasaMonstro/CasaMonstro3.png');
    this.load.image('Casa4', 'assets/CasaMonstro/CasaMonstro4.png');
    this.load.image('Casa5', 'assets/CasaMonstro/CasaMonstro5.png');
    this.load.image('background', 'assets/Background-1.png');
 	this.load.image('player', 'assets/ship.png');
 	this.load.image('dragon', 'assets/asteroids3.png');
    this.load.image('treasure', 'assets/star.png');
    this.load.image('player', 'assets/ship.png');
    this.load.image('explode', 'assets/orangelight.png');
    this.load.image('explodeA', 'assets/purplelight.png');
    this.load.image('explodeM', 'assets/whitelight.png');
    this.load.audio('theme', ['assets/NebulaRushTheme.ogg']);
    this.load.audio('death', ['assets/ExplosionOver.wav']);
    this.load.audio('over', ['assets/Explosion2.wav']);
    this.load.audio('pickup', ['assets/Pickup.wav']);
    this.load.audio('powerup', ['assets/Powerup.wav']);
    this.load.audio('monHurt', ['assets/monstro.wav']);
    this.load.audio('ast', ['assets/ast.wav']);
    this.load.audio('thunder', ['assets/teleport.wav']);
    this.load.audio('shipUp', ['assets/shipUp.wav']);
    this.load.audio('jump', ['assets/Jump.wav']);
    this.load.audio('gg', ['assets/gameover.wav']);
    this.load.audio('roar', ['assets/roar.wav']);
     
    }

    create(){
        this.scene.start('GamePlay');
    }
}