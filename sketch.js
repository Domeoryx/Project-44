 var fishie, tubes1, tubes, tube1Image, tube2Image, fishieImage, ground, groundImage;
 var score=0;
 var clouds, cloudsImage, cloudsGroup;
 var coins;
var tubesGroup, tubesGroup1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage, restartImage
var backgroundImage;

function preload(){
 fishieImage= loadImage("plane.png");
  groundImage= loadImage("ground2.png");
  tube1Image= loadImage("tube.png");
  tube2Image= loadImage("tube2.png");
  backgroundImage= loadImage("backgroundImg.png");
  gameOverImage= loadImage("gameOver.gif");
  restartImage= loadImage("restart.png");
  cloudsImage= loadImage("cloud.png");
}


function setup() {
  createCanvas(500,400);

    
    fishie= createSprite(100,200,20,20);
    fishie.addImage(fishieImage);
    fishie.scale=0.5;
  
    ground =createSprite(400,400,800,20);
    ground.addImage(groundImage);
    ground.velocityX=-4;
   ground.x = ground.width /2;

   gameOver = createSprite(275,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  
  restart = createSprite(275,250);
  restart.addImage(restartImage);
  restart.scale=0.2;


   tubesGroup= new Group();
   tubesGroup1 = new Group();
   cloudsGroup= new Group();
}

function draw() {
  background(backgroundImage);
 fill("black");
 textSize(20);
  text("score: "+ score, 20, 20);
  
  
   
   
    if (gameState===PLAY){
      if(fishie.isTouching(cloudsGroup)){
        score= score+20;
      }
      //score = score + Math.round(getFrameRate()/60);
     // ground.velocityX = -(6 + 3*score/100);
      gameOver.visible= false;
      restart.visible=false;
    
      if(keyDown(UP_ARROW)){
        fishie.velocityY= -10;
      }
    
      fishie.velocityY= fishie.velocityY+0.5;
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
      //fishie.collide(tubesGroup);
      fishie.collide(ground);
      spawnUpTubes();
      spawnDownTubes();
      spawnClouds();
    
      if(fishie.isTouching(tubesGroup)||fishie.isTouching(tubesGroup1)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      fishie.velocityY = 0;
      tubesGroup.setVelocityXEach(0);
      tubesGroup1.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
     // cloudsGroup.setVelocityXEach(0);
      
      //change the trex animation
      
      
      //set lifetime of the game objects so that they are never destroyed
     tubesGroup.setLifetimeEach(-1);
     tubesGroup1.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
    

  drawSprites();
  
  
 
 
}
function spawnUpTubes() {
  
    if (frameCount % 80 === 0){
      tubes1 = createSprite(500,45,500,280);
      //tubes.y = Math.round(random(250,200));
      tubes1.addImage(tube2Image);
      tubes1.scale=0.4;
      tubes1.velocityX= -4;
      tubes1.lifetime= 200;
      tubesGroup1.add(tubes1)
      
       }
       


    
   
  }
function spawnDownTubes() {
  
    if (frameCount % 80 === 0){
      tubes = createSprite(500,350,600,580);
      //tubes.y = Math.round(random(250,300));
      tubes.addImage(tube1Image);
      tubes.scale=0.4;
      tubes.velocityX= -4;
      tubes.lifetime= 200;
      tubesGroup.add(tubes)
      
       }
    
   
  }
  function spawnClouds() {
  
    if (frameCount % 60 === 0){
      clouds = createSprite(500,200,600,580);
     clouds.y = Math.round(random(50,350));
      clouds.addImage(cloudsImage);
      clouds.scale=0.3;
      clouds.velocityX= -4;
      clouds.lifetime= 200;
      cloudsGroup.add(clouds)
      tubesGroup1.depth = clouds.depth
      tubesGroup1.depth = tubesGroup1.depth + 1
      tubesGroup.depth  = clouds.depth
      tubesGroup.depth = tubesGroup.depth+1
      restart.depth = clouds.depth
      restart.depth = restart.depth+1
      gameOver.depth = clouds.depth
      gameOver.depth = gameOver.depth+1
      fishie.depth = clouds.depth
      fishie.depth = fishie.depth+1
      
      
       }
       
       
    
   
  }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
 tubesGroup.destroyEach();
 tubesGroup1.destroyEach();
 cloudsGroup.destroyEach();
 // cloudsGroup.destroyEach();
  
  score = 0;
  
}