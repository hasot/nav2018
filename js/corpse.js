var CorpseSpeed = 30;

Corpse = function(x, y, spriteName, frame)
{
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.arcade.enable(this.sprite);
	this.sprite.frame = frame;

	this.sprite.body.velocity.y = -150;
	this.sprite.body.gravity.y = 600;
}

function updateCorpses()
{
	var i = 0;
	while (i < corpses.length)
	{
		var corpse = corpses[i];
		var bottomPos = game.camera.view.y + game.camera.view.height
		var needKill = corpse.sprite.y > bottomPos;
		if (needKill)
		{
            corpse.sprite.kill();
            corpses.splice(i, 1);
		}
		else i += 1;
	}
}

BulletCorpse = function(bulletSprite, direction)
{
	this.sprite = game.add.sprite(bulletSprite.x, bulletSprite.y, 'enemyBullet');
	
	game.physics.arcade.enable(this.sprite);
	this.sprite.frame = bulletSprite.frame;
	this.sprite.angle = bulletSprite.angle;
	this.sprite.alpha = 0.75;

	this.sprite.body.gravity.y = 600;	
	this.sprite.body.velocity.y = -100;
	this.sprite.body.velocity.x = direction * -1 * 100;
}