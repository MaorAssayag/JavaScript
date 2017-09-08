// Maor Assayag
// The Lorenz system is a system of ordinary differential equations first studied by Edward Lorenz. It is notable for having chaotic solutions for certain parameter values and initial conditions. In particular, the Lorenz attractor is a set of chaotic solutions of the Lorenz system which, when plotted, resemble a butterfly or figure eight.

var x = 0.01;
var y = 0;
var z = 0;
var a = 10;
var b = 28;
var c = 8/3;
var points = [];


function setup(){
    createCanvas(700,500); 
    colorMode(HSB);
}

function draw() {
    background(0);
    var dt = 0.01;
    var dx = a * (y - x);
    var dy = x *(b -z) - y;
    var dz = x*y - c*z;
    x += dx*dt;
    y += dy*dt;
    z += dz*dt;
    append(points, new p5.Vector(x,y,z));
    
    translate(width/2,height/2);
    scale(6);
    
    strokeWeight(-4);
    noFill();
    beginShape();
    var hu = 0;
    for (var i =0; i<points.length; i++){
      stroke(hu,points[i].x*20%255,255);
      vertex(points[i].x, points[i].y);  
      hu +=0.1;
      hu = hu%255;
    }
    endShape();   
}