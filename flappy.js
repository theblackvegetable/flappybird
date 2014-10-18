// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);
var score;
var player;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.stage.setBackgroundColor("#9999FF");
    game.add.text(300,200, "Flappy Bird ",
    {font: "30px Arial",
    fill: "#FFFFFF"});
    game.load.image("playerImg","assets/flappy-cropped.png");
    game.load.audio("score","assets/point.ogg");
    game.load.image("pipe","assets/pipe2-body.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene



    game.input.onDown.add(clickHandler);
    var kb = game.input.keyboard;
    kb.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    kb.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    kb.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    kb.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    kb.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.add.sound("score");

   // var hole = Math.floor(Math.random()*5)+1;
    for (var count2 = 0; count2 <= 5; count2++) {
        var hole = Math.floor(Math.random()*5)+1;
        for (var count = 0; count <= 7; count++) {

          if (count == hole || count == hole + 1)
          {

          }
          else
          {
              var y = 50 * count;
              game.add.sprite(100 * count2, y, "pipe");
          }

        }


        //for (var count = 6; count <= 7; count++) {
           // var x = 50 * count;
         //   game.add.sprite(100 * count2, x, "pipe");
       // }
    }

    score = 0;
    var x = 100;
    var y = 200;
    player = game.add.sprite(100,100,"playerImg");

    player.x = 300;

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update()
{}


 function clickHandler (mouse) {
     //game.add.sprite(event.x, event.y, "playerImg");
    score = score +1;
    // alert(score);
     player.x = mouse.x;
     player.y = mouse.y;
 }


function spaceHandler() {
        game.sound.play("score");

}
function moveLeft() {
    player.x -= 10;
}0
function moveRight () {
    player.x +=10;
}
function moveUp() {
    player.y -=10;
}
function moveDown (){
    player.y +=10;
}