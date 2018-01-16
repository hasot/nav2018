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
		if (!isPlayerDamaged() && enemyNeedToDie)
		{
			killEnemy(enemy);
			if (isJumpToEnemy)
				player.body.velocity.y = -200;

			enemies.splice(i, 1);
		}
		else i += 1;
	}
}

function killEnemy(enemy)
{
	if (enemy.isHeavy)
    	killHeavyEnemy(enemy);

    var corpse = new Corpse(
    					enemy.sprite.x, enemy.sprite.y, 
    					enemy.direction, 
    					enemy.sprite.key, 
    					enemy.direction == 1 ? 0 : 1);
    corpses.push(corpse);

    enemy.sprite.kill();
    enemy.isAlive = false;
}

function isPlayerFootHit(enemy)
{
	if (playerFootHit == null) return false;

	var hit = game.physics.arcade.collide(playerFootHit, enemy.sprite);

	var playerDirection = discover == 'right' ? 1 : -1;
	var enemyProtected = enemy.isHeavy
						 && enemy.useShield
						 && playerDirection != enemy.direction;

	return hit && !(enemyProtected);
}

function isPlayerHitJumpTo(enemy)
{
	var vertDist = Math.abs(player.y - enemy.sprite.y);
	var horDist = Math.abs(player.x - enemy.sprite.x);
	var playerFalls = player.y > prevPos.y;

	var hit = vertDist < 65 && vertDist > 50
			  && horDist < 32
			  && playerFalls;

	if (hit && enemy.isHeavy && enemy.useHelmet)
	{
		player.body.velocity.y = -200;
		return false;
	}

	return hit;
}

function updateEnemyBullets(bullets, friendBullets)
{
    var i = 0;
    while (i < bullets.length)
    {
    	var bullet = bullets[i];
		bullet.update();

		var needDestroy = bullet.isCollidesWith(layer, player);
		var needRevert = !isPlayerDamaged() && isNeedReverseBullet(bullet);

        if (needDestroy || needRevert)
    	{
    		if (needRevert)
    		{
    			var friendBullet = new FriendBullet(bullet.sprite.x, bullet.sprite.y, bullet.direction);
    			friendBullet.sprite.frame = bullet.sprite.frame;
    			friendBullets.push(friendBullet);
    		}

    		bullet.sprite.kill();
    		bullets.splice(i, 1);
        }
        else i += 1;
    }
};

function isNeedReverseBullet(bullet)
{
	if (playerFootHit == null) return false;
	if (!bullet.canRevert) return false;

	var needRevert = game.physics.arcade.collide(playerFootHit, bullet.sprite);
	return needRevert;
}

function updateFriendBullets(bullets, enemies)
{
	var i = 0;
    while (i < bullets.length)
    {
    	var bullet = bullets[i];
		bullet.update();

		var collidesWithPlatforms = bullet.isCollidesWith(layer);
		var collidesWithEnemies = bullet.isCollidesWithEnemy(enemies);

        if (collidesWithEnemies || collidesWithPlatforms)
    	{
    		bullet.sprite.kill();
    		bullets.splice(i, 1);
        }
        else i += 1;
    }
}