//Maor Assayag
// Perlin Noise as a flow field.

var inc = 0.1;
var scl = 40;
var cols, rows;
var zoff = 0; //3D
var particles = [];
var fr;
var flowfield;

function setup() {
    createCanvas(600,600);
    background(255);
    cols = floor(width/scl);
    rows = floor(height/scl);
    fr = createP('');
    flowfield = new Array(cols * rows);
    for (var i=0; i<700; i++){
        particles[i] = new Particle();
    }
}

function draw() {
    var yoff = 0; // y offset
    for (var y = 0; y < rows; y++){
        var xoff = 0; // x offset
        for (var x = 0; x < cols; x++){
            var index = (x + y * cols);
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(4);
            flowfield[index] = v;
            xoff += inc;
           // strokeWeight(1);  // for something goffie check out thus lines!:)
         //  stroke(0,10);
            push();
            translate(x*scl,y*scl);
            rotate(v.heading());
           // line (0,0,scl,0);
            pop();
        }
        yoff +=inc;
        zoff +=0.0004;
    }
    
    for (var i=0; i<particles.length; i++){
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
    fr.html(floor(frameRate()));
}