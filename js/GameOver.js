class GameOver extends Phaser.Scene {
    constructor() {
        super({key:"GameOver"});
    }

    preload(){
      //  this.load.image('coin', 'assets/coinGold.png' );
    }

    create(){
        this.coin = this.add.sprite(20,300, 'coin');
        this.coin.setInteractive();
        this.coin.once('pointerup', function () {

            this.scene.start('MainMenu');

        }, this);
    }
}