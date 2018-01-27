StartScreen = function()
{
	var textColor = "#eeeeee";

	this.background = game.add.sprite(0, 0, 'startScreen');
	this.text = game.add.text(110, 300, 'Нажмите X, чтобы начать игру', 
				{font: "30px Arial", fill: textColor });
	this.versionText = game.add.text(540, 460, 'версия: 1.0.0', 
				{font: "15px Arial", fill: textColor });

	this.blinkPeriod = 40;
	this.timer = this.blinkPeriod;
}

StartScreen.prototype.kill = function() 
{
	this.background.kill();
	this.text.kill();
	this.versionText.kill();
};

StartScreen.prototype.update = function()
{
	this.timer -= 1;
	if (this.timer <= 0)
	{
		this.text.visible = !this.text.visible;
		this.timer = this.blinkPeriod;
	}
}

StartScreen.prototype.isReadyToContinue = function()
{
	return true;
}