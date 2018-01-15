BossMed = function(x, y)
{
	this.sprite = game.add.sprite(x, y, 'bossMed');

	this.groundPos = 401;
	this.landingDist = 35;

	this.downSpeed = 4;
	this.horSpeed = 1;
	this.upSpeed = 8;

	this.shotPositions = [
		new Phaser.Point(220, 113),
		new Phaser.Point(403, 113),
		new Phaser.Point(116, 258),
		new Phaser.Point(315, 258),
		new Phaser.Point(503, 258),
		new Phaser.Point(220, 401),
		new Phaser.Point(403, 401),
		];

	this.timer = 0;
	this.state = 'stand';
	this.subState = 'stand';
	this.targetPos = new Phaser.Point(0, 0);
	this.prevPosIndex = -1;
}

BossMed.prototype.update = function() 
{
	if (this.state == 'stand')
		this.standState();
	else if (this.state == 'walk')
		this.walkState();
};

BossMed.prototype.standState = function() 
{
	var waitingEnds = this.timer <= 0;
	if (waitingEnds)
		this.startChangePosition();	
	else
		this.timer -= 1;
};

BossMed.prototype.startChangePosition = function() 
{
	var index = getRandomInt(0, this.shotPositions.length);
	if (index == this.prevPosIndex)
		index = (index + 1) % this.shotPositions.length;

	this.targetPos = this.shotPositions[index];
	this.prevPosIndex = index;

	this.state = 'walk';
	this.subState = 'down';
};

BossMed.prototype.walkState = function()
{
	if (this.subState == 'walk')
		this.walkSubState();
	else if (this.subState == 'down')
		this.downSubState();
	else if (this.subState == 'up')
		this.upSubState();
	else if (this.subState == 'landing')
		this.landingSubState();
};

BossMed.prototype.walkSubState = function()
{
	var onXTargetPos = this.sprite.x == this.targetPos.x;
	if (onXTargetPos)
	{
		if (this.onTargetYPos())
			this.startStand();
		else
			this.subState = 'up';
	}
	else
	{
		var direction = Math.sign(this.targetPos.x - this.sprite.x);
		this.sprite.x += direction * this.horSpeed;
	}
}

BossMed.prototype.downSubState = function()
{
	var onGround = Math.abs(this.sprite.y - this.groundPos) <= this.downSpeed;
	if (onGround)
	{
		this.sprite.y = this.groundPos;
		this.subState = 'walk';
	}
	else
	{
		this.sprite.y += this.downSpeed;
	}
}

BossMed.prototype.upSubState = function()
{
	var needLanding = this.targetPos.y - this.sprite.y > this.landingDist;
	if (needLanding)
		this.subState = 'landing';
	else
		this.sprite.y -= this.upSpeed;
}

BossMed.prototype.landingSubState = function()
{
	if (this.onTargetYPos())
		this.startStand();
	else
		this.sprite.y += this.downSpeed;
}

BossMed.prototype.onTargetYPos = function()
{
	var targetDist = Math.abs(this.sprite.y - this.targetPos.y);
	var onTargetPos = targetDist <= this.downSpeed;
	return onTargetPos;
}

BossMed.prototype.startStand = function()
{
	this.sprite.x = this.targetPos.x;
	this.sprite.y = this.targetPos.y;
	this.state = 'stand';
	this.timer = 50;
}