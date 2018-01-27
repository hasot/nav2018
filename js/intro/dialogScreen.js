DialogScreen = function(introText)
{
	this.introText = introText;
	this.introText.startIntro();
}

DialogScreen.prototype.kill = function()
{
	this.introText.kill();
}

DialogScreen.prototype.update = function()
{
	this.introText.update();
}

DialogScreen.prototype.isReadyToContinue = function()
{
	return this.introText.isEnd;
}