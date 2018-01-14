var moneys;

var score = 0;
var scoreText;

function money(){
    moneys = game.add.group();
    
        moneys.enableBody = true;
    
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 2; i++)
        {
            //  Create a star inside of the 'stars' group
            var money = moneys.create(i * 70, 0, 'money');
    
            //  Let gravity do its thing
            money.body.gravity.y = 70;
    
            //  This just gives each star a slightly random bounce value
            money.body.bounce.y = 0.3 + Math.random() * 0.02;
        }
    scoreText = game.add.text(480, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            
}
function collectStar (player, money) {
    
        // Removes the star from the screen
        money.kill();
        //  Add and update the score
        score += 10;
        scoreText.text = 'Score: ' + score;
    
}