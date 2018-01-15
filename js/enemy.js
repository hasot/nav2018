

Enemy = function(x, y, minX, maxX, game)
{
    this.minX = minX;   
    this.maxX = maxX;

    this.sprite = game.add.sprite(x, y, 'enemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.direction = -1;
    this.isAlive = true;

    this.sprite.animations.add('enemyRunR', [2, 3], 3, true);
    this.sprite.animations.add('enemyRunL', [4, 5], 3, true);
    this.sprite.animations.play('enemyRunL');
};

Enemy.prototype.update = function() 
{
    if (this.sprite.body.x < this.minX)
    {
        this.sprite.animations.play('enemyRunR');
        this.direction = 1;
    }
    else if (this.sprite.body.x > this.maxX)
    {
        this.sprite.animations.play('enemyRunL');
        this.direction = -1;
    }
    this.sprite.body.velocity.x = EnemySpeed * this.direction;
};