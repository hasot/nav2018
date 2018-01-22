var CorpseSpeed = 30;

Corpse = function(x, y, direction, spriteName, frame)
{
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.arcade.enable(this.sprite);
	this.sprite.frame = frame;

	this.direction = -1;
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