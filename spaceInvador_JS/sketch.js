// Maor Assayag
// Space Invader game, eat the speed to add to your speed, speak to shot or press the space bar, get your score !

var ship;
var invaders = [] ;
var fire = [];
var totalScore = 0;
var addNewInvaders = false;
var addToSpeed = false;
var special = null;
this.counter = 0;
var addRtoFire = 0;
var img1; // invader1
var img2; // invader2
var img3; // invader3
var imgToSet;
var imgSpaceShip;
var imgFire;
var imgSpeed;
var mySound;
var mic;
var micIsUp = false;

function preload() {
  mySound = loadSound('Laser.wav');
}

function setup() {
    createCanvas(600,470);
    imageMode(CENTER);
    mic = new p5.AudioIn(); // shot by speaking
    mic.start();
    img1 = loadImage("invader.png");
    imageMode(CENTER);
    img2 = loadImage("invader2.png");
    imageMode(CENTER);
    img3 = loadImage("invader3.gif");
    ship = new Ship(); 
    imageMode(CENTER);
    imgSpaceShip = loadImage("spaceship.png");
    imageMode(CENTER);
    imgFire = loadImage("shot.png");
    imageMode(CENTER);
    imgSpeed = loadImage("speed.png");
    for (var i=0; i<7; i++){
      append(invaders, new Invader(i*80+60, 40));
    }
     special = new Special(width/2,0); // add a velocity upgrade option to "EAT"
}


function draw() {
    background(51);
    ship.show();
    image(imgSpaceShip, ship.x, height-40,40,80);
    
    //shot by saying something !
    if (frameCount%10==0 && mic.getLevel()>0.05){
        micIsUp = true;
        keyPressed();
    }
    
    // draw an object that add to your ship velocity
    if (special!=null){
         special.move();
         image(imgSpeed, special.x, special.y,40,40);
    }
     // draw fire to shot
    for (var j=0; j<fire.length; j++){
      //fire[j].show();
      fire[j].move();
      image(imgFire, fire[j].x, fire[j].y,25,90);
    }
    // mechanism of addin a new invader's, delete one.
    for (var i=invaders.length-1; i >=0 ; i--){
      invaders[i].show();
      invaders[i].move();
      if (!invaders[i].imgSet){ // Set the texture of this object
          var j = floor(random(0,3));
          if (j%3==0) {imgToSet=img1;}
          if (j%3==1) {imgToSet=img2;}
          if (j%3==2) {imgToSet=img3;}
          invaders[i].setImg(true,imgToSet); // dont change any more the texture of this object
      }
       image(invaders[i].imgToSet, invaders[i].x, invaders[i].y,70,70);
      // add another raw of invaders
      if (!addNewInvaders && invaders[i].check && invaders[i].travel > 120) {addNewInvaders = true}; 
      if (invaders[i].check && invaders[i].travel > 120 ) {invaders[i].setCheck(false);} 
        
      if (invaders[i].kill==0){ // Fire came near to the ship
          for (var j=0; j<fire.length; j++){
              if (invaders[i]!=null && invaders[i].isDamage(fire[j])){
                  invaders.splice(i,1);
                  fire.splice(j,1);
                  totalScore++;
                  counter++;
              }
          } 
      }
      else{
          totalScore--;
          textSize(18);
          fill('orange');
          text("Ouch! ", 50, height - 20);
          invaders.splice(i,1);
      }
    } 
    // add another raw of invaders
    if (addNewInvaders){
        addNewInvaders = false;
        for (var i=0; i<random(5,7); i++){
            append(invaders, new Invader(i*80+60, 40));
        }
    }
    // check if you eat a addon to your velociity
    if (special!=null && ship.eatSpecial(special)){
        ship.addVelocity(0.25);
        addRtoFire += 0.5;
        special=null;
    }
    if (counter >= 20){
       special = new Special(random(40,width-40),0); // add a velocity upgrade option to "EAT"
       counter = 0;
    }
    // move the ship by the arrows
    if (keyIsDown(RIGHT_ARROW)) {ship.move(1);} 
    else if (keyIsDown(LEFT_ARROW)) {ship.move(-1);} 
    //print score
    textSize(26);
    fill('orange');
    text("Score :" + totalScore, 0, height-5);
}

function keyPressed(){
    if (key === ' ' || micIsUp ){ // shot fire from  the ship
        var newFire = new Fire(ship.x,height - 60);
        newFire.addR(addRtoFire);
        fire.push(newFire);
        mySound.setVolume(0.1);
        mySound.play();
        NotFire = false;
    }
    if (micIsUp) micIsUp=false;
}
