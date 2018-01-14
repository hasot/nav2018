var EnemyBulletSpeed = 100;
var EnemyShotTimeout = 100;

ShotingEnemy = function(x, y, bullets)
{
    this.sprite = game.add.sprite(x, y, 'shotingEnemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.bullets = bullets;

    this.direction = -1;

    this.shotWaitingInterval = 0;
    this.isAlive = true;
};

ShotingEnemy.prototype.update = function() 
{
    if (!this.isAlive) return;

    if (player.body.x < this.sprite.body.x)
        this.direction = -1;
    else this.direction = 1;
    
    if (this.shotWaitingInterval == 0)
    {
        var bullet = new EnemyBullet(this.sprite.body.x, this.sprite.body.y, this.direction); 
        this.bullets.push(bullet);

        this.shotWaitingInterval = EnemyShotTimeout;
    }
    else if (this.shotWaitingInterval > 0)
    {
        this.shotWaitingInterval -= 1;
    }
};

EnemyBullet = function(x, y, direction)
{
    this.sprite = game.add.sprite(x, y, 'enemyBullet');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.direction = direction;
}

EnemyBullet.prototype.update = function(platforms, player) 
{   
    this.sprite.body.velocity.x = EnemyBulletSpeed * this.direction;
};

EnemyBullet.prototype.isCollidesWith = function(platforms, player)
{
    var x = this.sprite.body.x;
    var isOutOfCamera = x  < game.camera.view.x 
                        || x > game.camera.view.x + game.camera.view.width;
    var collideWithPlatforms =  game.physics.arcade.collide(this.sprite, platforms);
    var collideWithPlayer = game.physics.arcade.collide(this.sprite, player);

    var res = isOutOfCamera || collideWithPlatforms || collideWithPlayer;

    return res;
};