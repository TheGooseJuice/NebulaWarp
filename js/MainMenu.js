class MainMenu extends Phaser.Scene {
    constructor() {
        super({key:"MainMenu"});
    }

    create(){
        this.coin = this.add.sprite(400,300, 'Casa1');
        this.coin.setInteractive();
        this.coin.once('pointerup', function () {

            this.scene.start('GamePlay');

        }, this);
    }
}