EpicTextScreen = function(textArr)
{
	this.background = game.add.sprite(0, 0, 'blackScreen');

	this.texts = [];
	this.createText(textArr);

	this.continueText = game.add.text(400, 400, "Нажмите X для продолжения",
		{font: "15px Arial", fill: "#eeeeee" });
	this.continueText.visible = false;
}

EpicTextScreen.prototype.createText = function(textArr)
{
	for (var i = 0; i < textArr.length; ++i)
	{
		var x = 310 - (textArr[i].length * 10) / 2;
		var y = 100 + i * 50;
		var txt = game.add.text(x, y, textArr[i], 
					{font: "20px Arial", fill: "#aaaaaa" });
		txt.alpha = 0;

		this.texts.push(txt);
	}
}

EpicTextScreen.prototype.kill = function()
{
	this.background.kill();
	for (var i = 0 ; i < this.texts.length; ++i)
		this.texts[i].kill();
	this.continueText.kill();
}

EpicTextScreen.prototype.update = function()
{
	for (var i = 0 ; i < this.texts.length; ++i)
		this.texts[i].alpha = Math.min(1, this.texts[i].alpha + 0.005);

	this.continueText.visible = this.isReadyToContinue();
}

EpicTextScreen.prototype.isReadyToContinue = function()
{
	return this.texts.length == 0
		   || this.texts[0].alpha >= 0.5;
}