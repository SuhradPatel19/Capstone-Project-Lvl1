var path, playerBee;
var stone
var honey
var pathImg, pathImg2, mainRacerImg1, mainRacerImg2;
var level = 1

var stoneImage
var honeyImage
var gameOverImg, cycleBell;

var stonesGroup, honeyGroup

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;
var gameOver, restart;

var edges

function preload() {
  pathImg = loadImage("background2.jpg");
  pathImg2 = loadImage("cityback.jpg");
  mainRacerImg1 = loadAnimation("beesprite1.png", "beesprite3.png")

  stoneImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");

  honeyImage = loadImage("honeysprite.png")
}

function setup() {

  createCanvas(1200, 850);
  // Moving background
  path = createSprite(0, 200);
 
  
  
  path.velocityX = -5;

  //creating bee flying
  playerBee = createSprite(70, 750);
  playerBee.addAnimation("bee", mainRacerImg1);
  playerBee.scale = 1.5;

  // //set collider for playerBee


  playerBee.setCollider("rectangle", 0, 0, 40, 40);



  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  stonesGroup = new Group();
  honeyGroup = new Group();

}

function draw() {
  background(0);

  drawSprites();
  textSize(40);
  fill("black");
  textStyle("bold")
  text("Score: " + score, 900, 80);

  if (gameState === PLAY) {

    createStones()
    createHoney()

    if (keyDown("right")) {
      playerBee.x += 10
    }

    if (keyDown("left")) {
      playerBee.x -= 10
    }

    //  playerBee.y = World.mouseY;
    //  playerBee.x = World.mouseX;

    
    if (level===1){
      path.addImage(pathImg);
      path.scale = 4
    }
    else if(level===2){
      path.addImage(pathImg2);
      path.scale = 2
      path.y=310
      path.x=-10
    }

    edges = createEdgeSprites();
    playerBee.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }

    //     //code to play cycle bell sound
    //   if(keyDown("space")) {
    //     cycleBell.play();
    //   }


    if (stonesGroup.isTouching(playerBee)) {
      gameState = END;
      //stone.addAnimation("opponentstone");
    }

    for (var i = 0; i < honeyGroup.length; i++) {
      if (honeyGroup.get(i).isTouching(playerBee)) {
        honeyGroup.get(i).destroy()
        score += 1
      }
    }

    if(score >= 2){
      level = 2
      }





  } else if (gameState === END) {
    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    path.velocityX = 0;
    playerBee.velocityY = 0;
    playerBee.addAnimation("SahilRunning", mainRacerImg2);

    stonesGroup.setVelocityXEach(0);
    stonesGroup.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }

  }

}

function createStones() {
  if (frameCount % 50 === 0) {
    stone = createSprite(Math.round(random(50, 1100)), -30);
    stone.scale = 0.06;
    stone.velocityY = +(8 - 2 * score / 150);
    stone.addImage("opponentstone", stoneImage);
    stonesGroup.add(stone);
    stone.setLifetime = 170;

  }


}
function createHoney() {
  if (frameCount % 50 === 0) {
    honey = createSprite(Math.round(random(50, 1100)), -50);
    honey.scale = 0.2;
    honey.velocityY = +(8 - 2 * score / 150);
    honey.addImage("honeyImage", honeyImage);
    honeyGroup.add(honey);
    honey.setLifetime = 170;

  }
}



function reset() {
  gameState = PLAY;
  gameOver.visible = false;

  stonesGroup.destroyEach();
  honeyGroup.destroyEach();

  score = 0;
}