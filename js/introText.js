IntroText = function(leftSprite, rightSprite, content)
{
	this.sprite = game.add.sprite(0, 0, 'introText');
	this.sprite.fixedToCamera = true;

	if (leftSprite != null)
	{
		this.leftSprite = game.add.sprite(50, 50, leftSprite);
		this.leftSprite.fixedToCamera = true;
		this.leftSprite.animations.add('speak', [0, 1], 5, true);
	}

	if (rightSprite != null)
	{
		this.rightSprite = game.add.sprite(550, 50, rightSprite);
		this.rightSprite.fixedToCamera = true;
		this.rightSprite.animations.add('speak', [0, 1], 5, true);
	}

	this.content = content;
	this.currentContentIndex = 0;

	this.dialogColor = "#eeeeee";
	this.simpleTextColor = "#ff00ff";

	this.text = game.add.text(155, 20, '', {font: "15px Arial", fill: this.dialogColor });
	this.text.fixedToCamera = true;

	this.continueText = game.add.text(266, 202, 'press X to continue...', {font: "13px Arial", fill: "#ffffff"});
	this.continueText.fixedToCamera = true;
	this.continueText.visible = false;

	this.wordDelay = 150;
	this.continueButton = game.input.keyboard.addKey(Phaser.Keyboard.X);

	this.startIntro();
}

IntroText.prototype.startIntro = function() 
{
	this.text.text = "";

	this.line = [];
	this.wordIndex = 0;
	this.lineIndex = 0;

	this.currentContent = this.content[this.currentContentIndex];
	this.currentText = this.currentContent.text;
	this.currentText.push("");
	this.isWaitContinue = false;

	if (this.currentContent.speaker != 'none')
	{
		var speaker = this.currentContent.speaker == 'left' ? this.leftSprite : this.rightSprite;
		speaker.animations.play('speak');
		this.text.style.fill = this.dialogColor;
	}
	else
	{
		this.text.style.fill = this.simpleTextColor;
	}

	this.nextLine();
};

IntroText.prototype.nextLine = function() 
{
	if (this.lineIndex == this.currentText.length) return;

	this.line = this.currentText[this.lineIndex].split(' ');
	this.wordIndex = 0;

	game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);

	this.lineIndex++;

	if (this.lineIndex == this.currentText.length)
	{
		this.isWaitContinue = true;
		this.continueText.visible = true;

		if (this.currentContent.speaker != 'none')
		{
			var speaker = this.currentContent.speaker == 'left' ? this.leftSprite : this.rightSprite;
			speaker.animations.stop();
			speaker.frame = 0;
		}
	}
};

IntroText.prototype.nextWord = function() 
{
	this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
	this.wordIndex++;

	if (this.wordIndex == this.line.length)
	{
		this.text.text = this.text.text.concat("\n");

		game.time.events.add(this.wordDelay, this.nextLine, this);
	}
};

IntroText.prototype.update = function() 
{
	if (this.isWaitContinue && this.continueButton.isDown)
	{
		this.isWaitContinue = false;
		this.continueText.visible = false;
		this.currentContentIndex++;

		if (this.currentContentIndex == this.content.length)
		{
			console.log("END!")
		}
		else
		{
			this.startIntro();
		}
	}
};

IntroTextItem = function(speaker, text)
{
	this.speaker = speaker;
	this.text = text;
}

function GetTestIntro()
{
	return new IntroText('face', null,
	        [
	            new IntroTextItem('left', ["Время первых", "Время смелых", "Есть особые люди, они не боятся мечтать"]),
	            new IntroTextItem('none', ["Они че то там", "Че то там", "Че то там"]),
	            new IntroTextItem('left', ["Ты че", "Решил ко мне лезть?", "Н Е Г О Д Я Й ? ? ?"]),
	        ]);
}