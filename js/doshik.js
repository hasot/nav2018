var doshiki;

function initDoshiki()
{
	doshiki = game.add.group();
	doshiki.enableBody = true;
}

function createDoshik(x, y)
{
	var doshik = doshiki.create(x, y, 'playerHP');
	doshik.animations.add('anim', [0, 1], 1, true);
	doshik.animations.play('anim');
}

function collectDoshik(player, doshik)
{
	if (hp < maxPlayerHP)
	{
		doshik.kill();
		hp += 1;
		hud.addHP();
	}
}