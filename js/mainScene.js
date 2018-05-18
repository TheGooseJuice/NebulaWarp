class mainScene extends Phaser.Scene {

    constructor() {
        super({key:"mainScene"});
    }

    
    preload() {

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

    
    



    create() {

        

        this.musicTheme = this.sound.add('theme');
        this.deathSounds = this.sound.add('death');
        this.overSounds = this.sound.add('over');
        this.pickupSounds = this.sound.add('pickup');
        this.powerSounds = this.sound.add('powerup');
        this.monstroHurt = this.sound.add('monHurt');
        this.astSounds = this.sound.add('ast');
        this.thunderSounds = this.sound.add('thunder');
        this.jumpSound = this.sound.add('jump');
        this.ggSounds = this.sound.add('gg');
        this.roarSounds = this.sound.add('roar');

        
        

        this.anims.create({
            key: 'monstro',
            frames: [
                { key: 'Casa1' },
                { key: 'Casa2' },
                { key: 'Casa3' },
                { key: 'Casa4' },
                { key: 'Casa5', duration: 50 }
            ],
            frameRate: 5,
            repeat: -1
        });
    
    this.monstro = this.physics.add.sprite(1000, 720, 'Casa1').play('monstro').setImmovable(true);
    this.monstro.setScale(2.5);
    this.monstro.setSize(.1, .1, true);

    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    

// adding sprites
    //background sprite

    this.bg = this.physics.add.sprite(0, 0, 'background');
    this.bg.setOrigin(0, 0);
    this.bg.setScale(.5)
    this.bgMaxSpeed = 200;

    this.bg2 = this.physics.add.sprite(1024, 0, 'background');
    this.bg2.flipX = true;
    this.bg2.setOrigin(0, 0);
    this.bg2.setScale(.5);


    //player sprite
    this.player = this.physics.add.sprite(110, 150, 'player').setImmovable(true);
    this.player.setCollideWorldBounds(true);
    this.player.setAccelerationY(750);
    this.player.setScale(.75); 
    this.player.setSize(25, 25, true);

    //bonus sprite
    this.treasure = this.add.sprite(900, 250, 'treasure');
    this.treasure.setScale(.25);

    //star counter sprites
    this.star1 = this.add.sprite(-300, -40, 'treasure');
    this.star1.setScale(.1);
    this.star1.setOrigin(0 , 0);
    this.star2 = this.add.sprite(-300, -40, 'treasure');
    this.star2.setScale(.1);
    this.star2.setOrigin(1 , 1);
    this.star3 = this.add.sprite(-300, -40, 'treasure');
    this.star3.setScale(.1);
    this.star3.setOrigin(1 , 0);

    //life counter sprites
    this.life1 = this.add.sprite(-300, -40, 'player');
    this.life1.setScale(.75);
    this.life1.rotation = -.5;
    this.life2 = this.add.sprite(-300, -40, 'player');
    this.life2.setScale(.75);
    this.life2.rotation = -.5;
    this.life3 = this.add.sprite(-300, -40, 'player');
    this.life3.setScale(.75);
    this.life3.rotation = -.5;
  
    //particle systems
    let particles = this.add.particles('explode');

    this.emitter = particles.createEmitter({
        angle: { min: 0, max: 360, steps: 32 },
        lifespan: 1000,
        speed: 400,
        quantity: 32,
        scale: { start: 0.15, end: 0 },
        on: false
    });

    let particlesM = this.add.particles('explodeM');

    this.emitterM = particlesM.createEmitter({
        lifespan: 200,
        tint: { start: 0xff0000, end: 0xffffff },
        scale: { start: .04, end: .01, random: true },
        alpha: { start: 1, end: 0 },
        particleAngle: { start: 0, end: 360 },
        active: true,
        on : false
    });

    let particlesA = this.add.particles('explodeA');

    this.emitterA = particlesA.createEmitter({
        speed: 1000,
        tint: { start: 0xffd700, end: 0xffff00 },
        scale: { start: .15, end: 0 },
        accelerationX: -2500,
        lifespan: 50,
        frequency: 3,
        quantity: 2,
        blendMode: 'ADD',
        on: false
        
    });

    let emitterPlayerTrail = particles.createEmitter({
        lifespan: 100,
        accelerationX: -12500,
        x:  -30,
        scale: { start: .05, end: 0 },
        blendMode: 'ADD'
    });

    emitterPlayerTrail.startFollow(this.player);

    
    

    let particles2 = this.add.particles('dragon');

    let emitter2 = particles2.createEmitter({
        lifespan: 100,
        accelerationX: 12500,
        x:  15,
        scale: { start: .1, end: 0 },
        blendMode: 'ADD'
    });

    let emitter3 = particles2.createEmitter({
        lifespan: 100,
        accelerationX: 12500,
        x:  15,
        scale: { start: .1, end: 0 },
        blendMode: 'ADD'
    });

    let emitter4 = particles2.createEmitter({
        lifespan: 100,
        accelerationX: 12500,
        x:  15,
        scale: { start: .1, end: 0 },
        blendMode: 'ADD'           
    });

    let emitter5 = particles2.createEmitter({
        lifespan: 100,
        accelerationX: 12500,
        x:  15,
        scale: { start: .1, end: 0 },
        blendMode: 'ADD'
    });
    
    //enemy group
    this.enemies = this.add.group();
        for(var i = 0; i < 4 ; i++){
        this.enemies.create(700 + Math.random()*850, 10 + Math.random()* 300, 'dragon');               
    }

    //particles on ast
    emitter2.startFollow(this.enemies.children.entries[0]);
    emitter3.startFollow(this.enemies.children.entries[1]);
    emitter4.startFollow(this.enemies.children.entries[2]);
    emitter5.startFollow(this.enemies.children.entries[3]);

    //score set up
    this.scoreText = this.add.text(520, 10, "Score: "+ this.score, { fontFamily: 'Impact', fontSize: 20, color: '#fff'});
    this.highScoreText = this.add.text(520, 30, "High Score "+ this.highScore, { fontFamily: 'Impact', fontSize: 14, color: '#ffd700'});
    this.livesText = this.add.text(450, 330, " ");
    this.starsText = this.add.text(10, 150, "Stars ");
    this.gameOverText = this.add.text(320, -100, "Game Over", { fontFamily: 'Impact', fontSize: 64, color: '#fff'});
    this.gameOverText.setOrigin(0.5, 0.5);
    this.clickText = this.add.text(320, 170, "Click to Start", { fontFamily: 'Impact', fontSize: 32, color: '#fff'});
    this.astText = this.add.text(100, 300, "", { fontFamily: 'Impact', fontSize: 16, color: '#fff'});
    this.musicText = this.add.text(320, 360, 'music on', { fontFamily: 'Impact', fontSize: 16, color: '#fff'});
  
    this.score = 0;
    this.highScore = 250;
    this.lives = 2;
    this.stars = 0;
    this.mLives = 3;
    this.astCount = 15;

     //life and star power
    this.astCounter = 0;
    this.sPower = false;
    this.dead = false;
    this.mousedown = false;
    this.flash = false;
    this.flash2 = false;
    this.over = false;
    this.ast1 = false;
    this.ast2 = false;
    this.ast3 = false;
    this.ast4 = false;
    this.start = false;
    this.mDead = false;
    this.bossRespawn = false;
    this.level1 = false;
    this.level2 = false;
    this.level3 = false;
    this.soundP = false;
    this.soundOn = false;
    this.soundButt = false;
    this.jSound = false;
    this.soundBegin = true;
    }


    

update(delta) {

    //this.sPower = true;

    

    this.engineSounds();

    this.astAmount();

    this.respawnBoss();

    this.changeBg3();

//background movement
    this.backgroundSet();

//Enemy
    this.enemySet();          
    
//treasure
    this.treasureMove();

    if(this.treasure.x <= - 90){
        this.treasureReset();
    }

    if(this.score >= 10){          
        this.treasureHit();    
    }

//Score 
    if(this.score > this.highScore){
        this.highScore = this.score;
    }
    this.updateText();

    this.astTintChange();

//player movement
    this.playerSet();

    this.startOver()

    this.starDisplay();

    this.lifeDisplay();

    this.newStarResetRot();

    this.monstroMove();

    if(this.start == true){
        this.clickText.x = 800;
        if(this.soundOn == false && this.soundBegin == true){
            this.soundOn = true;
            this.soundBegin = false;
        }
        
    }else{
        this.clickText.x = 320;
        this.playTextWobble();
        this.soundBegin = true;
    }

    
   
    
}

engineSounds(){

    if (this.keyA.isDown && this.soundButt == false){
        this.soundOn = !this.soundOn;
        this.musicText.setText('Music ON');
        this.musicText.y = 320;
        this.musicText.y == this.musicText.y--;
        this.soundButt = true;
        this.time.delayedCall(500, function(){
            this.musicText.y = 360;
            this.soundButt = false      
        }, [], this);
    }

    if(this.soundOn == false){
        this.musicTheme.play({
            loop: true
        });
        this.musicText.setText('Music OFF');
        
    }
}

respawnBoss(){
    if(this.score >= 6000&& this.bossRespawn == false){
        this.mLives = 3;
        this.monstro.tint = 0xddffdd;
        this.bossRespawn = true;
    }
}

astAmount(){
    if(this.score<=3000){
        this.astCount = 10;
    }else{
        this.astCount = 15;
    }
}

playerSet(){
    if (this.input.activePointer.isDown&&!this.mousedown){
        this.player.body.setVelocityY(-275);
        this.start = true;

        if(this.jSound == false){
            this.jumpSound.play();
            this.jSound = true;
        }
        
       
    }else{
        this.jSound = false;
        this.player.body.setAccelerationY(800);
    }
    if(this.player.body.velocity.y > 0){
        this.player.body.rotation = 10;

        
    }
    if(this.player.body.velocity.y == 0){
        this.player.body.rotation = 0;
    }
    if(this.player.body.velocity.y < 0){
        this.player.body.rotation = -10;

        
    }
    if(this.mousedown){
        this.player.flipY = true;
    }
    if(this.player.y < 300 || this.player.body.velocity.y <=30){
        if(this.dead == true && this.over == false){
            this.respawnDead();
        }   
    }

    this.playerIdol();

    if(this.stars >= 3){
        this.startSuper();
        
    }
    if(this.sPower == true){       
        this.superPower();
        this.powerAst();
        this.powerHitAst();
        
    }
    if(this.sPower == true){ 
        if(this.astCounter >= this.astCount){         
            this.removePower();
            this.astBoolReset();
        }     
    }
}

backgroundSet(){

    this.bg.tint = 0xffffff;
    this.bg2.tint = 0xffffff;    
    this.bg2.flipX;

    if(this.score == 0){
        this.resetBg();
    }
    if(this.start == true){
        this.bg.setVelocityX(-70);
        this.bg2.setVelocityX(-70);
    }else{
        this.bg.setVelocityX(-this.score / 300 - 30);
        this.bg2.setVelocityX(-this.score / 300 - 30);
    }

    if(this.sPower == true){
        this.bg.setVelocityX(-300);
        this.bg2.setVelocityX(-300);
    }

    if(this.bg.x <= -1024){
        this.bg.x = 1024;
        this.bg2.x = 0;
    }
    
    if(this.bg2.x <= -1024){
        this.bg2.x = 1024;
        this.bg.x = 0;
    }
}

enemySet(){

    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
        enemies[i].setScale(.15);
        if(this.start == true){
            enemies[i].tint = 0xffbb60;   
            enemies[i].rotation += 0.125;
                if(this.score <= 2500){
                    enemies[i].x -= 3 + (this.score / 1000); 
                }else{
                    enemies[i].x -= 5.5;
                }

        }        
        if(enemies[i].x <= -90 ){
            enemies[i].x = Math.random() * 700 + 900;
            enemies[i].y = 1 + Math.random() * 360;  
            if(this.over == false){
                this.score += 10;
            }           
            this.astCounter += 1;
            this.astBoolReset();
        }

        if(enemies[i].y <= -40 || enemies[i].y >= 640 ){
            enemies[i].y == enemies[i].y--;
        }

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())&&!this.dead&&!this.sPower&&this.start == true){
            if(this.lives > 0){
                this.live == this.lives--;
                this.stars == this.stars--;
                this.playerHit();
                this.enemies.children.entries[0].x = 1500;
                this.enemies.children.entries[1].x = 1200;
                this.enemies.children.entries[2].x = 1300;
                this.enemies.children.entries[3].x = 1200;
            }else{                   
                this.overTrue();
                this.emitter.emitParticleAt(this.player.x , this.player.y);
        }
        
    }
    
    }
}

    monstroMove(){

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.monstro.getBounds())&&!this.dead&&!this.sPower&&this.start == true){
            if(this.lives > 0){
                this.live == this.lives--;
                this.stars == this.stars--;
                this.playerHit();
                this.enemies.children.entries[0].x = 1500;
                this.enemies.children.entries[1].x = 1200;
                this.enemies.children.entries[2].x = 1300;
                this.enemies.children.entries[3].x = 1200;
                this.monstro.x = 2000;
            }else{                   
                this.overTrue();
                this.emitter.emitParticleAt(this.player.x , this.player.y);
                
        }
    }

    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.monstro.getBounds())&&!this.dead&&this.sPower== true &&this.start == true){
        if(this.mLives > 0 && this.mDead == false){
            this.score = this.score + 200;
            this.astCount += 5;  
            this.mDead = true; 
            this.mLives == this.mLives--; 
            this.monstroHurt.play();      
        }
        if(this.mDead == true){
            this.roarSounds.play();
        }
        if(this.mLives <= 0 && this.mDead == false){
            this.emitterM.emitParticleAt(this.monstro.x , this.monstro.y);
            this.time.delayedCall(300, function(){
                this.score = this.score + 1000;
                this.mDead = true;
                this.monstro.body.setVelocityX(0);
                this.monstro.body.setVelocityY(100);
            }, [], this);
            
            
        }
        if(this.monstro.x <= 1500&&this.mLives >= 0){
            this.monstro.body.setVelocityX(0);
            this.monstro.body.setVelocityY(100);
            this.monstro.tint = 0xff0000;
            this.time.delayedCall(700, function(){
                this.monstro.tint = 0xffffff;
                this.mDead = false;
            }, [], this);
        }
    }

        if(this.monstro.x <= -1000){
            this.monstro.x = 700;
            this.monstro.y = 40 + Math.random() * 300;
        }
        if(this.score >= 3200&& this.mLives > 0){
            this.monstro.alpha += 1;
            this.monstro.body.setVelocityX(-300);
            if(this.monstro.y <= 150){
                this.monstro.body.setAccelerationY(50)
            }else{
                this.monstro.body.setAccelerationY(-50)
            }
        }else{
            if(this.mDead == true){

            }
            this.emitterM.emitParticleAt(this.monstro.x , this.monstro.y);
            this.time.delayedCall(600, function() {
                this.monstro.x = 1020;
                this.monstro.y = 520;
                this.monstro.body.setVelocityY(0);
                this.monstro.body.setVelocityX(0)
            }, [], this);
          ;

  
        }
    }
newStarResetRot(){
    if(this.newStar == true){
        if(this.stars >= 3){
            this.powerSounds.play();
        }
        this.star1.rotation = 0;
        this.star2.rotation = 0;
        this.star3.rotation = 0;
        this.newStar = false;
    }
}

powerAst(){
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemies.children.entries[0].getBounds())&&!this.dead&&this.sPower == true && this.ast1 == false){
        this.ast1 = true;
        this.score = this.score + 50;
        this.astSounds.play();

    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemies.children.entries[1].getBounds())&&!this.dead&&this.sPower == true && this.ast2 == false){
        this.ast2 = true;
        this.score = this.score + 50;
        this.astSounds.play();
    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemies.children.entries[2].getBounds())&&!this.dead&&this.sPower == true && this.ast3 == false){
        this.ast3 = true;
        this.score = this.score + 50;
        this.astSounds.play();

    }
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.enemies.children.entries[3].getBounds())&&!this.dead&&this.sPower == true && this.ast4 == false){
        this.ast4 = true;
        this.score = this.score + 50;
        this.astSounds.play();
    }
}

powerHitAst(){
    if(this.ast1 == true){
        if(this.enemies.children.entries[0].y > (340/2)){
            this.enemies.children.entries[0].y += 4;
        }else{
            this.enemies.children.entries[0].y -= 4;
        }
    }
    if(this.ast2 == true){
        if(this.enemies.children.entries[1].y >= (340/2)){
            this.enemies.children.entries[1].y += 4;
        }else{
            this.enemies.children.entries[1].y -= 4;
        }
    }
    if(this.ast3 == true){
        if(this.enemies.children.entries[2].y >= (340/2)){
            this.enemies.children.entries[2].y += 4;
        }else{
            this.enemies.children.entries[2].y -= 4;
        }
    }
    if(this.ast4 == true){
        if(this.enemies.children.entries[3].y >= (340/2)){
            this.enemies.children.entries[3].y += 4;
        }else{
            this.enemies.children.entries[3].y -= 4;
        }
    }
}

astBoolReset(){
    this.ast1 = false;
    this.ast2 = false;
    this.ast3 = false;
    this.ast4 = false;
}

astTintChange(){

    if(this.level1 == true){
        this.enemies.children.entries[0].tint = 0xffffff;
        this.enemies.children.entries[1].tint = 0xffffff;
        this.enemies.children.entries[2].tint = 0xffffff;
        this.enemies.children.entries[3].tint = 0xffffff;
    }
    
    if(this.level2 == true){
        this.enemies.children.entries[0].tint = 0xffd700;
        this.enemies.children.entries[1].tint = 0xffd700;
        this.enemies.children.entries[2].tint = 0xffd700;
        this.enemies.children.entries[3].tint = 0xffd700;
    }

    if(this.level3 == true){
        this.enemies.children.entries[0].tint = 0x00ff00;
        this.enemies.children.entries[1].tint = 0x00ff00;
        this.enemies.children.entries[2].tint = 0x00ff00;
        this.enemies.children.entries[3].tint = 0x00ff00;
    }
}

starDisplay(){

    if(this.stars <= -1){
        this.stars = 0;
    }

    if(this.stars == 0 && this.sPower == false){
        this.star1.y = this.starsText.y - 50;
        this.star2.y = this.starsText.y - 50;
        this.star3.y = this.starsText.y - 50;
        this.star1.x = -40;
        this.star2.x = -40;
        this.star3.x = -40;

        this.astText.x =  800;
        this.astText.y =  500;

        this.star1.setScale(.1);
        this.star2.setScale(.1);
        this.star3.setScale(.1);
    }

    if(this.stars == 1){
        this.star1.y = this.player.y;
        this.star2.y = this.starsText.x - 50;
        this.star3.y = this.starsText.y - 50;
        this.star1.x = this.player.x;
        this.star2.x = -40;
        this.star3.x = -40;
        this.star1.setScale(.15);
        this.star2.setScale(.15);
        this.star3.setScale(.15);
        this.star1.rotation += .05;
        this.star2.rotation += 0;
        this.star3.rotation += 0;       
    }

    if(this.stars == 2){
        this.star1.y = this.player.y;
        this.star2.y = this.player.y;
        this.star3.y = this.starsText.y - 50;
        this.star1.x = this.player.x;
        this.star2.x = this.player.x;
        this.star3.x = -40;
        this.star2.setOrigin(1 , 1);
        this.star1.setScale(.15);
        this.star2.setScale(.15);
        this.star3.setScale(.15);
        this.star1.rotation += .05;
        this.star2.rotation += .05;
        this.star3.rotation += 0;       
    }

    if(this.sPower == true){
        this.treasure.x = 700;
        this.star1.y = this.player.y;
        this.star2.y = this.player.y;
        this.star3.y = this.player.y;
        this.star1.x = this.player.x;
        this.star2.x = this.player.x;
        this.star3.x = this.player.x;
        this.star2.setOrigin(.5 , 1);
        this.star1.setScale(.17);
        this.star2.setScale(.17);
        this.star3.setScale(.17);
        this.star1.rotation += .25;
        this.star2.rotation += .25;
        this.star3.rotation += .25;
        if(this.astCounter >= this.astCount - 3){
            this.star1.rotation -= .15;
            this.star2.rotation -= .15;
            this.star3.rotation -= .15;
            this.player.tint = 0xffffff;
        }


        this.astText.x =  this.player.x;
        this.astText.y =  this.player.y;
    }
}

lifeDisplay(){

    if(this.over == true){
        this.life1.y = this.livesText.y - 50;
        this.life2.y = this.livesText.y - 50;
        this.life3.y = this.livesText.y - 50;
        this.life1.x = -40;
        this.life2.x = -40;
        this.life3.x = -40;
    }

    if(this.lives == 0 && !this.over){
        this.life1.x = this.livesText.x + 70;
        this.life2.x = this.livesText. x- 50;
        this.life3.x = this.livesText.x - 50;
        this.life1.y = this.livesText.y + 10;
        this.life2.y = -40;
        this.life3.y = -40;
        
    }

    if(this.lives == 1){
        this.life1.x = this.livesText.x + 70;
        this.life2.x = this.livesText.x + 110;
        this.life3.x = this.livesText.x - 50;
        this.life1.y = this.livesText.y + 10;
        this.life2.y = this.livesText.y + 10;
        this.life3.y = -40;
        
    }

    if(this.lives == 2){
        this.life1.x = this.livesText .x + 70;
        this.life2.x = this.livesText.x + 110;
        this.life3.x = this.livesText.x + 150;
        this.life1.y = this.livesText.y + 10;
        this.life2.y = this.livesText.y + 10;
        this.life3.y = this.livesText.y + 10;
    }
}

treasureMove(){
    if(this.start == true){
        this.treasure.x == this.treasure.x--;
    }
}

treasureReset(){
    this.treasure.x = Math.random() * 700 + 900;
    this.treasure.y = Math.random() * 300 + 20;
}

treasureHit(){
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())&&!this.dead&&this.start == true){
        this.pickupSounds.play();
        this.newStar = true;
        this.stars += 1;
        this.score += 50;
        this.treasure.x = 900;
        this.treasure.y = Math.random() * 300 + 20;

        if(this.score >= 1000 && this.flash == false){       
            this.changeBg();
            this.flash = true;
        }
        if(this.score >= 2000 && this.flash2 == false){
            this.changeBg2();
            this.flash2 = true;
        }   
    }
}

updateText(){
    this.scoreText.setText("Score: "+ this.score);
    this.highScoreText.setText("High Score: "+ this.highScore);
    this.livesText.setText("");
    this.starsText.setText("");
    
}

respawnDead(){

    this.time.delayedCall(500, function(){
        this.player.tint = 0xffffff;
        this.player.setCollideWorldBounds(true);
        this.mousedown = false;
        this.player.flipY = false;
        this.dead = false;
    }, [], this);

}


startSuper(){             
    this.sPower = true;
    this.astCounter = 0;
    this.time.delayedCall(600, function() {
        this.stars = 0;
    }, [], this); 
}

removePower(){
    this.sPower = false;
    this.player.setTint(0xffffff);
}

superPower(){
    this.player.setTint(0xdddddd*Math.random()*0xffffff);
    if(this.soundP == true){
        this.powerSounds.play();
        this.soundP = false;
    }
    
}

resetBg(){
    this.time.delayedCall(500, function() {
        this.bg.y = 0;
        this.bg2.y = 0;
    }, [], this); 

    this.bg.tint = 0xffffff;
    this.bg2.tint = 0xffffff;
    this.bg.setVelocityX(-this.score / 3 - 30);
    this.bg2.setVelocityX(-this.score / 3 - 30);
}

    changeBg(){
        this.thunderSounds.play();
        this.level1 = true;
        this.cameras.main.flash(500);
        this.bg.x = 0;
        this.bg2.x = 1024;
        this.bg.y = -950;
        this.bg2.y = -950;
        this.bg.tint = 0xffffff;
        this.bg2.tint = 0xffffff;
        this.bg.setVelocityX(-this.score / 1000);
        this.bg2.setVelocityX(-this.score / 1000);
        
    }

    changeBg2(){
        this.thunderSounds.play();
        this.level2 = true;
        this.cameras.main.flash(500);
        this.bg.x = 0;
        this.bg2.x = 1024;
        this.bg.y = -1600;
        this.bg2.y = -1600;
        this.bg.tint = 0xffffff;
        this.bg2.tint = 0xffffff;
        this.bg.setVelocityX(-this.score / 2000);
        this.bg2.setVelocityX(-this.score / 2000);
        this.flash = true;
    }

    changeBg3(){
        
        if(this.score >= 3000&& this.mLives > 0){
            this.level3 = true;
            this.bg.alpha -= 0.01;
            this.bg2.alpha -= 0.01;
        }else{
            this.bg.alpha += 0.01;
            this.bg2.alpha += 0.01;
        }
      
    }

    

    playerHit() {
        this.deathSounds.play();
        this.player.body.setVelocityY(-350);
        this.dead = true;
        this.player.tint = 0xff1111;
        this.cameras.main.shake(150);
        this.mousedown = true;
    };

     overHit() {
        
        this.player.tint = 0xff1111;
        this.player.setCollideWorldBounds(false);
        this.mousedown = true;      
    };

    overTrue(){
        if(this.over == false){
            this.overSounds.play();
        }
        
        this.over = true;
        this.cameras.main.shake(150);  
    }

    startOver(){
        if(this.over == true){
            this.stars = 0;
            this.gameOverText.y == this.gameOverText.y++;
            this.overHit();
    
            if(this.player.y >= 400){
                this.player.y = 0;
                this.player.x = 0;
                this.player.setAccelerationY(0);
                this.player.setScale(0);
            }   
        }
        if(this.gameOverText.y == 320){

            this.gameOverText.y == this.gameOverText.y--;
            
                this.time.delayedCall(500, function(){
                    this.gameOver();
                }, [], this);
        }
    }

    playerIdol(){

        if(this.start == false){
            if(this.player.y >= 170){
                this.player.body.setAccelerationY(-25);
            }
            
            if(this.player.y <= 170){
                this.player.body.setAccelerationY(25);
            }
        }
    }

    playTextWobble(){
        this.clickText.setOrigin(.5, .5);
    }

    gameOver() {
        //camera effects
        this.cameras.main.shake(500);
        this.gameOverText.setText("Game Over");
        
        this.time.delayedCall(20, function() {
        this.cameras.main.fade(100);
        }, [], this);

        this.time.delayedCall(800, function() {
            this.cameras.main.resetFX();
            this.player.y = 150;
            this.lives = 2;
            this.start = false;
            this.musicTheme.stop();
            
        }, [], this);

        this.time.delayedCall(1000, function() {
            this.musicTheme.play();
        }, [], this);

        this.respawnDead();
        

        //reset game
        this.level1 = false;
        this.level2 = false;
        this.level3 = false;
        this.mLives = 3;
        this.over = false;
        this.player.x = 120;
        this.player.setScale(.75);
        this.gameOverText.y = -100;
        this.flash = false;
        this.soundOn = false;
       
        this.score = 0;
        this.player.y = 150;
        this.enemies.children.entries[0].x = Math.random() * 700 + 900;
        this.enemies.children.entries[1].x = Math.random() * 700 + 900;
        this.enemies.children.entries[2].x = Math.random() * 700 + 900;
        this.enemies.children.entries[3].x = Math.random() * 700 + 900;
        this.treasure.x = Math.random() * 700 + 900;

    };


};