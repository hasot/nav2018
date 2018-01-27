GreenSpot = function()
{
	this.sprite = game.add.sprite(game.camera.view.x, game.camera.view.y, 'greenSpot');
}

GreenSpot.prototype.update = function() 
{
	this.sprite.bringToTop();
	this.sprite.x = game.camera.view.x;
	this.sprite.y = game.camera.view.y;

	if (this.sprite.alpha > 0)
	{
		this.sprite.alpha = Math.max(0, this.sprite.alpha - 0.005);
	}
	else
	{
		this.sprite.kill();
		greenSpot = null;
	}
};

GreenSpot.prototype.reset = function()
{
	this.sprite.alpha = 1;
}