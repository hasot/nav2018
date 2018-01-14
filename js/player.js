
var facing = 'left';
var fightTimer = 0;
var cursors;
var jumpButton;
var prevPos;
var playerFootHit;
var playerDamageInterval = 0;

function player() {
     // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'player');
     
     //  We need to enable physics on the player
    game.physics.arcade.enable(player);
 
     //  Player physics properties. Give the little guy a slight bounce.
     // player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    updatePreviousPos(player);

    return player;
}

function updatePreviousPos(player)
{
    prevPos = new Phaser.Point(player.x, player.y);
}

function fight(x,y) {
    if (discover == "right") {
        playerFootHit = game.add.sprite(x + 32, y+32, 'enemyBullet');
    } else {
        playerFootHit = game.add.sprite(x - 32, y+32, 'enemyBullet');
    };
  
    game.physics.arcade.enable(playerFootHit);
    
    setTimeout(function (){
        playerFootHit.kill();
        playerFootHit = null;
    }, 50)
}
var discover = "right";
var jumpTimer = 0;
function keyPlayer(hitPlatform) {
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
        if (cursors.left.isDown)
        {
            //  Move to the left
            discover = "left";
            player.body.velocity.x = -150;
    
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            discover = "right";
            player.body.velocity.x = 150;
    
        }
        else
        {
            //  Stand still
            player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.onFloor() && game.time.now > jumpTimer)
        {
            //  Let gravity do its thing
            player.body.velocity.y = -400;
            player.body.gravity.y = 500;
            jumpTimer = game.time.now + 750;
        }
      
        if (fightButton.isDown)
        {
            if (fightTimer == 0 )
            {    
                fight(player.body.x, player.body.y);
                fightTimer = 20;
                
            }
        }
        if (fightTimer > 0 ){
            fightTimer -= 1;
        }
}

function updatePlayer(enemies)
{
    if (playerDamageInterval <= 0)
    {
        player.visible = true;
        for (var i = 0; i < enemies.length; ++i)
        {
            var enemy = enemies[i];
            var vertDist = Math.abs(player.y - enemy.sprite.y);
            var horDist = Math.abs(player.x - enemy.sprite.x);

            var hit = vertDist < 64 && horDist < 32;

            if (hit)
            {
                hitPlayer();
                break;
            }
        }
    }
    else
    {
        playerDamageInterval -= 1;
        player.visible = !player.visible;
    }
}

function isPlayerDamaged()
{
    return playerDamageInterval > 0;
}

function hitPlayer()
{
    playerDamageInterval = 200;
}