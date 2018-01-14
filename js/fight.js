function updateEnemies(player)
{
	var i = 0;
	while (i < enemies.length)
	{
		enemies[i].update();

		if (isPlayerHitJumpTo(enemies[i]))
		{
			enemies[i].isAlive = false;
			enemies[i].sprite.kill();
			enemies.splice(i, 1);

			player.body.velocity.y = -200;
		}
		else
		{
			i += 1;
		}
	}
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

function updateEnemyBullets()
{
    var currentIndex = 0;
    while (currentIndex < bullets.length)
    {
		bullets[currentIndex].update();

        var bullet = bullets[currentIndex];
        if (bullet.checkCollisions(platforms, player))
            bullets.splice(currentIndex, 1);
        else
            currentIndex += 1;
    }
};