HUD = function(hp, money)
{
	this.indent = 6;

	this.lifes = [];
	for (var i = 0; i < hp; ++i)
		this.addHP();

	this.moneyText = game.add.text(16, 40, 'DONATES: ' + money, 
		{ 
		    font: 'Arial Black',
    	    fontSize: 14,
    		fontWeight: 'bold',
		});
	this.moneyText.fixedToCamera = true;
}

HUD.prototype.clear = function()
{
	for (var i = 0; i < this.lifes.length; ++i)
		this.lifes[i].kill();

	this.moneyText.kill();
}

HUD.prototype.addHP = function() 
{
	var x = (this.lifes.length + 1) * (16 + this.indent);
	var life = game.add.sprite(x, 5, 'mandat');
	life.fixedToCamera = true;

	this.lifes.push(life);
};

HUD.prototype.update = function() 
{
	for (var i = 0; i < this.lifes.length; ++i)
		this.lifes[i].bringToTop();
};

HUD.prototype.removeHP = function() 
{
	var last = this.lifes.length - 1;
	var live = this.lifes[last];

	live.kill();

	this.lifes.splice(last);
};

HUD.prototype.updateScore = function()
{
	this.moneyText.setText('DONATES: ' + score);
}

HUD.prototype.createBossHP = function(lives, spriteName)
{
	this.bossLives = [];
	for (var i = 0; i < lives; ++i)
		this.addBossHP(spriteName);
}

HUD.prototype.addBossHP = function(spriteName)
{
	var x = game.camera.width - (this.bossLives.length + 1) * (16 + this.indent);
	var live = game.add.sprite(x, 5, spriteName);
	live.fixedToCamera = true;

	this.bossLives.push(live);
}

HUD.prototype.removeBossHP = function(lives, spriteName)
{
	var last = this.bossLives.length - 1;
	var live = this.bossLives[last];

	live.kill();

	this.bossLives.splice(last);	
}