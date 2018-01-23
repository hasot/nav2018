var doors;
var door
var goNavNewlvl = false;

var lvlDoorCoordinate = [
        {x:100, y:448},
        {x:4060, y:170},
        {x:4060, y:448}
]

function createDoor()
{
    if(levelNow != levelOne.length-1)
    {
        doors = game.add.group();
        doors.enableBody = true;
        door = doors.create(lvlDoorCoordinate[levelNow].x, lvlDoorCoordinate[levelNow].y, 'door', 0);
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