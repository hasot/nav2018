


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
        case 1:  enemies =[
            createEnemy.heavyOn(425, 160).thatMovesOn(250, 560).withHelmet(),

            createEnemy.shotingOn(900, 160),
            createEnemy.heavyOn(900, 160).thatMovesOn(800, 960).withShield(),

            createEnemy.heavyOn(1480, 160).thatMovesOn(1390, 1580).withHelmet(),

            createEnemy.shotingOn(2290, 160),

            createEnemy.shotingOn(2800, 160),
            createEnemy.shotingOn(2900, 160),
            createEnemy.heavyOn(2900, 160).thatMovesOn(2600, 3000).withFullArmor(),
            createEnemy.heavyOn(2700, 160).thatMovesOn(2600, 3000).withFullArmor(),
            

            createEnemy.heavyOn(2580, 417).thatMovesOn(2550, 2666).withShield(),
            createEnemy.heavyOn(2650, 417).thatMovesOn(2550, 2666).withShield(),

          
            createEnemy.heavyOn(3600, 160).thatMovesOn(3550, 4070).withFullArmor(),
            createEnemy.shotingOn(3550, 160),
            createEnemy.heavyOn(3700, 160).thatMovesOn(3550, 4070).withFullArmor(),
            createEnemy.shotingOn(3750, 160),
            createEnemy.heavyOn(3800, 160).thatMovesOn(3550, 4070).withFullArmor(),
            createEnemy.shotingOn(3850, 160),


            createEnemy.shotingOn(3165, 305),

            createEnemy.simpleOn(425, 417).thatMovesOn(250, 560),

            createEnemy.simpleOn(966, 417).thatMovesOn(809, 1100),

            createEnemy.heavyOn(850, 417).thatMovesOn(809, 1100).withHelmet(),

            createEnemy.heavyOn(1070, 417).thatMovesOn(1000, 1100).withHelmet(),
            createEnemy.heavyOn(1995, 417).thatMovesOn(1930, 2040).withHelmet(),
            
            createEnemy.shotingOn(1500, 417),
            createEnemy.shotingOn(1600, 417),
            createEnemy.shotingOn(1700, 417),


            createEnemy.simpleOn(2950, 417).thatMovesOn(2920, 3160),
            createEnemy.heavyOn(3000, 417).thatMovesOn(2920, 3160).withHelmet(),
            createEnemy.heavyOn(3050, 417).thatMovesOn(2920, 3160).withShield(),
            createEnemy.heavyOn(3100, 417).thatMovesOn(2920, 3160).withFullArmor(),



        ]; break;
        case 2:  enemies =[]; break;
        default:
            enemies =[];
      }

    enemies
  
}