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
  
        { x: 715, y: 95 },
        { x: 720, y: 125 },
        { x: 725, y: 155 },
        { x: 730, y: 185 },
        { x: 735, y: 215 },
        { x: 740, y: 245 },
        { x: 745, y: 275 },
        { x: 750, y: 305 },
        { x: 755, y: 335 },
        { x: 760, y: 365 },

        { x: 1173, y: 323 },
        { x: 1203, y: 323 },

        { x: 1041, y: 190 },
        { x: 1071, y: 190 },
        


        { x: 1290, y: 80 },
        { x: 1295, y: 110 },
        { x: 1300, y: 140 },
        { x: 1305, y: 170 },
        { x: 1310, y: 200 },
        { x: 1315, y: 230 },
        { x: 1320, y: 260 },
        { x: 1325, y: 290 },
        { x: 1330, y: 320 },
        { x: 1335, y: 350 },
        { x: 1340, y: 380 },

        { x: 1380, y: 112 },
        { x: 1410, y: 112 },

        { x: 1824, y: 448 },
        { x: 1854, y: 448 },
        { x: 1884, y: 448 },
        { x: 1914, y: 448 },  
        { x: 1884, y: 448 },
        { x: 1914, y: 448 },  
        { x: 1944, y: 448 },
        { x: 1974, y: 448 },

        { x: 1670, y: 330 },
        { x: 1700, y: 330 },

        { x: 1840, y: 252 },
        { x: 1870, y: 252 },
        { x: 1900, y: 252 },

        { x: 2061, y: 308 },
        { x: 2091, y: 308 },
        { x: 2121, y: 308 },

        { x: 2258, y: 102 },
        { x: 2288, y: 102 },
        { x: 2318, y: 102 },

        { x: 2603, y: 264 },
        { x: 2623, y: 294 },
        { x: 2643, y: 324 },
        { x: 2663, y: 354 },
        { x: 2683, y: 384 },
        { x: 2703, y: 414 },
        { x: 2723, y: 444 },
        
        { x: 3200, y: 370 },
        { x: 3230, y: 370 },
        { x: 3260, y: 370 },


        { x: 3550, y: 370 },
        { x: 3580, y: 370 },
        { x: 3610, y: 370 },

        { x: 3732, y: 316 },
        { x: 3762, y: 316 },

        { x: 3555, y: 192 },
        { x: 3585, y: 192 },

        { x: 3880, y: 105 },
        { x: 3910, y: 105 },
        { x: 3940, y: 105 },
        { x: 3970, y: 105 },
        { x: 4000, y: 105 },
        { x: 4030, y: 105 },
        { x: 4060, y: 105 },

        { x: 3880, y: 135 },
        { x: 3910, y: 135 },
        { x: 3940, y: 135 },
        { x: 3970, y: 135 },
        { x: 4000, y: 135 },
        { x: 4030, y: 135 },
        { x: 4060, y: 135 },

        { x: 3880, y: 165 },
        { x: 3910, y: 165 },
        { x: 3940, y: 165 },
        { x: 3970, y: 165 },
        { x: 4000, y: 165 },
        { x: 4030, y: 165 },
        { x: 4060, y: 165 },

        { x: 3880, y: 195 },
        { x: 3910, y: 195 },
        { x: 3940, y: 195 },
        { x: 3970, y: 195 },
        { x: 4000, y: 195 },
        { x: 4030, y: 195 },
        { x: 4060, y: 195 },

        { x: 3880, y: 225 },
        { x: 3910, y: 225 },
        { x: 3940, y: 225 },
        { x: 3970, y: 225 },
        { x: 4000, y: 225 },
        { x: 4030, y: 225 },
        { x: 4060, y: 225 },

       
        

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

