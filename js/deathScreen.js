var deathScreen;

var deathQuotes = 
[
	"Ради прекрасной России будущего",
	"Где-то радостно смеется коррупционер",
];

function ShowDeathScreen()
{
	if (deathScreen != null) ClearDeathScreen();

	this.backgroundSprite = game.add.sprite(game.camera.x, game.camera.y, 'deathScreen');
	this.backgroundSprite.alpha = 0;

	this.mainText = game.add.text(game.camera.x + 200, game.camera.y + 140, "Он погиб...", { 
					    font: 'Arial',
					    fontSize: 40,
						fontWeight: 'bold',
						fill: "#aa0000",
					});

	var quoteText = deathQuotes[getRandomInt(0, deathQuotes.length)];
	var quoteX = 217 - (quoteText.length - 11) / 2 * 10;
	this.quote = game.add.text(game.camera.x + quoteX, game.camera.y + 200, quoteText, { 
				    font: 'Arial',
		    	    fontSize: 25,
		    		fontWeight: 'bold',
				});

	this.continueText = game.add.text(game.camera.x + 155, game.camera.y + 350, "Нажми X, чтобы начать заново", {
							font: 'Arial',
						    fontSize: 20,
							fontWeight: 'bold',
						});

	deathScreen = this;
	gamepad = new GamepadListener();
}

function ClearDeathScreen()
{
	deathScreen.backgroundSprite.kill();
	deathScreen.mainText.kill();
	deathScreen.quote.kill();
	deathScreen.continueText.kill();
	gamepad = null;
}

var gamepad;
GamepadListener = function()
{
	this.continueButton = game.input.keyboard.addKey(Phaser.Keyboard.X);
}

GamepadListener.prototype.update = function()
{
	if (deathScreen.backgroundSprite.alpha < 0.8)
		deathScreen.backgroundSprite.alpha += 0.01;

	if (this.continueButton.isDown)
	{
		ClearDeathScreen();
		hp = startHp;
        score = 0;
        restart();
	}
};