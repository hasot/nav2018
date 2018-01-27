TitlesScreen = function()
{
	this.subText = game.add.text(210, 170, "СПАСИБО ЗА ИГРУ", 
		{font: "25px Arial", fill: "#eeeeee" })
	this.mainText = game.add.text(500, 450, "(c) Room 63. 2018", 
		{font: "15px Arial", fill: "#eeeeee" });
}

TitlesScreen.prototype.kill = function()
{
	//...
}

TitlesScreen.prototype.update = function()
{
	//...
}

TitlesScreen.prototype.isReadyToContinue = function()
{
	return false;
}