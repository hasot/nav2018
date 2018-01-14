var copter;
function helicopter(){
    copter = game.add.sprite(580, 40, 'helicopter');
    game.physics.enable(copter, Phaser.Physics.ARCADE);
    copter.animations.add('anim', [0, 1], 20, true);
    copter.animations.play('anim');
}


 function updateCopter(layer, player, enemies) {
    if (copter) {
        var x = copter.body.x;
        var isOutOfCamera = x  > game.camera.view.x  || x < game.camera.view.x + game.camera.view.width;
        copter.body.velocity.x = -200 ;
        return enemies;
    }
    return enemies;
}

function callHelicopter() {
        if (score >= 10 )
        {    
            helicopter(); 
            score -= 10;         
        }
};