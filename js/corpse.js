var CorpseSpeed = 30;

Corpse = function(x, y, direction, spriteName, frame)
{
	this.sprite = game.add.sprite(x, y, spriteName);
	game.physics.arcade.enable(this.sprite);
	this.sprite.frame = frame;

	this.direction = -1;
	this.sprite.body.velocity.y = -150;
	this.sprite.body.gravity.y = 300;
}