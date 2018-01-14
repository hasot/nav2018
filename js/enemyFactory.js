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
