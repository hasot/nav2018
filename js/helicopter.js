var copter;
function helicopter(){
    console.log(game.camera.view.x)
    copter = game.add.sprite(game.camera.view.x, 40, 'helicopter');
    game.physics.enable(copter, Phaser.Physics.ARCADE);
    copter.animations.add('anim', [0, 1], 20, true);
    copter.animations.play('anim');
}


 function updateCopter(layer, player, enemies) {
    if (copter) {
        EnemySpeed = 0;
        var x = copter.body.x;
        player.body.velocity.x = 0;
        boom();
        var isOutOfCamera = x > game.camera.view.x + game.camera.view.width ;
        copter.body.velocity.x = 300 ;
        if (isOutOfCamera) {
            console.log("kill all", isOutOfCamera);
            isOutOfCamera = false;
            copter.kill();
            copter = null;
            copterKillEnemy(enemies);
           
            booms.forEach(killAllBoom, this, true);
        }
        return false;
    }
    EnemySpeed = 40;
    return true;
}

function callHelicopter() {
        if (score >= 10 )
        {    
            helicopter(); 
            score -= 10;       
            hud.updateScore();  
        }
};

function copterKillEnemy(enemies) {
    for(i=0; i<enemies.length; i +=1){
        var enemy = enemies[i];
        if(game.camera.view.x <= enemy.sprite.x && enemy.sprite.x <= game.camera.view.x + game.camera.view.width) {
            killEnemy(enemy);
            enemies.splice(i, 1);
            i -=1;
        }
    }
}