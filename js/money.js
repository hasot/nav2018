var moneys;

var score = 0;
var scoreText;

function money(){
    moneys = game.add.group();
    
        moneys.enableBody = true;
    
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 30; i++)
        {
            //  Create a star inside of the 'stars' group
            var money = moneys.create(game.world.randomX, game.world.randomY, 'money', 0);
            //  Let gravity do its thing
            money.body.gravity.y = 1000;
            //  This just gives each star a slightly random bounce value
            money.body.bounce.y = 0.3 + Math.random() * 0.02;
        }
        moneys.callAll('animations.add', 'animations', 'spin', [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15], 10, true);  
        moneys.callAll('animations.play', 'animations', 'spin');  
}
function collectMoney (player, money) {
        // Removes the star from the screen
        money.kill();
        //  Add and update the score
        score += 10;
}

function getScore(){
    return score;
}

