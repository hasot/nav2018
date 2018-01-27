Intro = function() 
{
	this.isActive = false
	this.continueButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
	this.keyPressed = false;
}

Intro.prototype.start = function(introSceneName) 
{
	this.isActive = true;
	this.introSceneName = introSceneName;

	this.startIntro();
};

Intro.prototype.finish = function()
{
	this.isActive = false;
	this.currentIntro.kill();
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

Intro.prototype.startIntro = function()
{
	switch (this.introSceneName)
	{
		case 'StartScreen':
			this.currentIntro = new StartScreen();
			break;

		case 'WarningScreen':
			this.currentIntro = new EpicTextScreen(
			[
				"Все события и персонажи вымышлены",
				"Любые совпадения случайны",
			]);
			break;

		case 'FirstDialog':
			this.currentIntro = new DialogScreen(GetTestIntro());
			break;

		default:
			console.log("ERROR ERROR ERROR WRONG INTRO NAME");
	}
}

Intro.prototype.finishIntro = function()
{
	switch (this.introSceneName)
	{
		case 'StartScreen':
			this.start('WarningScreen');
			break;

		case 'WarningScreen':
			this.start('FirstDialog');
			break;

		case 'FirstDialog':
			startGame();
			break;

		default:
			console.log("ERROR ERROR ERROR WRONG INTRO NAME");
	}
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