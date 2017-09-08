//Maor Assayag
//Traveling Salesperson JS using probality algorithem to find the shortest rouets beetween all points, for accurate please define numOfdots to be >5
// with an option to insert the num of dots

var dots = [];
var numOfDots = 12;
var minDist;
var minDots;
var counter;
var fact;

function setup() {
    createCanvas(600,400);
    input = createInput('num of dots :)'); // insert the num of dots you want to check!
    intial();
}


function draw() {
    background(55);
    fill(255);
    noStroke();
    //check if the user inert num of dots
    if (input.value()!='num of dots :)' && input.value()!=numOfDots){
        numOfDots = input.value();
        intial();
    }
    
    //draw the dots
    for (var i =0; i < dots.length; i++){ ellipse(dots[i].x, dots[i].y, 12, 12); }
    
    //draw the route
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i =0; i < dots.length; i++){ vertex(dots[i].x, dots[i].y); }
    endShape();
    
    //change the route
   if (counter < fact) {
       swap(dots,floor(random(dots.length)),floor(random(dots.length)));
       counter++;
       var d = calcDist(dots);
       if (d < minDist){ 
           minDist = d;
           minDots = dots.slice();
           console.log(minDist);}
    }
  
    //draw analysis
    stroke('gold');
    strokeWeight(3);
    noFill();
    beginShape();
    for (var i =0; i < minDots.length; i++){ vertex(minDots[i].x, minDots[i].y); }
    endShape();
    fill('grey');
    strokeWeight(0);
    textSize(24);
    text("current min : "+floor(minDist)+"   routes : "+counter, 0 , height -2);
}


function swap(a, i, j){
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

function calcDist(dots){
    var sum = 0;
    for(var i = 0; i < dots.length-1 ; i++){
        var d = dist(dots[i].x, dots[i].y, dots[i+1].x, dots[i+1].y);
        sum +=d;
    }
    return sum;
}

function factorial (n){
  j = 1;
  for(i=1;i<=n;i++){
    j = j*i;
  }
  return j;
}

function intial(){
    dots = [];
    for (var i =0; i < numOfDots; i++){
        var v = createVector(random(width),random(height-20));
        dots[i] = v;
    }
    
    // intialize minimum values
    var d = calcDist(dots); 
    minDist = d;
    minDots = dots.slice();
    fact = factorial(numOfDots);
    counter = 0;
}