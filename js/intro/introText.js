IntroText = function(sceneSpriteName, leftSprite, rightSprite, content)
{
	this.sceneSprite = game.add.sprite(0, 0, sceneSpriteName);
	this.sprite = game.add.sprite(0, 0, 'introText');

	if (leftSprite != null)
	{
		this.leftSprite = game.add.sprite(4, 28, leftSprite);
		this.leftSprite.fixedToCamera = true;
		this.leftSprite.animations.add('speak', [0, 1], 5, true);
	}

	if (rightSprite != null)
	{
		this.rightSprite = game.add.sprite(515, 28, rightSprite);
		this.rightSprite.fixedToCamera = true;
		this.rightSprite.animations.add('speak', [0, 1], 5, true);
	}

	this.content = content;
	this.currentContentIndex = 0;

	this.dialogColor = "#eeeeee";
	this.bossDialogColor = "#ee2222";
	this.simpleTextColor = "#ff00ff";

	this.text = game.add.text(155, 20, '', {font: "15px Arial", fill: this.dialogColor });
	this.text.fixedToCamera = true;

	this.continueText = game.add.text(300, 212, 'Нажмите X для продолжения...', {font: "13px Arial", fill: "#ffffff"});
	this.continueText.fixedToCamera = true;
	this.continueText.visible = false;

	this.wordDelay = 150;
	this.continueButton = game.input.keyboard.addKey(Phaser.Keyboard.X);

	this.isEnd = false;
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
		this.text.style.fill = this.currentContent.speaker == 'left'
							   ? this.dialogColor
							   : this.bossDialogColor;
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
};

IntroText.prototype.continueNextLine = function()
{
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

	this.nextLine();
}

IntroText.prototype.nextWord = function() 
{
	this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
	this.wordIndex++;

	if (this.wordIndex == this.line.length)
	{
		this.text.text = this.text.text.concat("\n");

		// game.time.events.add(this.wordDelay + 100, this.nextLine, this);
		this.continueNextLine();
	}
};

IntroText.prototype.update = function() 
{
	if (this.isWaitContinue && this.continueButton.isDown)
	{
		this.isWaitContinue = false;
		this.continueText.visible = false;
		this.currentContentIndex++;

		if (this.currentContentIndex == this.content.length - 1)
			this.isEnd = true;

		if (this.currentContentIndex != this.content.length)
			this.startIntro();
	}
};

IntroText.prototype.kill = function()
{
	this.sceneSprite.kill();
	this.sprite.kill();
	if (this.leftSprite != null) this.leftSprite.kill();
	if (this.rightSprite != null) this.rightSprite.kill();
	this.text.kill();
	this.continueText.kill();
}

IntroTextItem = function(speaker, text)
{
	this.speaker = speaker;
	this.text = text;
}

function GetTestIntro()
{
	return new IntroText('background', 'face', 'bossMedFace',
	        [
	            new IntroTextItem('left', ["Время первых", "Время смелых", "Есть особые люди, они не боятся мечтать"]),
	            new IntroTextItem('none', ["Они че то там", "Че то там", "Че то там"]),
	            new IntroTextItem('right', ["Ты че", "Решил ко мне лезть?", "Н Е Г О Д Я Й ? ? ?"]),
	        ]);
}