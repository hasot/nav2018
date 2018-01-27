var skipIntro = false;

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

	if (skipIntro) this.finish();
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

		case 'FewTimesAgo':
			this.currentIntro = new EpicTextScreen(["За несколько часов до этого..."]);
			break;

		case 'BeforeBossDialogDemo':
			var introText = new IntroText(
									'beforeBossDialogIntroScene', 
									'face', 
									'bossMedFace',
	        [
	        	new IntroTextItem('none', [". . ."]),
	            new IntroTextItem('left', ["Наконец-то мы встретились.", "Лицом к лицу.", "Ты ответишь за всё,", "за каждый украденный рубль."]),
	            new IntroTextItem('right', ["И перед кем же мне отвечать?", "Перед тобой?", "Это ты у нас, значит, г е р о й ?"]),
	            new IntroTextItem('right', ["Просто вспомни", "ЧТО ты натворил..."]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
			break;

		case 'Level1Start':
			var introText = new IntroText(
									'level1IntroScene', 
									'face', 
									null,
	        [
	        	new IntroTextItem('none', ["Место действия: Плёс", "Дача известного политика"]),
	            new IntroTextItem('left', ["Наконец-то!", "Я отыскал это злостное место!"]),
	            new IntroTextItem('left', ["Я должен найти хозяина этой дачи", "и показать всей стране его истиное лицо!"]),
	            new IntroTextItem('none', ["Доберитесь до премьер-министра"]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
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
			this.start('BeforeBossDialogDemo');
			break;

		case 'BeforeBossDialogDemo':
			this.start('FewTimesAgo');
			break;

		case 'FewTimesAgo':
			this.start('Level1Start');
			break;

		case 'Level1Start':
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