
var facing = 'left';
var fightTimer = 0;
var cursors;
var jumpButton;

function player(player) {
     // The player and its settings
     player = game.add.sprite(32, game.world.height - 150, 'player');
     
         //  We need to enable physics on the player
         game.physics.arcade.enable(player);
     
         //  Player physics properties. Give the little guy a slight bounce.
         player.body.bounce.y = 0.2;
         player.body.gravity.y = 300;
         player.body.collideWorldBounds = true;
                //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        return player;
}
function keyPlayer() {
   //  Collide the player and the stars with the platforms
   var hitPlatform = game.physics.arcade.collide(player, platforms);
   
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;
    
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
    
        }
        else
        {
            //  Stand still

    
            player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down && hitPlatform)
        {
            console.log("jump")
            //  Let gravity do its thing
            player.body.velocity.y = -400;
            player.body.gravity.y = 500;
        }
      
        if (fightButton.isDown)
        {
            if (fightTimer == 0 ){
                console.log("Z");
                fightTimer = 20;
            }
        }
        if (fightTimer > 0 ){
            fightTimer -= 1;
        }
}