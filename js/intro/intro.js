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

		case 'Level2Start':
			var introText = new IntroText(
									'level2IntroScene', 
									'face', 
									null,
	        [
	            new IntroTextItem('left', ["Я не могу поверить.", "Сколько налогов было украдено,", "чтобы построить такой дворец?"]),
	            new IntroTextItem('none', ["Продолжайте вашу борьбу"]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
			break;

		case 'Level3Start':
			var introText = new IntroText(
									'level3IntroScene', 
									'face', 
									null,
	        [
	            new IntroTextItem('left', ["Сколько больниц можно было построить?", "Сколько школ можно было отремонтировать?",
	            	"Наше будущее было украдено!"]),
	            new IntroTextItem('none', ["Он уже рядом..."]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
			break;

		case 'BeforeBattle':
			this.currentIntro = new EpicTextScreen(["Он вам не Димон"]);
			break;

		case 'BeforeBossDialog':
			var introText = new IntroText(
									'beforeBossDialogIntroScene', 
									'face', 
									'bossMedFace',
	        [
	            new IntroTextItem('left', ["Наконец-то мы встретились.", "Лицом к лицу.", "Ты ответишь за всё,", "за каждый украденный рубль."]),
	            new IntroTextItem('right', ["И перед кем же мне отвечать?", "Перед тобой?", "Это ты у нас, значит, г е р о й ?"]),
	            new IntroTextItem('right', ["Просто вспомни", "ЧТО ты натворил..."]),
	            new IntroTextItem('right', ["Ты отпинал кучу людей.", "Ты прыгал на невинных полицейских.", "Ты собирал доллары!", "Я видел.", "Признавайся, кто тебя послал?"]),
	            new IntroTextItem('left', ["Тот, кого ты боишься больше всего.", "Народ."]),
	            new IntroTextItem('none', ["Победите премьер-министра"]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
			break;

		case 'AfterBoss':
			var introText = new IntroText(
									'afterBossDialogScene', 
									'face', 
									'bossMedFaceDamaged',
	        [
	            new IntroTextItem('right', ["Нет...", "Ты не мог меня победить..."]),
	            new IntroTextItem('left', ["Ну что, может хоть в последний раз", "ты все-таки назовешь мое имя?"]),
	            new IntroTextItem('right', [". . . . . . . . . . . . . . .", "Б л э д . . . ", "Н Э В Э Л Ь Н Ы Й"]),
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

		case 'Level2Start':
			changeLevel();	
			break;

		case 'Level3Start':
			changeLevel();	
			break;

		case 'BeforeBattle':
			this.start('BeforeBossDialog');
			break;

		case 'BeforeBossDialog':
			changeLevel();	
			break;

		case 'AfterBoss':
			//...
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