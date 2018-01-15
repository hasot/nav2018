var booms;


function boom(){
    booms = game.add.group();
    
    booms.enableBody = true;
            //  Create a star inside of the 'stars' group
            var boom = booms.create(game.world.randomX, game.world.randomY, 'boom');
            //  Let gravity do its thing
            boom.body.bounce.x = 0.3 + Math.random() * 0.02;
            boom.body.bounce.y = 0.3 + Math.random() * 0.02;
            boom.animations.add('booms',[0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]);
            boom.play('booms',10, false,true);
          //  boom.animations.play('booms',[0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15] ,10, true);
            //  This just gives each star a slightly random bounce value
            booms.setAll('x', 10, true, true, 1);
}
function killAllBoom (boom) {
        // Removes the star from the screen
        booms.remove(boom, true);
        //  Add and update the score
}
