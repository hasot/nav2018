
FriendBullet = function(x, y, direction)
{
    this.sprite = game.add.sprite(x, y, 'enemyBullet');
    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.direction = direction;
}

FriendBullet.prototype.update = function(platforms, player) 
{   
    this.sprite.body.velocity.x = 400 * this.direction;
};

FriendBullet.prototype.isCollidesWith = function(platforms)
{
    var x = this.sprite.x;
    var isOutOfCamera = x  < game.camera.view.x 
                        || x > game.camera.view.x + game.camera.view.width;
    var collideWithPlatforms =  game.physics.arcade.collide(this.sprite, platforms);
    if (collideWithPlatforms)
    {
        var bulletCorpse = new BulletCorpse(this.sprite, this.direction);
        corpses.push(bulletCorpse);
    }

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
        var protected = enemy.isHeavy && enemy.useShield && this.direction != enemy.direction;
        if (bulletHit)
        {
            if (protected)
            {
                var bulletCorpse = new BulletCorpse(this.sprite, this.direction);
                corpses.push(bulletCorpse);           
            }
            if (!protected)
            {
                killEnemy(enemy);
                enemies.splice(i, 1);
            }
            return true;
        }
        else i += 1;
    }

    return false;
}