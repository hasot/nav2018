var EnemySpeed = 70;

Enemy = function(x, y, minX, maxX, game)
{
    this.minX = minX;   
    this.maxX = maxX;
    this.game = game;

    this.sprite = game.add.sprite(x, y, 'enemy');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

    this.direction = -1;
    this.isAlive = true;
};

Enemy.prototype.update = function() 
{
    if (this.sprite.body.x < this.minX)
        this.direction = 1;
    else if (this.sprite.body.x > this.maxX)
        this.direction = -1;

    this.sprite.body.velocity.x = EnemySpeed * this.direction;
};