// Maor Assayag
//
//Circle Packing of an image, you can adujst the brightness when you change the brightFilter value.
//


var circles = [];
var numOfCircles ;
var img;
var c;
var brightFilter = 8;

function preload() {
  img = loadImage("smile.jpg");
}

function setup() {
    createCanvas(825,261);
    pixelDensity(1);
    img.loadPixels();
    loadPixels();
}


function draw() {;
    background(0);
    newCircle(); // try to add a new Circle
    for(var i = 0; i < circles.length ; i++){
        if (circles[i].growing){circles[i].edges();}
        circles[i].show();
        circles[i].grow();
    }
}


function newCircle(){
    var x = floor(random(img.width));
    var y = floor(random(img.height));
    var valid = true;
    for (var i = 0; i < circles.length ; i++){
        var d = dist(circles[i].x,circles[i].y,x,y);
        if (d < circles[i].r){
            valid = false;
            break;
        }
    }
    if (valid){
        c = img.pixels[(x + y*img.width)*4];
        if (c>brightFilter){
            circles[circles.length] = new Circle(x,y,1,c);

        }
    }
}