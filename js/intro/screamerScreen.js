ScreamerScreen = function()
{
	this.background = game.add.sprite(0, 0, 'blackScreen');

	this.screamer = game.add.sprite(0, 0, 'screamer');
	this.blinkInterval = 5;
	this.timer = this.blinkInterval;
	this.repeatCount = 0;
}

ScreamerScreen.prototype.kill = function()
{
	this.background.kill();
}

ScreamerScreen.prototype.update = function()
{
	this.timer -= 1;
	if (this.timer <= 0)
	{
		this.timer = this.blinkInterval;

		this.repeatCount++;
		this.screamer.visible = !this.screamer.visible;

		if (this.repeatCount > 6)
			intro.finish();
	}
}

ScreamerScreen.prototype.isReadyToContinue = function()
{
	return false;
}