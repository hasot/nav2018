GreenSpot = function()
{
	this.sprite = game.add.sprite(game.camera.view.x, game.camera.view.y, 'greenSpot');
}

GreenSpot.prototype.update = function() 
{
	this.sprite.bringToTop();

	if (this.sprite.alpha > 0)
	{
		this.sprite.alpha -= 0.005;
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