
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

var dieMedSound;
var shotMedSound;
var painMedSound;
function initSounds() {
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

function createSounds() {
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

    moneySound.addMarker('money', 0, 0.9, 0.1);
    kickSound.addMarker('kick', 0, 0.9, 0.1);
    jumpSound.addMarker('jump', 0, 0.9, 0.1);
    boomSound.addMarker('boom', 0, 2.2, 0.2);
    copterSound.addMarker('copter', 0, 0.9, 0.1);
    deathMobSound.addMarker('deathMob', 0, 0.9, 0.1);
    healthSound.addMarker('health', 0, 0.9, 0.1);
    painNavSound.addMarker('painNav', 0, 0.9, 0.1);
    shotSound.addMarker('shot', 0, 0.9, 0.1);
    dieNavSound.addMarker('dieNav', 0, 0.9, 0.1);

    dieMedSound.addMarker('dieMed', 0, 0.9, 0.1);
    shotMedSound.addMarker('shotMed', 0, 0.9, 0.1);
    painMedSound.addMarker('painMed', 0, 0.9, 0.1);

}

