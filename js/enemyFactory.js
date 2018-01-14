EnemyFactory = function(game, bullets) 
{
	this.game = game;
	this.bullets = bullets;
}

EnemyFactory.prototype.simpleOn = function(x, y) {
	return new EnemyItem1(x, y, this);
};

EnemyItem1 = function(x, y, factory) 
{
	this.x = x;
	this.y = y;
	this.factory = factory;
}

EnemyItem1.prototype.thatMovesOn = function(minX, maxX) 
{
	return new Enemy(this.x, this.y, minX, maxX, this.factory.game);
};

EnemyFactory.prototype.shotingOn = function(x, y) 
{
	return new ShotingEnemy(x, y, this.bullets);
};

EnemyFactory.prototype.flyingOn = function(x, y) {
	return new FlyingItem1(x, y, this);
};

FlyingItem1 = function(x, y, factory)
{
	this.x = x;
	this.y = y;
	this.factory = factory;
}

FlyingItem1.prototype.thatMovesHorizontalOn = function(minValue, maxValue) 
{
	return new FlyingEnemy(
					this.x, this.y, 
					minValue, maxValue, 
					'horizontal', 
					this.factory.bullets, this.factory.game);
};

FlyingItem1.prototype.thatMovesVerticalOn = function(minValue, maxValue) 
{
	return new FlyingEnemy(
					this.x, this.y, 
					minValue, maxValue, 
					'vertical', 
					this.factory.bullets, this.factory.game);
};

EnemyFactory.prototype.heavyOn = function(x, y)
{
	return new HeavyItem1(x, y, this);
}

HeavyItem1 = function(x, y, factory)
{
	this.x = x;
	this.y = y;
	this.factory = factory;
}

HeavyItem1.prototype.thatMovesOn = function(minX, maxX)
{
	return new HeavyItem2(minX, maxX, this);
}

HeavyItem2 = function(minX, maxX, item)
{
	this.minX = minX;
	this.maxX = maxX;
	this.item = item;
}

HeavyItem2.prototype.withHelmet = function()
{
	return new HeavyEnemy(
				this.item.x, this.item.y,
				this.minX, this.maxX,
				true,
				false,
				this.item.factory.game);
}

HeavyItem2.prototype.withShield = function()
{
	return new HeavyEnemy(
				this.item.x, this.item.y,
				this.minX, this.maxX,
				false,
				true,
				this.item.factory.game);
}

HeavyItem2.prototype.withFullArmor = function()
{
	return new HeavyEnemy(
				this.item.x, this.item.y,
				this.minX, this.maxX,
				true,
				true,
				this.item.factory.game);
}