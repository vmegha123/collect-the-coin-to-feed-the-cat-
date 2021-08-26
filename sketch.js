var cat,cat_running,cat_collided;
var ground,ground_image;
var coin,coin_image,coGroup,coinsoun
var obstacle1,obstacle2,obstacle3,obGroup;
var score=0;
var coin=0;
var lives=3;
var PLAY=0
var END=1
var SERVE=2
var Gamestate=PLAY
var gameover,gameoverimg,gameoversound
var restart,restartimg,restartsound
var won,win
var playi,playimg,playsound


function preload(){
cat_running=loadAnimation("1.png","2.png","3.png","4.png","5.png");
cat_collided=loadAnimation("1.png")
ground_image=loadImage("download (2).jfif")
coin_image=loadImage("images (2).jfif")
obstacle1=loadImage("obstacle1.png")
obstacle3=loadImage("obstacle3.png")
obstacle2=loadImage("obstacle2.png")
gameoverimg=loadImage("download (3).jfif")
restartimg=loadImage("images (3).jfif")
win=loadImage("download (1).png")
playimg=loadImage("images.png")
coinsoun=loadSound("mixkit-arcade-game-jump-coin-216.wav")
gameoversound=loadSound("mixkit-arcade-space-shooter-dead-notification-272.wav")
restartsound=loadSound("Recording (2)-[AudioTrimmer.com].m4a")
playsound=loadSound("mixkit-unlock-game-notification-253.wav")

}

function setup() {
createCanvas(500,200)

cat=createSprite(55,130,20,20);
cat.addAnimation("running",cat_running)
cat.addAnimation("collided",cat_collided)
cat.scale=0.5
  
ground=createSprite(245,200,600,30); ground.addImage(ground_image)
ground.scale=2
ground.velocityX=-4
  
gameover=createSprite(225,60,20,20)
gameover.addImage(gameoverimg)
gameover.scale=0.2
  
restart=createSprite(225,120,20,20)
restart.addImage(restartimg)
restart.scale=0.2

won=createSprite(225,80,30,30)
won.addImage(win)
won.scale=0.5
  
playi=createSprite(225,160,20,20)
playi.addImage(playimg)
playi.scale=0.2
  
obGroup=new Group();
coGroup=new Group();
}

function draw() {
 background("white");
 // cat.debug=true  
textSize(20)
text("score:"+score,10,20)
text("lives:"+lives,200,20)
text("coins:"+coin,400,20)
  
  if(Gamestate===PLAY){
 
  score=score+Math.round(getFrameRate()/60);
     
    
  if(keyDown("space")&& cat.y >=120){
    cat.velocityY=-12 
  }
  cat.velocityY = cat.velocityY + 0.8
    
  if(obGroup.isTouching(cat)){
    Gamestate= END
    lives=lives-1
    gameoversound.play();
  }
    
   if(coGroup.isTouching(cat)){
     coin = coin+1
     coGroup[0].destroy()
     coinsoun.play();
   }
    
  if(ground.x<220){
    ground.x=ground.width  
  }
    
   if(lives===0){
   Gamestate=SERVE;
  }
  
    Coin();
  Obstacle();
    
    restart.visible=false;
    gameover.visible=false;
    won.visible=false;
    playi.visible=false
  }

  else if (Gamestate===END){
  restart.visible=true  
  gameover.visible=true
    
  cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(restart)){
    reset();
    restartsound.play();
   }
  }
  
  else if(Gamestate===SERVE){
    won.visible=true
    playi.visible=true
    cat.changeAnimation("collided",cat_collided)
  obGroup.setVelocityXEach(0)
  coGroup.setVelocityXEach(0)
  ground.velocityX=0  
  obGroup.setLifetimeEach(-1);
  coGroup.setLifetimeEach(-1);
    
  if(mousePressedOver(playi)){
    winning();
    playsound.play();
  }
    
  }
  
cat.collide(ground)
cat.setCollider("rectangle",0,0,cat.width,cat.height) 
  
  
 drawSprites();
}

function Coin() {
if(frameCount % 80 ===0) {
 var coins=createSprite(400,150,20,20) 
 coins.y=Math.round(random(80,150))
 coins.addImage(coin_image)
  coins.scale=0.1
  coins.velocityX=-3
  coins.lifetime=200
  coGroup.add(coins)
}
}


function Obstacle(){
if(frameCount%60===0){
   var obstacles = createSprite(400,145,10,40); 
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacles.addImage(obstacle2);
              break;
      case 2: obstacles.addImage(obstacle1);
              break;
      case 3: obstacles.addImage(obstacle3);
              break;
}
  obstacles.velocityX=-6
  obstacles.scale=0.2
  obstacles.lifetime=300
  obGroup.add(obstacles);
}
}

function reset(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  cat.changeAnimation("running",cat_running);
  ground.velocityX=-4
} 

function winning(){
  Gamestate=PLAY
  gameover.visible=false
  restart.visible=false
  obGroup.destroyEach();
  coGroup.destroyEach();
  score=0
  coin=0
  lives=3
  cat.changeAnimation("running",cat_running);
  ground.velocityX=-4
}
