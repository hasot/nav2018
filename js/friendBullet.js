
FriendBullet = function(x, y, direction)
{
    this.sprite = game.add.sprite(x, y, 'enemyBullet');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.direction = direction * (-1);
}

FriendBullet.prototype.update = function(platforms, player) 
{   
    this.sprite.body.velocity.x = 400 * this.direction;
};

FriendBullet.prototype.isCollidesWith = function(platforms)
{
    var x = this.sprite.body.x;
    var isOutOfCamera = x  < game.camera.view.x 
                        || x > game.camera.view.x + game.camera.view.width;
    var collideWithPlatforms =  game.physics.arcade.collide(this.sprite, platforms);

    var res = isOutOfCamera || collideWithPlatforms;

    return res;
};

FriendBullet.prototype.isCollidesWithEnemy = function(enemies)
{
    var i = 0;
    while (i < enemies.length)
    {  
        var enemy = enemies[i];
        var bulletHit = game.physics.arcade.collide(this.sprite, enemy.sprite);

        if (bulletHit)
        {
            killEnemy(enemy);

            enemies.splice(i, 1);
            return true;
        }
        else i += 1;
    }

    return false;
}