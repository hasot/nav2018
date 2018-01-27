
var moneySound;
var kickSound;
var jumpSound;
var boomSound;
var copterSound;
var deathMobSound;
var healthSound;
var painNavSound;
var shotSound;
var dieNavSound;

var startMusic;
var finalMusic;

var dieMedSound;
var shotMedSound;
var painMedSound;
var scary;

var currentMusic;

function initSounds() {
    game.load.audio('part1', 'assets/audio/part1.wav');
    game.load.audio('part2', 'assets/audio/part2.wav');
    game.load.audio('part3', 'assets/audio/part3.wav');
    game.load.audio('bossMusic', 'assets/audio/bossMusic.wav');

    game.load.audio('scary', 'assets/audio/scary.wav');

    game.load.audio('start', [ 'assets/audio/start.wav' ]);
    game.load.audio('final', [ 'assets/audio/final.wav' ]);

    game.load.audio('money', [ 'assets/audio/money.wav' ]);
    game.load.audio('kick', [ 'assets/audio/kick.wav' ]);
    game.load.audio('jump', [ 'assets/audio/jump.wav' ]);
    game.load.audio('boom', [ 'assets/audio/boom.wav' ]);
    game.load.audio('copter', [ 'assets/audio/copter.wav' ]);
    game.load.audio('health', [ 'assets/audio/health.wav' ]);
    game.load.audio('painNav', [ 'assets/audio/painNav.wav' ]);
    game.load.audio('dieNav', [ 'assets/audio/dieNav.wav' ]);
    
    game.load.audio('shot', [ 'assets/audio/shot.wav' ]);
    game.load.audio('deathMob', [ 'assets/audio/deathMob.wav' ]);

    game.load.audio('dieMed', [ 'assets/audio/dieMed.wav' ]);
    game.load.audio('shotMed', [ 'assets/audio/shotMed.wav' ]);
    game.load.audio('painMed', [ 'assets/audio/painMed.wav' ]);
}

sounds = [];
function createSounds() {

    initBackgroundMusic();

    finalMusic = game.add.audio('final');
    scary = game.add.audio('scary');

    moneySound = game.add.audio('money');
    kickSound = game.add.audio('kick');
    jumpSound = game.add.audio('jump');
    boomSound = game.add.audio('boom');
    copterSound = game.add.audio('copter');
    deathMobSound = game.add.audio('deathMob');
    healthSound = game.add.audio('health');
    painNavSound = game.add.audio('painNav');
    shotSound = game.add.audio('shot');
    dieNavSound = game.add.audio('dieNav');

    dieMedSound = game.add.audio('dieMed');
    shotMedSound = game.add.audio('shotMed');
    painMedSound = game.add.audio('painMed');


    finalMusic.addMarker('final', 0, 180, 0.4);

    scary.addMarker('scary', 0, 2, 0.3);

    moneySound.addMarker('money', 0, 0.9, 0.3);
    kickSound.addMarker('kick', 0, 0.9, 0.3);
    jumpSound.addMarker('jump', 0, 0.9, 0.5);
    boomSound.addMarker('boom', 0, 2.2, 0.5);
    copterSound.addMarker('copter', 0, 0.9, 0.4);
    deathMobSound.addMarker('deathMob', 0, 0.9, 0.5);
    healthSound.addMarker('health', 0, 0.9, 0.5);
    painNavSound.addMarker('painNav', 0, 0.9, 0.5);
    shotSound.addMarker('shot', 0, 0.9, 0.3);
    dieNavSound.addMarker('dieNav', 0, 0.9, 0.3);

    dieMedSound.addMarker('dieMed', 0, 0.9, 0.3);
    shotMedSound.addMarker('shotMed', 0, 0.9, 0.3);
    painMedSound.addMarker('painMed', 0, 0.9, 0.3);

}

function start() {
    sounds.shift();
    music.loopFull(0.4);

}

function initBackgroundMusic() {
    switch (levelNow) {
        case 0 :
            music = game.add.audio('part1');
          break;
        case 1: 
        music = game.add.audio('part2');
            break;
        case 2:  
          
        music = game.add.audio('part3');
        break;
        default:
        music = game.add.audio('bossMusic');
      }
    sounds.push(music);
    game.sound.setDecodedCallback(sounds, start, this);
    
}
