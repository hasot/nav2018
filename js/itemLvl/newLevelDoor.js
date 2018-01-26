var doors;
var door
var goNavNewlvl = false;

var lvlDoorCoordinate = [
        {x:100, y:386},
        {x:100, y:170},
        {x:100, y:176}
]

function createDoor()
{
    if(levelNow != levelOne.length-1)
    {
        doors = game.add.group();
        doors.enableBody = true;
        door = doors.create(lvlDoorCoordinate[levelNow].x, lvlDoorCoordinate[levelNow].y, 'door', 0);
        door.scale.setTo(0.07,0.07);
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
            player.alpha -= 0.1;
            if (player.alpha < 0.1) {
                goNavNewlvl = false;
                levelNow += 1;
                door.kill();
                restart();
                copterNewLvl();
            }
       
    }
}