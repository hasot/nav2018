var doshiki;

var doshikCoordinate = [[
	{x:2297, y: 450},
	{x:1700, y: 339},
	{x:3280, y: 195},
],
[
	{ x: 1800, y: 450},
	{ x: 1830, y: 450},

	{ x: 3020, y: 195 },
	{ x: 2990, y: 195 },
	{ x: 3250, y: 195 },
],
[],
[]
]

function initDoshiki()
{
	doshiki = game.add.group();
	doshiki.enableBody = true;
	for (var i=0; i < doshikCoordinate[levelNow].length; i++) {
		createDoshik(doshikCoordinate[levelNow][i].x, doshikCoordinate[levelNow][i].y);
	}
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
		healthSound.play('health');
		doshik.kill();
		hp += 1;
		hud.addHP();
	}
}