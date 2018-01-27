var doors;
var door
var goNavNewlvl = false;

var lvlDoorCoordinate = [
        {x:4040, y:386},
        {x:4040, y:130},
        {x:4040, y:114},
        // {x:100, y:386},
        // {x:100, y:130},
        // {x:100, y:114}
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
    if(cursors.up.isDown) 
    {
        goNavNewlvl = true;
    }
}

function startNewLvl()
{
    if (goNavNewlvl) 
    {
        music.pause();
        player.alpha -= 0.1;
        if (player.alpha < 0.1) 
        {
            levelNow += 1;
            startPlayIntro();       
        }
    }
}

function startPlayIntro()
{
    switch (levelNow)
    {
        // case 1:
        //     intro.start('Level2Start');
        //     break;

        // case 2:
        //     intro.start('Level2Start');
        //     break;

        // case 3:
        //     intro.start('BeforeBattle');
        //     break;

        default:
            changeLevel();
    }
}

function changeLevel()
{
    goNavNewlvl = false;
    door.kill();
    restart();
    copterNewLvl();
}