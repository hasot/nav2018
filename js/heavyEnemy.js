HeavyEnemy = function(x, y, minX, maxX, useHelmet, useShield, game)
{
	this.minX = minX;
	this.maxX = maxX;
	this.sprite = game.add.sprite(x, y, 'heavyEnemy');
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.direction = -1;
	this.isAlive = true;
	this.isHeavy = true;

	this.sprite.animations.add('runR', [2, 3], 3, true);
    this.sprite.animations.add('runL', [4, 5], 3, true);
    this.sprite.animations.play('runL');

	this.useHelmet = useHelmet;
	if (useHelmet)
	{
		this.helmet = game.add.sprite(x, y, 'heavyEnemyHelmet');
		this.helmet.frame = 1;
	}
	this.useShield = useShield;
	if (useShield)
	{
		this.shield = game.add.sprite(x, y, 'heavyEnemyShield');
		this.shield.frame = 1;
	}
}

HeavyEnemy.prototype.update = function()
{
    if (this.sprite.body.x < this.minX)
    {
    	this.sprite.animations.play('runR');
        this.direction = 1;
    }
    else if (this.sprite.body.x > this.maxX)
    {
    	this.sprite.animations.play('runL');
        this.direction = -1;
    }

    this.sprite.body.velocity.x = EnemySpeed * this.direction;

    if (this.useHelmet)
    {
    	this.helmet.x = this.sprite.x;
    	this.helmet.y = this.sprite.y;
    	this.helmet.frame = this.direction == 1 ? 0 : 1;
    }
    if (this.useShield)
    {
    	this.shield.x = this.sprite.x  + (this.direction * 8);
    	this.shield.y = this.sprite.y;
    	this.shield.frame = this.direction == 1 ? 0 : 1;
    }
};

function killHeavyEnemy(enemy)
{
	if (enemy.useHelmet)
		enemy.helmet.kill();
	if (enemy.useShield)
		enemy.shield.kill();
}