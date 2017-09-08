// Maor Assayag
// FractalTree with the option to change the angular changing, when key is pressed the backgroung color is changing.

var angle = 0 ;
var slider; // slider for user
var total = 55;

function setup(){
    createCanvas(450,400);
    slider = createSlider(0,TWO_PI,PI / 4,0.01);
}

function draw(){
    background('black');
    angle = slider.value();
    if (angle-PI>-1 && angle-PI<1 ){ // easter egg
        textSize(50);
        fill(0, 102, 153);
        text(":)", 220, 100);
    }
    if (keyIsPressed === true) {
        total--;
        if (total==0)
            total=55;
        background(total);
    }
    translate(225, height);
    branch(100);
}

function branch(len){
    stroke(floor(len*2),30,floor(len*2)+50); // color changes
    line(0,0,0,-len*1.2); // length of the line is changing
    translate(0,-len*1.2); // back
    if (len>4){
        push();
        rotate(angle);
        branch(len*0.67); // right side
        pop();
        push();
        rotate(-angle);
        branch(len*0.67); // left side
        pop();

    } 
}
