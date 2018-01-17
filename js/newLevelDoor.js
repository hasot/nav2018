var doors;

function initDoor()
{

    
}

function createDoor()
{
    if(levelNow != levelOne.length-1){
        doors = game.add.group();
        doors.enableBody = true;
        var door = doors.create(game.world.bounds.width-20, 448, 'door');
    }
  
 //   door.body.bounce.x = 32;
  //  door.body.bounce.y = 600;
	// doshik.animations.add('anim', [0, 1], 1, true);
	// doshik.animations.play('anim');
}

function goNewLvl(player, door)
{ 
    if(cursors.up.isDown) {
    levelNow += 1;
    restart();
    door.kill();
    }
}