var moneys;

var score = 0;

var moneyCoordinate = [
    [
        { x: 205, y: 310},
        { x: 235, y: 310},
        { x: 265, y: 310},
        { x: 483, y: 195},
        { x: 513, y: 195},
        { x: 543, y: 195},
        { x: 493, y: 452},
        { x: 523, y: 452},
        { x: 553, y: 452},
        { x: 40 , y: 216},
        { x: 70 , y: 216},
        { x: 100, y: 216},
        { x: 324, y: 95 },
        { x: 354, y: 95 },
        { x: 384, y: 95 },
        { x: 670, y: 115 },
        { x: 700, y: 115 },
        { x: 730, y: 126 },
        { x: 755, y: 150 },
        { x: 755, y: 175 },
        { x: 755, y: 200 },
        { x: 755, y: 225 },
    ],
    [
        { x: 100, y: 300}
    ],
    [
        { x: 100, y: 300}
    ],
    [
        
    ]
]
function money(){
    moneys = game.add.group();
    
        moneys.enableBody = true;
    
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < moneyCoordinate[levelNow].length; i++)
        {
            //  Create a star inside of the 'stars' group
            var money = moneys.create(moneyCoordinate[levelNow][i].x, moneyCoordinate[levelNow][i].y, 'money', 0);
            //  Let gravity do its thing
            money.body.gravity.y = 0;
            //  This just gives each star a slightly random bounce value
            money.body.bounce.y = 0.3 + Math.random() * 0.02;
        }
        moneys.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 2, 1, 0], 5, true);  
        moneys.callAll('animations.play', 'animations', 'spin');  
}

function collectMoney (player, money) {
        moneySound.play('money');
        // Removes the star from the screen
        money.kill();
        //  Add and update the score

        score += 1;

        hud.updateScore();
}

function getScore(){
    return score;
}

