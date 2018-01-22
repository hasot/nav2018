var deathScreen;

var deathQuotes = 
[
	"Ради прекрасной России будущего",
	"Где-то радостно смеется коррупционер",
];

DeathScreen = function()
{
	if (deathScreen != null) ClearDeathScreen();

	this.mainText = game.add.text(game.camera.x + 200, game.camera.y + 140, "Он погиб...", { 
					    font: 'Arial',
					    fontSize: 40,
						fontWeight: 'bold',
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
}

function ClearDeathScreen()
{
	deathScreen.mainText.kill();
	deathScreen.quote.kill();
	deathScreen.continueText.kill();
}

GamepadListener = function()
{

}

GamepadListener.prototype.update = function()
{
	
};