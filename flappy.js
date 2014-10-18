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
var pipes;

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

    game.physics.startSystem(Phaser.Physics.ARCADE);


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


    pipes = game.add.group();

    score = 0;
    var x = 100;
    var y = 200;
    player = game.add.sprite(100, 100, "playerImg");

    player.x = 60;
    player.y = 200;
    game.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    player.body.velocity.y = -150;
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;

    label_score =game.add.text(20, 20, "0", {font:"30px Arial", fill: "#ffffff"})

    game.time.events.loop(1.75 * Phaser.Timer.SECOND, generatePipe);
}

function addPipePart(x,y,pipe_part){
    var pipe = pipes.create(x,y,pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generatePipe(){

        var hole = Math.floor(Math.random()*5)+1;
        for (var count = 0; count <= 7; count++) {

            if (count == hole || count == hole + 1 || count == hole + 2 )
            {

            }
            else
            {
                var y = 50 * count;
                addPipePart(900,y,"pipe");
            }

        }
        score++;
        label_score.setText(score);
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update()
{
    game.physics.arcade.overlap(player,pipes,gameOver);
}


 function clickHandler (mouse) {
    score = score +1;
     player.x = mouse.x;
     player.y = mouse.y;
 }

function gameOver() {
    alert("game over. you scored " + score);
    location.reload();
}
function spaceHandler() {
        game.sound.play("score");

    player.body.velocity.y = -200;

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