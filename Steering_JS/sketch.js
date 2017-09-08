// Maor Assayag
//Steering Behaviors by moving the mouse, change the text with a textBox and change the color with a slider.

var font;
var vehicles = [];
var input;
var slider;
var toWrite = 'Write something';


function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas (600,300);
    background(51); 
    input = createInput('Write something');
    slider = createSlider(0,255,10);
}

function draw() {
    background(51);
    if (input.value()!=toWrite){
        toWrite = input.value();
        var width = (toWrite.length) * 140;
        windowResized(width);
        var points = font.textToPoints(toWrite,(width - toWrite.length*90)/2 ,200,180);
        vehicles = [];
        for(var i = 0; i < points.length ; i++){
            var pt = points[i];
            var v = new Vehicle(pt.x,pt.y);
            vehicles.push(v);  
        }
        console.log('2');
        
    }
    for(var i = 0; i < vehicles.length ; i++){
        vehicles[i].behaviors();
        vehicles[i].update();
        vehicles[i].show(slider.value());
    }
}

function windowResized(width) {
  resizeCanvas(width, 300);
}