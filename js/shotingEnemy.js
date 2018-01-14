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
};

ShotingEnemy.prototype.update = function() 
{
    if (!this.isAlive) return;

    if (player.body.x < this.sprite.body.x)
        this.direction = -1;
    else this.direction = 1;

    tryShotFor(this);  
};

function tryShotFor(enemy)
{
    if (enemy.shotWaitingInterval == 0)
    {
        var location = enemy.sprite;
        var bullet = new EnemyBullet(location.x, location.y, enemy.direction); 
        enemy.bullets.push(bullet);

        enemy.shotWaitingInterval = EnemyShotTimeout;
    }
    else if (enemy.shotWaitingInterval > 0)
    {
        enemy.shotWaitingInterval -= 1;
    }
}

EnemyBullet = function(x, y, direction)
{
    this.sprite = game.add.sprite(x, y, 'enemyBullet');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.direction = direction;
}

EnemyBullet.prototype.update = function(layer, player) 
{   
    this.sprite.body.velocity.x = EnemyBulletSpeed * this.direction;
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