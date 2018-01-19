var booms;

function boom()
{
    //  Create a star inside of the 'stars' group
    var boom = booms.create(game.world.randomX, game.world.randomY, 'boom');
    //  Let gravity do its thing
    boom.body.bounce.x = 0.3 + Math.random() * 0.02;
    boom.body.bounce.y = 0.3 + Math.random() * 0.02;
    boom.animations.add('booms',[0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]);
    boom.play('booms',10, false,true);
}

function boomSounds(){
        var id = 0;
         setTimeout(function(){
                                        boomSound.play('boom');
        },300)
}
