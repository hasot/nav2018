var copter;
var imageCopter;
var imageCopterM = [];
var copterPrice = 50;
var index = 0

function helicopter()
{
    copter = game.add.sprite(game.camera.view.x, 40, 'helicopter');
    game.physics.enable(copter, Phaser.Physics.ARCADE);
    copter.animations.add('anim', [0, 1], 20, true);
    copterSound.play('copter');
    boomSounds();
    copter.animations.play('anim');

    booms = game.add.group();   
    booms.enableBody = true;
}

 function updateCopter(layer, player, enemies) {

    if (copter) {
        index = Math.floor(score / copterPrice);
        EnemySpeed = 0;
        var x = copter.body.x;
        player.body.velocity.x = 0;
        boom();
        var isOutOfCamera = x > game.camera.view.x + game.camera.view.width ;
        copter.body.velocity.x = 300 ;
        if (isOutOfCamera) {
            isOutOfCamera = false;
            copter.kill();
            copter = null;
            copterKillEnemy(enemies);
            booms.kill();
            if(imageCopterM[index]){
            imageCopterM[index].kill();
            imageCopterM.splice(index,1);
            }
        }
        return false;
    } else {
        copterLogo();
    }
    EnemySpeed = 40;
    return true;
}

function callHelicopter() {
        if (score > copterPrice-1 )
        {    
            helicopter(); 
            score -= copterPrice;       
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
var position;
function copterLogo(){
    if (score > copterPrice-1 && index != Math.floor(score / copterPrice)) {
        index +=1;
        if (Math.floor(score / copterPrice) > 1) {
            position = 20 + 30 * (Math.floor(score / copterPrice)-1);
        } else {
            position = 15;
        }
        imageCopter = game.add.sprite(position, 50, 'helicopter');
        imageCopter.scale.setTo(0.3,0.4);
        imageCopterM.push(imageCopter);
        imageCopter.fixedToCamera = true;
    }
}