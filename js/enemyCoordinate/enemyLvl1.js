


            // createEnemy.flyingOn(416, 96).thatMovesHorizontalOn(256, 480),
            // createEnemy.flyingOn(544, 160).thatMovesVerticalOn(32, 288),
            // createEnemy.heavyOn(384, 352).thatMovesOn(192, 512).withShield(),
            // createEnemy.heavyOn(64, 236).thatMovesOn(0, 160).withFullArmor(),
            // createEnemy.heavyOn(32, 86).thatMovesOn(32, 192).withHelmet()
function initEnemy() {
    var enemyCoordinate =[];
    switch (levelNow) {
        case 0 :
        enemies = [
            createEnemy.shotingOn(520, 160),
            createEnemy.shotingOn(1400, 80),
            createEnemy.shotingOn(1966, 416),
            createEnemy.shotingOn(2170, 148),
            createEnemy.shotingOn(3040, 416),
            createEnemy.shotingOn(3400, 416),
            createEnemy.shotingOn(3760, 288),
            createEnemy.shotingOn(3805, 48),

            createEnemy.simpleOn(842, 416).thatMovesOn(760, 908),
            createEnemy.simpleOn(1550, 416).thatMovesOn(1400, 1730),
            createEnemy.simpleOn(1750, 416).thatMovesOn(1700, 1950),
            createEnemy.simpleOn(2370, 148).thatMovesOn(2150, 2450),
            createEnemy.simpleOn(3250, 416).thatMovesOn(3100, 3350),
            createEnemy.heavyOn(3550, 416).thatMovesOn(3400, 3650).withHelmet(),

            createEnemy.simpleOn(3940, 416).thatMovesOn(3860, 4085),
            createEnemy.heavyOn(3880, 416).thatMovesOn(3860, 4085).withHelmet(),
            createEnemy.heavyOn(4040, 416).thatMovesOn(3860, 4085).withHelmet(),
            ];
          break;
        case 1:  enemies =[]; break;
        case 2:  enemies =[]; break;
        default:
          console.log('Sorry, we are out of ' + levelNow + '.');
      }

    enemies
  
}