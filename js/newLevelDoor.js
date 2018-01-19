var doors;
var door
var goNavNewlvl = false;

function createDoor()
{
    if(levelNow != levelOne.length-1)
    {
        doors = game.add.group();
        doors.enableBody = true;
        door = doors.create(100, 448, 'door', 0);
    }
}

function goNewLvl(player, door)
{ 
    if(cursors.up.isDown) {
        goNavNewlvl = true;
    }
}

function startNewLvl()
{
    if (goNavNewlvl) 
    {
        player.alpha -= 0.1;
        
        if (player.alpha < 0.1) 
        {
            goNavNewlvl = false;
            levelNow += 1;
            door.kill();
            restart();  
        }
    }
}