// Maor Assayag
// Fractal shape
var d = 0;
var slider;
var prev;

var c;
function setup() {
    createCanvas (800,500);
    slider = createSlider(200,2000,500);
}

function draw() {
    background(255);
    c = random(255);
    drawCircle(width/2, height/2, d);
    if (slider.value()!=prev){
        d = slider.value();
        prev = d;
    }
}
 
function drawCircle(x, y, d) {
    noFill();
    stroke((x+y)&255,float(c)/10,float(c)/10);
    ellipse(x, y, d, d);
    if (d > 10){
        drawCircle(x+d/2, y,     d/2);
        drawCircle(x-d/2, y,     d/2);
        drawCircle(x,     y-d/2, d/2);
        drawCircle(x,     y+d/2, d/2);
    }
}