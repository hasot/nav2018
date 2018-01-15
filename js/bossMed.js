BossMed = function(x, y)
{
	this.sprite = game.add.sprite(x, y, 'bossMed');
	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

	this.groundPos = 402;
	this.landingDist = 35;

	this.downSpeed = 4;
	this.horSpeed = 1;
	this.upSpeed = 8;

	this.shotPositions = [
		new Phaser.Point(220, 114),
		new Phaser.Point(403, 114),
		new Phaser.Point(132, 258),
		new Phaser.Point(315, 258),
		new Phaser.Point(480, 258),
		new Phaser.Point(220, 401),
		new Phaser.Point(403, 401),
		];

	this.timer = 0;
	this.state = 'stand';
	this.subState = 'stand';
	this.targetPos = new Phaser.Point(0, 0);
	this.prevPosIndex = -1;
	this.shotCount = 0;
	this.maxShotCount = 10;
	this.hp = 12;
	this.enemyCreationTimer = 0;

	this.sprite.animations.add('runL', [10, 11], 3, true);
	this.sprite.animations.add('runR', [4, 5], 3, true);
	this.sprite.animations.add('shotL', [8, 9], 5, true);
	this.sprite.animations.add('shotR', [6, 7], 5, true);
	this.sprite.animations.add('standL', [13, 14, 15, 14], 3, true);
	this.sprite.animations.add('standR', [0, 1, 2, 1], 3, true);

	this.sprite.frame = 12;
}

BossMed.prototype.update = function() 
{
	this.updateState();

	this.checkHit();
	this.checkPlayerDamage();
	this.checkEnemyCreation();
};

BossMed.prototype.checkEnemyCreation = function()
{
	var needCreateEnemy = this.hp <= 4
						  && enemies.length < 5 
						  && this.enemyCreationTimer <= 0;

    if (needCreateEnemy)
    	this.tryCreateEnemy();
    else if (this.enemyCreationTimer > 0)
    	this.enemyCreationTimer -= 1;
}

BossMed.prototype.tryCreateEnemy = function()
{
	var createShoting = getRandomInt(0, 2) == 0;

	var enemy = createShoting
				? this.tryCreateShoting()
				: this.tryCreateHeavy();
	if (enemy == null) return;

	enemies.push(enemy);
	this.enemyCreationTimer = 500;
}

BossMed.prototype.tryCreateHeavy = function()
{
	var x = getRandomInt(30, 550);
	var y = 417;

	return createEnemy
					.heavyOn(x, y)
					.thatMovesOn(30, 550)
					.withFullArmor();
}

BossMed.prototype.tryCreateShoting = function()
{
	var index = getRandomInt(0, this.shotPositions.length - 2);
	var pos = this.shotPositions[index];
	for (var i = 0; i < enemies.length; ++i)
	{
		var enemyExists = Math.abs(enemies[i].sprite.x - pos.x) < 50
						  && Math.abs(enemies[i].sprite.y - pos.y) < 50;

		if (enemyExists) return null;		
	}

	return createEnemy.shotingOn(pos.x, pos.y + 15);
}

BossMed.prototype.updateState = function()
{
	if (this.state == 'walk')
		this.walkState();
	if (this.state == 'shot')
		this.shotState();
	if (this.state == 'stand')
		this.standState();
}

BossMed.prototype.checkHit = function() 
{
	var i = 0;
	while (i < friendBullets.length)
	{
		var bullet = friendBullets[i];
		var hit = game.physics.arcade.collide(this.sprite, bullet.sprite);

		if (hit)
		{
			this.hp -= 1;
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
			this.startStand();

			bullet.sprite.kill();
			friendBullets.splice(i, 1);
		}
		else i += 1;
	}
}

BossMed.prototype.checkPlayerDamage = function()
{
	if (isPlayerDamaged()) return;

	var playerHit = game.physics.arcade.collide(player, this.sprite);
	if (playerHit)
	{
		this.sprite.body.velocity.x = 0;
		this.sprite.body.velocity.y = 0;
		hitPlayer();
	}
}

BossMed.prototype.standState = function() 
{
	var waitingEnds = this.timer <= 0;
	if (waitingEnds)
	{
		this.startChangePosition();	
	}
	else
		this.timer -= 1;

	if (this.sprite.animations.name != 'standL' && this.sprite.animations.name != 'standR')
	{
		var name = this.sprite.x > player.x ? 'standL' : 'standR';
		this.sprite.animations.play(name);
	}
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

	this.sprite.animations.stop();
	this.sprite.frame = this.sprite.x > this.targetPos.y ? 12 : 3;
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
	var onXTargetPos = Math.abs(this.sprite.x - this.targetPos.x) < 5;
	if (onXTargetPos)
	{
		if (this.onTargetYPos())
			this.startShot();
		else
		{
			this.subState = 'up';
			this.sprite.animations.stop();
			this.sprite.frame = this.sprite.x > this.targetPos.y ? 12 : 3;
		}
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

		var left = this.targetPos.x <= this.sprite.x;
		this.sprite.animations.play(left ? 'runL' : 'runR');
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
		this.startShot();
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
	this.timer = 150;
}

BossMed.prototype.startShot = function()
{
	this.sprite.x = this.targetPos.x;
	this.sprite.y = this.targetPos.y;
	this.state = 'shot';
	this.shotCount = 0;
	this.timer = 0;
}

BossMed.prototype.shotState = function()
{
	if (this.timer <= 0)
	{
		this.tryShot();
	}	
	else
	{
		this.timer -= 1;
	}

	var left = this.sprite.x > player.x;
	if (left && this.sprite.animations.key != 'shotL')
	{
		this.sprite.animations.play('shotL');
	}

	if (!left && this.sprite.animations.key != 'shotR')
		this.sprite.animations.play('shotR');
}

BossMed.prototype.tryShot = function()
{
	if (this.shotCount < this.maxShotCount)
	{
		var shotDirection = Math.sign(player.x - this.sprite.x);
		var canRevert = this.shotDuck();
		var spriteKey = canRevert ? 'enemyBullet' : 'bossMedBullet';
		var bullet = new EnemyBullet(this.sprite.x, this.sprite.y + 40, shotDirection, canRevert, spriteKey);
		bullets.push(bullet);

		this.shotCount += 1;
		this.timer = 50;
	}
	else
	{
		this.startStand();
	}
}

BossMed.prototype.shotDuck = function()
{
	return this.hp >= 8
		   ? true
		   : getRandomInt(0, 4) == 0;
}