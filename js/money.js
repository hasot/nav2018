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
            var money = moneys.create(i * 50, 0, 'money');
    
            //  Let gravity do its thing
            money.body.gravity.y = 1000;
    
            //  This just gives each star a slightly random bounce value
            money.body.bounce.y = 0.3 + Math.random() * 0.02;
        }    
}
function collectStar (player, money) {
    
        // Removes the star from the screen
        money.kill();
        //  Add and update the score
        score += 10;
    
}

function getScore(){
    return score;
}