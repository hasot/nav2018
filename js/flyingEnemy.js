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
};

FlyingEnemy.prototype.update = function() 
{
    if (!this.isAlive) return;

    var location = this.isHorizontal ? this.sprite.body.x : this.sprite.body.y;

    if (location < this.minValue)
        this.movementDirection = 1;
    else if (location > this.maxValue)
        this.movementDirection = -1;

    var velocity = EnemySpeed * this.movementDirection;
    if (this.isHorizontal)
        this.sprite.body.velocity.x = velocity;
    else
        this.sprite.body.velocity.y = velocity;

    tryShotFor(this);
};