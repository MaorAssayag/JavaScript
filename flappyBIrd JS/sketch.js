//Maor Assayag
// flappy bird game, tap TAB to voice control the jump of the bird!

var bird;
var pipes = [];
var score = 0;
var mic;
var isUp=false;
var byVoice = false;
var pause = true;
var birdImg;
var backImg;
var font;
var mySound;
var die;
var pointSound;
var imgLogo;
var notStartYet = true;
var highScore = 0;


function preload() {
    mySound = loadSound('lift.wav');
    die = loadSound('die.wav');
    pointSound = loadSound('point.wav');
}

function setup(){
    createCanvas(700,384);
    mic = new p5.AudioIn();
    mic.start();
    bird = new Bird();
    pipes.push(new Pipe());
    imageMode(CENTER);
    birdImg = loadImage("bird.gif");
    backImg = loadImage("back.png");
    font = loadFont('04B_19__.TTF');
    imgLogo = loadImage("logo.png");
}

function draw(){
    background(55); 
    image(backImg, width/2, height/2,width, height);
    if (!pause){
        var vol = mic.getLevel();
        if (byVoice && vol>0.15 && frameCount%10==0){
            isUp=true;
            keyPressed();
        }
        //
        if (frameCount % 80 == 0){
            pipes.push(new Pipe());
        }
        //
        for (var i = pipes.length - 1; i >= 0 ; i--){
            pipes[i].update();
            pipes[i].show();
            if (pipes[i].offscreen()){
                pipes.splice(i,1);
            }
            var hit = pipes[i].hits(bird);
            if (hit){
                pause = true;
                die.setVolume(0.1);
                die.play();
            }else if (!pipes[i].hit && pipes[i].pass(bird) && frameCount%30==0){ 
                score++;
                if (score > highScore){highScore = score;}
                pointSound.setVolume(0.1);
                pointSound.play();
            }
        }
        bird.update();
        bird.show(birdImg);
        
        //
        fill('white');
        textFont(font);
        textSize(26);
        textAlign(CENTER);
        text("Score : "+score, 60 , height -2);
        fill(0,100,random(255));
        text("High : " + highScore +" ", 220, height -2);
    }
    else {
        image(backImg, width/2, height/2,width, height);
        image(imgLogo, width/2, height/2 - 150,230, 50);
        fill('white');
        noStroke();
        textSize(36);
        textFont(font);
        textAlign(CENTER);
        if (!notStartYet){text("Your score is  : " + score +" ", width/2, height/2 -40);}
        if (notStartYet){text("Press SpaceBar to start ",width/2 , height/2 + 40);}
        else {text("Press SpaceBar to continue ",width/2 , height/2 + 50); }
    }
}


function keyPressed(){
    if (key == ' ' && pause){
        pause=false;
        score = 0;
        pipes = [];
        bird = new Bird();
        notStartYet = false;
    }
    
    if (key == ' ' || isUp){
        bird.up(isUp);
        mySound.setVolume(0.1);
        mySound.play();
        if(isUp){
            isUp = false;
        }      
    }
    
    if (keyCode == TAB){
        byVoice = true;
        console.log('v');
    }
}

