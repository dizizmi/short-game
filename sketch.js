
var gameChar_x;
var gameChar_y;
var floorPos_y;
var gameChar_width;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

//1.declare collectables and canyons array
var collectables;
var canyons;
var clouds;
var mountains;
var trees;


//1. declare scrollPos
var scrollPos;

var gameMode; //1-splash screen 2-game playing 3-game end


//1. declare gameChar_world_x
var gameChar_world_x;
 var game_score;

var flagpole;

var lives;

var platforms;
var onPlatform;

var enemies;
var hitByEnemy;

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
    
    lives = 3;
    startGame();
}
    
function startGame(){  
    //init the game
	gameChar_x = width/8;
	gameChar_y = floorPos_y;
    gameChar_width = 50;
    
    game_score = 0;
    
    isLeft = false;
    isRight = false;
    isFalling = false;
    isPlummeting = false;
    onPlatform = false;
    hitByEnemy = false;
   
    gameMode = 2; // if working on splash screen change to 2
    scrollPos= 0;
    
    gameChar_world_x = gameChar_x;
    
    flagpole = {x_pos: 2000, pole_height:400, flag_width:100, flag_height:50, isReached:false};



    //2. init collectables and canyons array
    
  


    //collectables = [{x_pos:100, y_pos:floorPos_y-30, size: 5, isFound: false}, 
                   // {x_pos:350, y_pos:floorPos_y-100, size: 5, isFound: false},
                // {x_pos:600, y_pos:floorPos_y-50, size: 5, isFound: false},
                   // {x_pos:850, y_pos:floorPos_y-130, size: 5, isFound: false}];
    
    var canyon1 = {x_pos:250, width: 150};
    var canyon2 = {x_pos:800, width: 150};
    canyons = [canyon1, canyon2];



    clouds=[];
    initClouds();

     collectables=[];
    initCollectables();

    //var clouds = [{x_pos:200, y_pos:floorPos_y-252},
                // {x_pos:480, y_pos:floorPos_y-282},
               //  {x_pos:680, y_pos:floorPos_y-262}];

    mountains = {x_pos:1110, y_pos:floorPos_y};

    var tree1 = {x_pos:100, y_pos: floorPos_y-20, width:5, height:20};
    var tree2 = {x_pos: 200, y_pos: floorPos_y-20, width:5, height:20};
    var tree3 = {x_pos:600, y_pos: floorPos_y-20, width:5, height: 20};
    var tree4 = {x_pos: 500, y_pos: floorPos_y-20, width:5, height:20};
    var tree5 = {x_pos: 780, y_pos: floorPos_y-20, width:5, height:20};
    var tree6 = {x_pos: 1000, y_pos: floorPos_y-20, width:5, height:20};
    var tree7 = {x_pos: 1500, y_pos: floorPos_y-20, width:5, height:20};
    var tree8 = {x_pos: 150, y_pos: floorPos_y-60, width:10, height:40}; //bigger tree
    var tree9 = {x_pos: 550, y_pos: floorPos_y-60, width:10, height:40}; //bigger tree
    var tree10 = {x_pos: 1600, y_pos: floorPos_y-60, width:10, height:40};//bigger tree
    var tree11 = {x_pos: -100, y_pos: floorPos_y-60, width:10, height:40};//bigger tree


    trees = [tree1, tree2, tree3, tree4, tree5, tree6, tree7, tree8, tree9, tree10, tree11];


    var p1 = createPlatform(150,floorPos_y-100,75);
    var p2 = createPlatform(280,floorPos_y-200,75);
    var p3 = createPlatform(420,floorPos_y-170,150);
    
    
    platforms = [];
    platforms.push(p1);
    platforms.push(p2);
    platforms.push(p3);

    
    var e1 = new Enemy(400,floorPos_y-10,100);
    var e2 = new Enemy(1200,floorPos_y-10,100);
    
    enemies = [];
    enemies.push(e1);
    enemies.push(e2);
    
}


//splash screen
function draw(){
    if(gameMode ==1){
        splashScreen();
    } else if (gameMode==2) {
        gamePlaying();
    } else{
        gameEnd();
   }
}


function splashScreen(){ //gameMode = 1
    text("This is a splash screen", 50,50);
}

function gameEnd(){ //gameMode = 3
    background(0);
    fill(255,0,0);
    text("This is the end of the game", 50,50);
    
}

function gamePlaying() //gameMode=2
{

	///////////DRAWING CODE//////////

	background(72, 61, 139); //fill the sky blue


	noStroke();
	fill(176,224,230);
    rect(0, floorPos_y, width, height - floorPos_y); //draw some icy ground
    fill(0,191,255);
    rect(0,432,1023,15);
    
    
	//3. push and translate 
    push(); //remember the current origin
    translate(scrollPos,0); //change the origin to (scrollPos,0)
    
    drawCanyons();
    
    drawMountains();
    
    drawClouds();
    animateClouds();
    
    drawTrees();
    
    drawCollectables();
    
    drawFlagpole();
    
    checkFlagpole();
    
    drawPlatforms();
    
    drawEnemies();
    
    //4. pop back the origin
    pop();

    drawLifeTokens();
    
    drawGameScore();
    
    drawGameChar();
    

}

function drawGameChar(){
    

    if (onPlatform && isLeft){
        drawIsLeft();
    }
    else if (onPlatform && isRight){
        drawIsRight();  
    }
	//the game character
	if(isLeft && isFalling)
	{
		// add your jumping-left code
        drawIsLeftAndIsFalling();
	}
	else if(isRight && isFalling)
	{
		// add your jumping-right code
        drawIsRightAndIsFalling();
	}
	else if(isLeft)
	{
		// add your walking left code
        drawIsLeft();
	}
	else if(isRight)
	{
		// add your walking right code
        drawIsRight();
        
	}
    else if(onPlatform){
        drawStandingFront();
    }
	else if(isFalling || isPlummeting)
	{
		// add your jumping facing forwards code
        drawIsFallingOrIsPlummeting();
	}
	else
	{
		// add your standing front facing code
        drawStandingFront();
	}
    

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here
    
    
    var isGameOver = checkIsGameOver();
    if (isGameOver==true){
        drawGameOver();
         return;
        
    }
    
    if(hitByEnemy){
        if(lives>0){
            startGame();
        }
        return;
    }
    
    if (isPlummeting== true){
        gameChar_y+= 1;
        
        if (gameChar_y+10>height){
            checkPlayerDie();
          return;//exit function   
        }
        
    }
    if (gameChar_y < floorPos_y) {
        //gameChar_y += 1;
        isFalling = true;
    } else {
        isFalling = false;
    }
    
    //logic to make character move left and right
    if (isLeft == true)
    {
        //if gameChar is within the original frame 
        if(gameChar_x > width*0.2){ //20% to right and left
            gameChar_x -= 5;
        } else { //translate drawing to the right, get effect moving to the left
            scrollPos +=5;
        }
    }
    if(isRight == true)
    { 
        //if game char is within original frame
        if(gameChar_x < width*0.8) {
        gameChar_x +=5;
        }
     else { //translate drawing towards the left
        //get the effect of moving to the left
        scrollPos -=5;
        }
    }

// 3. Update gameChar_world_x
//update real position of gameChar for collision detection
   gameChar_world_x = gameChar_x - scrollPos;
    
     checkIfGameCharIsOnAnyPlatforms();
     //check if game character is in the range of any of the collectables
    checkIfGameCharInCollectablesRange();
     
    checkIfGameCharIsOnAnyPlatforms();//check if game character is on any of the platforms
     //check if game character is over any of the canyons
    checkIfGameCharIsOverCanyons();
    
    checkIfGameCharInContactWithEnemies();
    

}

function initCollectables(){
    var total_collectables = 100;
    while(collectables.length<total_collectables){
    var x = random(-2000,2000);
    var c = {x_pos:x, y_pos:floorPos_y, size:40, isFound: false}
   
    if(isCollectableOnCanyon(c)==false){
        collectables.push(c);
    }
    
        
    
    console.log(collectables.length);
}
    
}
//return true if Collectable is on a canyon, else false
function isCollectableOnCanyon(t_c){
    var onCanyon = false;
    
    for (i in canyons){
        var canyon = canyons[i];
        var x1_limit = canyon.x_pos - t_c.size;
        var x2_limit = canyon.x_pos + canyon.width;
        if (t_c.x_pos>x1_limit && t_c.x_pos<x2_limit){
            onCanyon = true;
            break;
        }
    }
    return onCanyon;
}


   function initClouds(){
        
        for(var i=0;i<10;i++){
        var x = random(1, width-10);
        var y = random(20,200);   
        var w = random(40,70);
        var s = random(0.5,1.5);
        var cloud = {x_pos:x, y_pos:y, width: w, speed: s};
        clouds.push(cloud);
    }
}

function animateClouds(){
    
    for(i in clouds){
        var cloud = clouds[i];
        cloud.x_pos +=cloud.speed;
        
        if(cloud.x_pos>width+100){
            cloud.x_pos=-100;
        }
    }
}
 

function checkIfGameCharInContactWithEnemies(){
    if(checkIsGameOver()){
        return;
    }
    
    for(i in enemies){
        var enemy = enemies[i];
        var isContact = enemy.checkContact(gameChar_world_x,gameChar_y);
        if(isContact){
            hitByEnemy = true;
            lives--;
            break;
        }
    }
    
    
}


function checkIfGameCharIsOnAnyPlatforms(){
    
    if(isFalling){
        var isContact = false;
        for(i in platforms){
            var platform = platforms[i];
            onPlatform = false;
            isContact = platform.checkContact(gameChar_world_x, gameChar_y);
            if(isContact==true){
                onPlatform = true;
                break;
                
            }
        }
        
        if(isContact==false){
            gameChar_y += 1;
        }
    }
}
function checkIfGameCharIsOverCanyons(){
     for (var i=0; i<canyons.length; i++){
         var canyon = canyons[i];
         checkIfGameCharIsOverCanyon(canyon);
     }
}


function checkIfGameCharIsOverCanyon(canyon){
    //condition if game char is on the floor
    var cond1 = gameChar_y == floorPos_y;
    //if game char left of canyon
    var cond2 = gameChar_world_x - gameChar_width/2 > (canyon.x_pos);
    //if game char is right of canyon
    var cond3 = gameChar_world_x + gameChar_width/2 < (canyon.x_pos + canyon.width);
    
    //if game char is over canyon
    if (cond1==true && cond2==true && cond3==true){
        isPlummeting = true;
        lives--;
    }
}


function drawCanyons() {
    for (var i=0; i< canyons.length; i++){
        var canyon =  canyons[i];
        drawCanyon(canyon);
    }
}
function drawCanyon(canyon){
    fill(0,191,225);
    rect(canyon.x_pos, floorPos_y, canyon.width, height-floorPos_y);
    fill(0,130,180);
    strokeWeight(3);
    beginShape(LINES);
    vertex(canyon.x_pos+14,floorPos_y);
    
    fill(72,61,139);
    rect(canyon.x_pos+30, floorPos_y, canyon.width-60, height-floorPos_y);
    
    noStroke();
    fill(255);
    
}

function checkIfGameCharInCollectablesRange() {
    for (var i=0; i< collectables.length; i++) {
        var collectable = collectables[i];
        if (collectable.isFound == false){
            checkIfGameCharInCollectableRange(collectable);
        }
    }
}

function checkIfGameCharInCollectableRange(collectable){
    var d = dist(gameChar_world_x, gameChar_y, collectable.x_pos, collectable.y_pos);
    if (d<30){
        collectable.isFound = true;
        game_score++;
    }
}

function drawCollectables(){
    for(var i=0; i<collectables.length; i++){
        if(collectables[i].isFound==false){
            drawCollectable(collectables[i]);
        }
       // var collectable = collectables[i];
      //  drawCollectable(collectable);
        
    }
}

function drawCollectable(collectable){
    if(collectable.isFound == false) {
        fill(255,192,203);
        ellipse(collectable.x_pos, collectable.y_pos, 40, 40);
        ellipse(collectable.x_pos, collectable.y_pos);
        ellipse(collectable.x_pos, collectable.y_pos);
        ellipse(collectable.x_pos, collectable.y_pos);
        
    }
}

function drawClouds() {
    for (var i=0; i<clouds.length; i++){
        var cloud = clouds[i];
        drawCloud(cloud); 
    }
}

function drawCloud(cloud){
  // fill(218,112,214);
    fill(221,160,221,250);//plum
  
    ellipse(cloud.x_pos, cloud.y_pos,80, 80); //for 1 cloud aesthetics
    ellipse(cloud.x_pos-40, cloud.y_pos-30,60,60);
    ellipse(cloud.x_pos+40, cloud.y_pos-30,60,60);

    
};

function drawMountains(){
  fill(240,248,255);
    triangle(
    mountains.x_pos,
    mountains.y_pos,
    mountains.x_pos+150,
    mountains.y_pos-235,
    mountains.x_pos+450,
    mountains.y_pos);

fill(245, 245, 245, 150); //shadow moutains
 triangle(
     mountains.x_pos,
     mountains.y_pos,
     mountains.x_pos+40,
     mountains.y_pos+70,
     mountains.x_pos+450,
     mountains.y_pos
 );

}

function drawTrees() {
    for (var i=0; i< trees.length; i++){
        var tree = trees[i];
        drawTree(tree); 
    }
}

function drawTree(tree) {
    fill(205, 92, 92);
    rect(tree.x_pos, tree.y_pos, tree.width, floorPos_y-tree.y_pos);
    
    fill(26, 93, 31);
    ellipse(tree.x_pos, tree.y_pos-20, tree.width*10, tree.height*3);

    
    fill(230, 230, 250);
    arc(tree.x_pos +2.5, tree.y_pos-20, tree.width*10, tree.height*3, -HALF_PI, HALF_PI);
}

function drawGameScore(){
    fill(0);
    textSize(30);
    text("Score: "+game_score,20,40);
}

function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range =  range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX>this.x + this.range){
            this.inc = -1;
        } else if(this.currentX<this.x) {
            this.inc = 1;
        }               
    } 
    
  this.draw = function(){ //draw enemies
      this.update();
      fill(255,0,0);
      ellipse(this.currentX,this.y, 20,20);
  }     
  
  this.checkContact =  function(gc_x,gc_y){
      var d = dist(this.currentX,this.y,gc_x,gc_y);
      if (d<20){
          return true;
      }else{
          return false;
      }
  }
}


function drawEnemies(){
    for (i in enemies){
        var enemy =  enemies[i];
        enemy.draw();
    }
}

function createPlatform(x,y,length){
    var p = {
        x:x,
        y:y,
        length:length,
        draw: function(){
            fill(135,206,250);
            rect(this.x-3,this.y-2,this.length,16);
            fill(25,25,112);
            rect(this.x,this.y,this.length,15);
            
        },
        checkContact: function(gc_x, gc_y){
            var c1 =  gc_x+20>this.x;
            var c2 = gc_x<this.x+20+this.length;
            if (c1 && c2){ //checking if y axis in on platform
                var d = this.y - gc_y;
                if (d>=0 && d<1){
                    return true;
                }
            } 
           return false;
        }
    } 
    return p;
}


function drawPlatforms(){
    for (i in platforms){
        var platform =  platforms[i];
        platform.draw();
    }
}


function drawGameOver(){
    fill(0);
    textSize(100);
    if(lives>0){
        text("You Win!",300,height/2);
    }else{
        text("You Lost!",300,height/2);
    }
}

function drawLifeTokens(){
    fill(170,0,0);
    for(var i=0; i<lives;i++){
        rect(40*i+900,10,30,30);
        
    }
}

function checkIsGameOver(){
    var gameOver = false;
    
    if (flagpole.isReached || lives<1){
        gameOver = true;
    }
    return gameOver;
}


function checkPlayerDie(){
    //
    if(gameChar_y>height || hitByEnemy){
        if(lives>0){
            startGame();
        }else{
            gameEnd();
        }
    }
    
}
function drawFlagpole(){
    fill(125);
    rect(flagpole.x_pos, floorPos_y-flagpole.pole_height,30,flagpole.pole_height);
    fill(255,215,0);
  
    
    if(flagpole.isReached){
        rect(flagpole.x_pos, 
        floorPos_y-flagpole.pole_height,
        flagpole.flag_width,
        flagpole.flag_height);
    }else{
         rect(flagpole.x_pos,
        floorPos_y-flagpole.flag_height,
        flagpole.flag_width, 
        flagpole.flag_height);
    }
}

function checkFlagpole(){
    if (flagpole.isReached==false){
        var d = dist(gameChar_world_x, gameChar_y, flagpole.x_pos, floorPos_y);
        if (d<10){
            flagpole.isReached=true;
        }
    }
}
function keyPressed()
{   
     var isGameOver = checkIsGameOver();
    if (isGameOver ==true){
        return;
    }
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
    //37 based on unicode
    if (keyCode == 37) { //turn left
        isLeft = true;
    }
    
    else if(keyCode == 39){ //turn right
        isRight = true;
    }
    else if (keyCode == 38){ //up arrow
        //ensure the character only jump when it is touching the ground or when its on platform
        if (gameChar_y >= floorPos_y || onPlatform) {
            gameChar_y -= 150;
        } 
        
    } 
    else if (keyCode == 32){
        if (gameMode ==1) {
            gameMode = 2;
        }
    }
}

function keyReleased()
{
    
    var isGameOver = checkIsGameOver();
    if(isGameOver==true){
        return;
    }
    
    
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
    
     if (keyCode == 37) { //turn left
        isLeft = false;
    }
    
    else if(keyCode == 39){ //turn right
        isRight = false;
    }
}

function drawIsLeftAndIsFalling()
{
    fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x-9, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x-6, gameChar_y-50,25)
    
    fill(0);
    rect(gameChar_x-8,gameChar_y-20,5,10); //left leg
    rect(gameChar_x-1,gameChar_y-15,5,10);
    
    fill(0,5,240);
    rect(gameChar_x-10,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x-13, gameChar_y-40, 5,10);
    
    fill(0);
    ellipse(gameChar_x-14, gameChar_y-52,3); //right eye
}

function drawIsRightAndIsFalling()
{
    fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x+5, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x+10, gameChar_y-51,25)
    
    fill(0);
    rect(gameChar_x+10,gameChar_y-15,5,10); //left leg
    rect(gameChar_x+3,gameChar_y-20,5,10);
    
    fill(0,5,240);
    rect(gameChar_x-2,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x+15, gameChar_y-40, 5,10);
    
    fill(0);
    ellipse(gameChar_x+15, gameChar_y-52,3); //right eye

}

function drawIsLeft()
{
   fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x-9, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x-6, gameChar_y-50,25)
    
    fill(0);
    rect(gameChar_x-8,gameChar_y-25,5,25); //left leg
    rect(gameChar_x-1,gameChar_y-25,5,25);
    
    fill(0,5,240);
    rect(gameChar_x-10,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x-13, gameChar_y-40, 5,10);
    
    fill(0);
    ellipse(gameChar_x-14, gameChar_y-52,3); //right eye

    //fill(0,255 ,0);
   // ellipse(gameChar_x-5,gameChar_y-60,20,20);
    //fill(128,0,0);
    //rect(gameChar_x-25 ,gameChar_y-50,30,50);
}

function drawIsRight()
{
    fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x+5, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x+10, gameChar_y-51,25)
    
    fill(0);
    rect(gameChar_x+10,gameChar_y-25,5,25); //left leg
    rect(gameChar_x+3,gameChar_y-25,5,25);
    
    fill(0,5,240);
    rect(gameChar_x-2,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x+15, gameChar_y-40, 5,10);
    
    fill(0);
    ellipse(gameChar_x+15, gameChar_y-52,3); //right eye
    
    //fill(0,255 ,0);
    //ellipse(gameChar_x+5,gameChar_y-60,20,20);
   // fill(128,0,0);
   // rect(gameChar_x-15 ,gameChar_y-50,30,50);
}

function drawIsFallingOrIsPlummeting()
{
    
    
     fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x-5, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x, gameChar_y-45,25);
    
  fill(0);
    rect(gameChar_x-7,gameChar_y-18,5,10); //left leg
    rect(gameChar_x+2,gameChar_y-15,5,10);
    
    fill(0,5,240);
    rect(gameChar_x-9,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x, gameChar_y-40, 5,10);

    fill(0);
    ellipse(gameChar_x-5, gameChar_y-50,3); //eyes
    
    fill(0);
    ellipse(gameChar_x+5, gameChar_y-50,3); //right eye
    
    //fill(0,255 ,0);
    //ellipse(gameChar_x,gameChar_y-70,20,20);
    //fill(128,0,0);
    //rect(gameChar_x-25 ,gameChar_y-60,40,40);
}

function drawStandingFront()
{
    
    fill(0); //hair
    ellipse(gameChar_x, gameChar_y-52, 35);
    
    fill(255,218,185) //neck
    rect(gameChar_x-5, gameChar_y-40,10,5);
    
    fill(255,218,185); //head
    ellipse(gameChar_x, gameChar_y-45,25);
    
    fill(0);
    rect(gameChar_x-7,gameChar_y-25,5,25); //left leg
    rect(gameChar_x+2,gameChar_y-25,5,25);
    
  
    fill(0,5,240);
    rect(gameChar_x-9,gameChar_y-35,18,20); //top
    
    fill(255,255,255); //mouth
    ellipse(gameChar_x, gameChar_y-40, 5,10);

    fill(0);
    ellipse(gameChar_x-5, gameChar_y-50,3); //eyes
    
    fill(0);
    ellipse(gameChar_x+5, gameChar_y-50,3); //right eye
   // fill(0,255 ,0);
    //ellipse(gameChar_x-5,gameChar_y-60,20,20);
    //fill(128,0,0);
    //rect(gameChar_x-25 ,gameChar_y-50,40,50);
 } 

