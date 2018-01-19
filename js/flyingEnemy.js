FlyingEnemy = function(x, y, minValue, maxValue, orientaion, bullets, game)
{
    this.minValue = minValue;   
    this.maxValue = maxValue;
    this.isHorizontal = orientaion == 'horizontal';
    this.bullets = bullets;

    this.sprite = game.add.sprite(x, y, 'flyingEnemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.direction = -1;
    this.movementDirection = -1;

    this.shotWaitingInterval = getRandomInt(0, EnemyShotTimeout);;
    this.isAlive = true;

    this.sprite.animations.add('standR', [2, 3], 20, true);
    this.sprite.animations.add('standL', [4, 5], 20, true);
    this.sprite.animations.play('standL');
};

FlyingEnemy.prototype.update = function() 
{
    if (!this.isAlive) return;

    var location = this.isHorizontal ? this.sprite.x : this.sprite.y;

    if (location < this.minValue)
        this.movementDirection = 1;
    else if (location > this.maxValue)
        this.movementDirection = -1;

    var velocity = EnemySpeed * this.movementDirection;
    if (this.isHorizontal)
        this.sprite.body.velocity.x = velocity;
    else
        this.sprite.body.velocity.y = velocity;

    if (player.x < this.sprite.x)
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