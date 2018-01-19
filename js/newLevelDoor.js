var doors;
var door
var goNavNewlvl = false;

function createDoor()
{
    console.log("new", doors);
    if(levelNow != levelOne.length-1){
 
        doors = game.add.group();
        doors.enableBody = true;
        door = doors.create(100, 448, 'door', 0);
        console.log("new1",doors);
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
                door.kill();
                restart();
                copterNewLvl();
            }
       
    }
}