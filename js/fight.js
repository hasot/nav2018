function updateEnemies(player)
{
	var i = 0;
	while (i < enemies.length)
	{
		var enemy = enemies[i];
		enemy.update();

		var isJumpToEnemy = isPlayerHitJumpTo(enemy);	
		var enemyNeedToDie = isJumpToEnemy 
							 || isPlayerFootHit(enemy)
		if (enemyNeedToDie)
		{
			enemy.isAlive = false;
			enemy.sprite.kill();

			if (isJumpToEnemy)
				player.body.velocity.y = -200;

			enemies.splice(i, 1);
		}
		else i += 1;
	}
}

function isPlayerFootHit(enemy)
{
	if (playerFootHit == null) return false;

	return game.physics.arcade.collide(playerFootHit, enemy.sprite);
}

function isPlayerHitJumpTo(enemy)
{
	var vertDist = Math.abs(player.y - enemy.sprite.y);
	var horDist = Math.abs(player.x - enemy.sprite.x);
	var playerFalls = player.y > prevPos.y;

	var res = vertDist < 65 && vertDist > 50
			  && horDist < 32
			  && playerFalls;

	return res;
}

function updateEnemyBullets(bullets)
{
    var i = 0;
    while (i < bullets.length)
    {
    	var bullet = bullets[i];

		bullet.update();

        if (bullet.isCollidesWith(platforms, player))
    	{
    		bullet.sprite.kill();

        	bullets.splice(i, 1);
        }
        else i += 1;
    }
};