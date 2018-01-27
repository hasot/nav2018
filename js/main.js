
var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'container', { preload: preload, create: create, update: update, render: render });

var bullets;
var friendBullets;
var enemies;
var deadEnemies;
var corpses;
var hud;

function preload() {
    game.load.spritesheet('door', 'assets/image/door.png');
    game.load.image('background', 'assets/image/level1Background.png');
    game.load.image('ground', 'assets/image/platform.png');
    game.load.spritesheet('player', 'assets/image/player.png', 32, 64);
    game.load.spritesheet('enemy', 'assets/image/enemy.png', 32, 64);
    game.load.spritesheet('helicopter', 'assets/image/helicopter.png', 99, 64);
    game.load.spritesheet('money', 'assets/image/money.png', 32, 32);    
	game.load.spritesheet('shotingEnemy', 'assets/image/shotingEnemy.png', 32, 64);
    game.load.spritesheet('enemyBullet', 'assets/image/enemyBullet.png', 32, 32);
    game.load.spritesheet('flyingEnemy', 'assets/image/flyingEnemy.png', 32, 64);
    game.load.spritesheet('heavyEnemy', 'assets/image/heavyEnemy.png', 32, 64);
    game.load.spritesheet('boom', 'assets/image/explode.png', 128, 128, 18);
    game.load.spritesheet('heavyEnemyShield', 'assets/image/heavyEnemyShield.png', 32, 64);
    game.load.spritesheet('heavyEnemyHelmet', 'assets/image/heavyEnemyHelmet.png', 32, 64);
    game.load.spritesheet('playerFoot', 'assets/image/hit.png', 64, 64);
    game.load.spritesheet('bossMed', 'assets/image/bossMed.png', 48, 78);
    game.load.spritesheet('smoke', 'assets/image/smoke.png', 128, 128);
    game.load.image('greenSpot', 'assets/image/green.png');
    game.load.image('mandat', 'assets/image/hp.png');
    game.load.image('bossMedHP', 'assets/image/bossMedHP.png');
    game.load.spritesheet('playerHP', 'assets/image/playerHP.png', 32, 32);
    game.load.image('introText', 'assets/image/textView.png');

    game.load.image('deathScreen', 'assets/image/deathScreen.png');
    game.load.spritesheet('bossMedDeath', 'assets/image/bossMedDeath.png', 78, 78);
    game.load.image('startScreen', 'assets/image/startScreen.png');
    game.load.image('beforeBossDialogIntroScene', 'assets/image/intro/beforeBossDialog.png');
    game.load.spritesheet('face', 'assets/image/intro/face.png', 128, 128);
    game.load.spritesheet('bossMedFace', 'assets/image/intro/bossMedFace.png', 128, 128);
    game.load.image('level1IntroScene', 'assets/image/intro/level1Start.png');
    game.load.image('level2IntroScene', 'assets/image/intro/level2Start.png');
    game.load.image('level3IntroScene', 'assets/image/intro/level3Start.png');
    game.load.image('blackScreen', 'assets/image/intro/blackScreen.png');
    game.load.image('afterBossDialogScene', 'assets/image/intro/afterBossDialog.png');
    game.load.spritesheet('bossMedFaceDamaged', 'assets/image/intro/bossMedFaceDamaged.png', 128, 128);
    // this.game.make.image(100, 100, 'helicopter'); //???

    initLevelsJson();
    initSounds();
    hp = startHp;
    intro = new Intro();
}

var player;
var map;
var tileset;
var layer;
var EnemySpeed = 40;
var boss = null;
var createEnemy;
var greenSpot = null;
var score = 0;
var intro;

function create() 
{
    intro.start('StartScreen');
	//startGame();
}

function startGame()
{
    bullets = []
    friendBullets = [];
    enemies = [];
    deadEnemies = [];
    corpses = [];
    playerDead = false;

    createMap();
    createDoor();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player =  createPlayer();
    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    fightButton = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    copterButton = game.input.keyboard.addKey(Phaser.Keyboard.X);

   
    createSounds();

    money();   

    bullets = [];
    friendBullets = [];

    createEnemy = new EnemyFactory(game, bullets);


    hud = new HUD(hp, score);

    initEnemy();
    initDoshiki();
}

function update() 
{
    if (intro.isActive)
        intro.update();
    else
        updateGame();
}

function updateGame()
{
    game.physics.arcade.collide(moneys, layer);
    game.physics.arcade.overlap(player, moneys, collectMoney, null, this);
    game.physics.arcade.overlap(player, doshiki, collectDoshik, null, this);
    game.physics.arcade.overlap(player, doors, goNewLvl, null, this);
    score = getScore();
           
    var hitPlatform = game.physics.arcade.collide(player, layer);
    
    copterAttack = updateCopter(layer, player, enemies);
    if (goNavNewlvl) 
    { 
        startNewLvl();
    } 
    else 
    {
        if (copterAttack) 
        {
            keyPlayer(hitPlatform);
        }

        updateEnemyBullets(bullets, friendBullets);
        updateEnemies(player);
        updateFriendBullets(friendBullets, enemies);
        updatePlayer(enemies);
        updatePreviousPos(player);
        updateCorpses();

        hud.update();
        if (boss != null)
            boss.update();
        if (greenSpot != null)
            greenSpot.update();
        if (gamepad != null)
            gamepad.update();
    }
}

function restart()
{
    doors.kill();    
    bg.kill();
    layer.kill();
    doshiki.kill();
    moneys.kill();
    hud.clear();

    for (var i = 0; i < enemies.length; ++i)
    {
        if (enemies[i].isHeavy)
            killHeavyEnemy(enemies[i]);
    }


    killArray(enemies);
    killArray(bullets);
    killArray(friendBullets);

    player.kill();

    startGame();
    
}

function killArray(arr)
{
    for (var i = 0; i < arr.length; ++i)
        arr[i].sprite.kill();
}

function render () 
{	
	var mousePoint = game.input.mousePointer;
    game.debug.text(mousePoint.worldX + ' ' + mousePoint.worldY, 500, 50);
    game.debug.text(game.world.countLiving(), 500, 70);
}

function getRandomInt(min, max) 
{
	var res = Math.floor(Math.random() * (max - min)) + min;
	return res;
}