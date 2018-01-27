
var levelOne = ['level1Part1','level1Part2', 'level1Part3','level1Boss'];
var levelNow = 0;

function initLevelsJson(){
    game.load.tilemap('level1Part1', 'levelsJson/level1Part1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level1Part2', 'levelsJson/level1Part2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level1Part3', 'levelsJson/level1Part3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level1Boss', 'levelsJson/level1Boss.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'assets/image/tiles-1.png');
}

function createMap(){
      //  A simple background for our game
      bg = game.add.tileSprite(0, 0, 4096, 560, 'background');
      
        map = game.add.tilemap(levelOne[levelNow]);
          map.addTilesetImage('tiles-1');

          map.setCollisionByExclusion([ 177,178,197,198,217,218,237,238,257,258,273,274,293,294,277,278,297,298,317,318, 46 ]);
          
          layer = map.createLayer('Tile Layer 1');
      
          layer.resizeWorld();
}