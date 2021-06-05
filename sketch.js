//create the ball, playerPaddle and computerPaddle as sprite objects

var ball, playerPaddle, computerPaddle, gameState, compScore, playerScore, edges, lives, topborder, bottomborder

function setup() {

  createCanvas(400, 400);
  // canvas.style = " width: 50%; ";

  ball = createSprite(200, 200, 10, 10);
  playerPaddle = createSprite(380, 200, 10, 70);
  computerPaddle = createSprite(10, 200, 10, 70);
  topborder = createSprite(0, 1, 800, 10);
  topborder = createSprite(0, 400, 800, 10)

  playerPaddle.shapeColor = color("red");
  computerPaddle.shapeColor = color("blue");

  ball.draw = function () { ellipse(0, 0, 15, 15) }
  fill("yellow");

  //variable to store different state of game
  gameState = "serve";

  lives = 5;

}

function draw() {

  background("black");

  //place info text in the center
  if (gameState === "serve") {
    textSize(20);
    stroke("white")
    text("Press Space to Serve", 110, 180);
  }
  textSize(20);
  text("Lives: " + lives, 270, 30);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;

  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;

  //draw line at the centre
  for (var i = 0; i < 400; i += 20) {
    line(200, i, 200, i + 10);
    stroke("white");
  }

  //create edge boundaries

  edges = createEdgeSprites();

  //make the ball bounce with the top and the bottom edges

  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);

  //serve the ball when space is pressed
  if (keyDown("space") && gameState === "serve") {
    serve();
    gameState = "play";
  }

  //reset the ball to the centre if it crosses the screen
  if (ball.x > 400) {

    lives = lives - 1;

    reset();

    gameState = "serve";
  }

  if (lives === 0) {
    gameState = "over";
    text("Game Over!", 170, 160);
    text("Press 'R' to Restart", 150, 180);
  }

  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    lives = 5;
  }

  drawSprites();
}

function serve() {
  ball.velocityX = 10;
  ball.velocityY = 6
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
