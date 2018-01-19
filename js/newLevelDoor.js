var doors;
var door
var goNavNewlvl = false;

function createDoor()
{
    if(levelNow != levelOne.length-1){
        doors = game.add.group();
        doors.enableBody = true;
    //    var door = doors.create(game.world.bounds.width-20, 448, 'door');
     door = doors.create(4075, 448, 'door');
    }
}

function goNewLvl(player, door)
{ 
    if(cursors.up.isDown) {
        goNavNewlvl = true;
    }
}

function startNewLvl(){
    if (goNavNewlvl) {
        console.log('first', player.alpha);
            player.alpha -= 0.1;
            console.log('second', player.alpha);
            if (player.alpha < 0.1) {
                goNavNewlvl = false;
                levelNow += 1;
                restart();
                door.kill();
            }
       
    }
}