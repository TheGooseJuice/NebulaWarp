class MainMenu extends SVGPathSegArcRel.Scene {
    constructor() {
        super({key:"MainMenu"});
    }

    preload(){
        this.load.sprite('coin', 'assets/coinGold.png' );
    }

    create(){
        this.coin = this.add.sprite(400,300, 'coin');
    }
}