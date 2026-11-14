//Setup: canvas & gravity
await Canvas(800, 450);
world.gravity.y = 10;

let score = 0;

// ===== PLAYER =====
let player = new Sprite(0, -100, 30, 40);
player.color = 'tomato';
player.rotationLock = true;  // keeps the player from tipping over
player.friction = 0;         // keeps the player from sticking to walls
player.img = '🐸';       // optional: emoji as placeholder art

//player.debug = true; //allows me to see the sprite box

// ===== TILE GROUPS =====
// Each group gets one character to stand for it in the map
let ground = new Group();
ground.physics = STATIC; // static sprites never move
ground.w = 40;
ground.h = 40;     
ground.color = 'green';
ground.tile = '=';

let coins = new Group();
coins.physics = STATIC;
coins.diameter = 16;
coins.color = 'gold';
coins.tile = 'c';

// ===== LEVEL MAP =====
// '.' is empty space. Each character is one 40 x 40 cell.
// Create every tile group BEFORE calling addTiles.
let level = new Group();
level.addTiles([
  '...c.......c..==........',
  '.....====..........ccc....==',
  '..c.......===................=====',
  '====...======================......',
], -300, 0, 40, 40);  // map, top-left x, top-left y, tile width, tile height

// ===== COINS =====
player.overlaps(coins, collect);

function collect(p, coin) {
  coin.delete();
  score++;
}

// ===== GAME LOGIC: runs before each physics step =====
q5.update = function () {
    // run left and right
    if (kb.pressing('left')) {
        player.vel.x = -4;
    } else if (kb.pressing('right')) {
        player.vel.x = 4;
    } else {
        player.vel.x = 0;
    }

    // jump only when standing on the ground
    let onGround = player.colliding(ground);
    if (kb.presses('up') && onGround) {
        player.vel.y = -7;
    }
}

// ===== DRAWING: runs after physics, 60 times a second =====
q5.draw = function () {
  background('skyblue');
  camera.x = player.x;

  //score on screen
  textSize(24);
  text('Score: ' + score, -380, -190);

  //start level over
  if (player.y > 400){
    player.x = 0;
    player.y = -100;
    player.vel.y = 0;
  }

}
