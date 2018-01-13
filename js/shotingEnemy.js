var EnemyBulletSpeed = 100;
var EnemyShotTimeout = 100;

ShotingEnemy = function(x, y, bullets)
{
    this.sprite = game.add.sprite(x, y, 'shotingEnemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.bullets = bullets;

    this.direction = -1;

    this.shotWaitingInterval = 0;
};

ShotingEnemy.prototype.update = function() 
{
    if (this.shotWaitingInterval == 0)
    {
        console.log('enemy shot');
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

EnemyBullet.prototype.update = function() 
{
    this.sprite.body.velocity.x = EnemyBulletSpeed * this.direction;
};