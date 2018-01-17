
var facing = 'left';
var fightTimer = 0;
var cursors;
var jumpButton;
var prevPos;
var playerFootHit;
var playerDamageInterval = 0;
var discover = "right";
var jumpTimer = 0;
var maxPlayerHP = 3;
var hp = startHp;
var startHp = maxPlayerHP;

var playerDead = false;
var helicopterTimer = 0;

function createPlayer() {
     // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'player');
     
     //  We need to enable physics on the player
    game.physics.arcade.enable(player);
 
     //  Player physics properties. Give the little guy a slight bounce.
     // player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
            //  Our two animations, walking left and right.
    player.animations.add('playerRunR', [2, 3], 5, true);
    player.animations.add('playerRunL', [8, 9], 5, true);
    player.animations.add('playerStandR', [4, 5], 3, true);
    player.animations.add('playerStandL', [6, 7], 3, true);

    updatePreviousPos(player);

    return player;
}

function updatePreviousPos(player)
{
    prevPos = new Phaser.Point(player.x, player.y);
}

function fight(x,y) 
{
    playerFootHit = game.add.sprite(
                        discover == "right" ? x : x -32, 
                        y, 
                        'playerFoot');
    player.animations.stop();
    playerFootHit.frame = discover == "right" ? 0 : 1;
  
    game.physics.arcade.enable(playerFootHit);
    
    setTimeout(function (){
        playerFootHit.kill();
        playerFootHit = null;
    }, 100)
}


function keyPlayer(hitPlatform) 
{
    if (playerDead) return;
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    if (cursors.left.isDown)
    {
        if (player.frame != 8 && player.frame != 9)
        {
            player.animations.play('playerRunL');
        }
        //  Move to the left
        discover = "left";
        player.body.velocity.x = -150;

    }
    else if (cursors.right.isDown)
    {
        if (player.frame != 2 && player.frame != 3)
        {
            player.animations.play('playerRunR');
        }
        //  Move to the right
        discover = "right";
        player.body.velocity.x = 150;

    }
    else
    {
        player.animations.play(discover == "left" 
                               ? 'playerStandL' 
                               : 'playerStandR');
    }

    if (!player.body.onFloor())
    {
        player.animations.stop();
        player.frame = discover == "right" ? 0 : 11;
    }

    if (playerFootHit != null)
    {
        player.animations.stop();
        player.frame = discover == "right" ? 1 : 10;
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

    if (copterButton.isDown)
    {
        if (helicopterTimer == 0 )
        {    
            callHelicopter();
            helicopterTimer = 50;
            
        }
    }
    if (helicopterTimer > 0 ){
        helicopterTimer -= 1;
    }
}

function updatePlayer(enemies)
{
    if (playerDead) return;

    if (playerFootHit != null)
    {
        playerFootHit.x = discover == "right" ? player.x : player.x -32;
        playerFootHit.y = player.y;
    }

    if (playerDamageInterval <= 0)
    {
        player.alpha = 1;
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
        player.alpha = player.alpha > 0.5 ? player.alpha - 0.1 : 1;
    }
}

function isPlayerDamaged()
{
    return playerDamageInterval > 0;
}

function hitPlayer()
{
    hp -= 1;
    hud.removeHP();
    if (hp <= 0)
    {
        var playerCorpse = new Corpse(
                                player.x, player.y, 
                                discover == "right" ? 1 : -1, 
                                'player', 
                                discover == "right" ? 12 : 13);
        corpses.push(playerCorpse);

        playerDead = true;
        player.kill();
    }
    else
        playerDamageInterval = 50;
}
