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

		case 'BeforeBossDemo':
			this.currentIntro = new EpicTextScreen(["Однажды они все-таки встретились"]);
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
	            new IntroTextItem('left', [". . . . . ", "Я нашел тебя", "Ты ответишь за всё,", "за каждый украденный рубль."]),
	            new IntroTextItem('right', ["И перед кем же мне отвечать?", "Перед тобой?", "Это ты у нас, значит, г е р о й ?", "Просто вспомни", "ЧТО ты натворил..."]),
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
	            new IntroTextItem('left', ["Наконец-то!", "Я должен найти хозяина этой дачи", "и показать всей стране его истиное лицо!"]),
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
			this.currentIntro = new EpicTextScreen(["Однажды они все-таки встретились"]);
			break;

		case 'BeforeBossDialog':
			var introText = new IntroText(
									'beforeBossDialogIntroScene', 
									'face', 
									'bossMedFace',
	        [
	            new IntroTextItem('left', ["Я нашел тебя.", "Ты ответишь за всё,", "за каждый украденный рубль."]),
	            new IntroTextItem('right', ["И перед кем же мне отвечать?", "Перед тобой?", "Это ты у нас, значит, г е р о й ?", "Просто вспомни", "ЧТО ты натворил..."]),
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
	            new IntroTextItem('right', [". . . . . ", "Нет...", "Ты не мог меня победить..."]),
	            new IntroTextItem('left', ["Ну что, может хоть в последний раз", "ты все-таки назовешь мое имя?"]),
	            new IntroTextItem('right', [". . . . . . . . . . . . . . .", "Б л э д . . . ", "Н Э В Э Л Ь Н Ы Й . . ."]),
	        ]);
			this.currentIntro = new DialogScreen(introText);
			break;

		case 'EndScreen':
			this.currentIntro = new EpicTextScreen([
				"Конец первого эпизода",
				]);
			break;

		case 'Screamer':
			this.currentIntro = new ScreamerScreen();
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
			this.start('BeforeBossDemo');
			break;

		case 'BeforeBossDemo':
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
			this.start('EndScreen');
			break;

		case 'EndScreen':
			this.start('Screamer');
			break;

		case 'Screamer':
			this.start('AfterBoss');
			break;

		default:
			console.log("ERROR ERROR ERROR WRONG INTRO NAME");
	}
}