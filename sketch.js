var background1, backgroundImg
var balloon, balloonImg

var obstacle

var obstacleBottom1, obstacleBottom2, obstacleBottom3
var obstacleTop1, obstacleTop2

var rand

var restart, restartImg
var gameOver, gameOverImg

var bottomGround, topGround

var bottomObstacle

var score = 0; 

var PLAY = 1;

var END = 0;

var gameState = PLAY; 

var topObstacleGroup, bottomObstacleGroup;

function preload(){

backgroundImg = loadImage("assets/bg.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obstacleBottom1 = loadImage("assets/obsBottom1.png")
obstacleBottom2 = loadImage("assets/obsBottom2.png")
obstacleBottom3 = loadImage("assets/obsBottom3.png")

obstacleTop1 = loadImage("assets/obsTop1.png")
obstacleTop2 = loadImage("assets/obsTop2.png")

restartImg = loadImage("assets/restart.png")
gameOver = loadImage("assets/gameOver.png")

}

function setup(){

createCanvas(400,400)

background1 = createSprite(165,485,1,1);
background1.addImage(backgroundImg);
background1.scale = 1.3

balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

bottomGround = createSprite(200,390,800,20)
bottomGround.visible = false

topGround = createSprite(200,10,800,20)
topGround.visible = false

gameOver = createSprite(200,200)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.3
gameOver.visible = false

restart = createSprite(220,220)
restart.addImage(restartImg)
restart.scale = 0.3
restart.visible = false

topObstacleGroup = new Group();
bottomObstacleGroup = new Group();
barGroup = new Group();
}

function draw() {
  
  background("black");
        
          if(gameState === PLAY) {
             
    
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            
          }

          
           balloon.velocityY = balloon.velocityY + 2;
   

          spawnObstacles()
          
          spawnObstaclesBottom()

          bar()
        
          if(topObstacleGroup.isTouching(balloon) || bottomObstacleGroup.isTouching(balloon)
          || balloon.isTouching(bottomGround) || balloon.isTouching(topGround)) {
            gameState=END
          }
        }
          
          if(gameState===END) {
            gameOver.visible=true
            restart.visible=true
            balloon.velocityX=0
            balloon.velocityY=0
            bottomObstacleGroup.SetVelocityXEach(0)
            topObstacleGroup.SetVelocityXEach(0)
            topObstacleGroup.SetLifetimeEach(-1)
            bottomObstacleGroup.SetLifetimeEach(-1)
            balloon.y=200

            if(mousePressedOver(restart)) {
             reset()
            }
          }

        

        drawSprites();
        
}

function spawnObstacles() {

  if (frameCount % 60 === 0) {
    
    var obstacle = createSprite(400,50,40,50)
    obstacle.velocityX = -2;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    var rand = Math.round(random(1,2))
    switch(rand) {

      case 1: obstacle.addImage(obstacleTop1)
              break;
      case 2: obstacle.addImage(obstacleTop2) 
              break;   

     default: break;
     
     topObstacleGroup.add(obstacle);
     
    }
      
    

  }


}

function spawnObstaclesBottom() {

  if (frameCount % 60 === 0) {
    
    var bottomObstacle = createSprite(400,350,40,50)
    bottomObstacle.velocityX = -2;
    bottomObstacle.scale = 0.1;
    bottomObstacle.lifetime = 300;

    var rand = Math.round(random(1,3))
    switch(rand) {

      case 1: bottomObstacle.addImage(obstacleBottom1)
              break;
      case 2: bottomObstacle.addImage(obstacleBottom2) 
              break;   
      case 3: bottomObstacle.addImage(obstacleBottom3)
              break;


     default: break;


    }
      
    bottomObstacleGroup.add(bottomObstacle)

    

  }

}

function bar() {
  if (frameCount % 60 === 0) {
    
    var bar = createSprite(400,200,10,800)
    bar.velocityX = -6;
    bar.visible = false;
    bar.lifetime = 300;

    barGroup.add(bar)
}

}

function reset() {
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false

  topObstacleGroup.destroyEach()
  bottomObstacleGroup.destroyEach()

  score = 0
}

function score() {
  if(balloon.isTouching(barGroup)) {
    score=score+1
  }

  textSize(30)
  text("Score="+Score,250,50)
}