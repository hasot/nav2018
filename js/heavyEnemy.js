HeavyEnemy = function(x, y, minX, maxX, useHelmet, useShield, game)
{
	this.minX = minX;
	this.maxX = maxX;
	this.sprite = game.add.sprite(x, y, 'heavyEnemy');
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.direction = -1;
	this.isAlive = true;
	this.isHeavy = true;

	this.useHelmet = useHelmet;
	if (useHelmet)
	{
		this.helmet = game.add.sprite(x, y, 'heavyEnemyHelmet');
	}
	this.useShield = useShield;
	if (useShield)
	{
		this.shield = game.add.sprite(x, y - 16, 'heavyEnemyShield');
	}
}

HeavyEnemy.prototype.update = function()
{
    if (this.sprite.body.x < this.minX)
        this.direction = 1;
    else if (this.sprite.body.x > this.maxX)
        this.direction = -1;

    this.sprite.body.velocity.x = EnemySpeed * this.direction;

    if (this.useHelmet)
    {
    	this.helmet.x = this.sprite.x;
    	this.helmet.y = this.sprite.y;
    }
    if (this.useShield)
    {
    	this.shield.x = this.sprite.x  + (this.direction * 16);
    	this.shield.y = this.sprite.y;
    }
};

function killHeavyEnemy(enemy)
{
	if (enemy.useHelmet)
		enemy.helmet.kill();
	if (enemy.useShield)
		enemy.shield.kill();
}