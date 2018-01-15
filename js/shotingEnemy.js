var EnemyBulletSpeed = 200;
var EnemyShotTimeout = 100;

ShotingEnemy = function(x, y, bullets)
{
    this.sprite = game.add.sprite(x, y, 'shotingEnemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.bullets = bullets;

    this.direction = -1;
    
    this.shotWaitingInterval = getRandomInt(0, EnemyShotTimeout);
    this.isAlive = true;

    this.sprite.animations.add('standR', [2, 3, 4, 5], 10, true);
    this.sprite.animations.add('standL', [6, 7, 8, 9], 10, true);
    this.sprite.animations.play('standL');
};

ShotingEnemy.prototype.update = function() 
{
    if (!this.isAlive) return;

    if (player.body.x < this.sprite.body.x)
    {
        this.sprite.animations.play('standL');
        this.direction = -1;
    }
    else
    {
        this.sprite.animations.play('standR');
        this.direction = 1;
    } 

    tryShotFor(this);  
};

function tryShotFor(enemy)
{
    if (enemy.shotWaitingInterval == 0)
    {
        var location = enemy.sprite;
        var bullet = new EnemyBullet(location.x, location.y + 16, enemy.direction, true, 'enemyBullet'); 
        enemy.bullets.push(bullet);

        enemy.shotWaitingInterval = EnemyShotTimeout;
    }
    else if (enemy.shotWaitingInterval > 0)
    {
        enemy.shotWaitingInterval -= 1;
    }
}

EnemyBullet = function(x, y, direction, canRevert, spriteKey)
{
    this.sprite = game.add.sprite(x, y, spriteKey);
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.direction = direction;
    this.canRevert = canRevert;

    this.sprite.body.gravity.y = 300;
    this.sprite.body.velocity.y = -200 - (getRandomInt(0, 50));
}

EnemyBullet.prototype.update = function(layer, player) 
{   
    this.sprite.body.velocity.x = EnemyBulletSpeed * this.direction;
    this.sprite.rotation += 0.01;
};

EnemyBullet.prototype.isCollidesWith = function(layer, player)
{
    var x = this.sprite.body.x;
    var isOutOfCamera = x  < game.camera.view.x 
                        || x > game.camera.view.x + game.camera.view.width;
    var collideWithlayer =  game.physics.arcade.collide(this.sprite, layer);
    var collideWithPlayer = !isPlayerDamaged() 
                            && game.physics.arcade.collide(this.sprite, player);
    if (collideWithPlayer)
        hitPlayer();

    var res = isOutOfCamera || collideWithlayer || collideWithPlayer;

    return res;
};