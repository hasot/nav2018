var skipIntro = false;

Intro = function() 
{
	this.isActive = false
	this.continueButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
	this.keyPressed = false;
}

Intro.prototype.start = function(introSceneName) 
{
	game.camera.unfollow();
	game.camera.view.y = 0;
	game.camera.view.x = 0;

	this.isActive = true;
	this.introSceneName = introSceneName;

	this.startIntro();

	if (skipIntro) this.finish();
};

Intro.prototype.finish = function()
{
	this.isActive = false;
	this.currentIntro.kill();
	game.camera.follow(player);
	this.finishIntro();
}

Intro.prototype.update = function()
{
	if (this.continueButton.isDown && !this.keyPressed)
	{
		this.keyPressed = true;

		if (this.currentIntro.isReadyToContinue())
			this.finish();
	}
	else
	{
		this.currentIntro.update();
	}

	if (this.continueButton.isUp)
		this.keyPressed = false;
}

// SCREENNAME = function()
// {

// }

// SCREENNAME.prototype.kill = function()
// {

// }

// SCREENNAME.prototype.update = function()
// {

// }

// SCREENNAME.prototype.isReadyToContinue = function()
// {
// 	return true;
// }