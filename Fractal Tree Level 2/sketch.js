// Maor Assayag
// Fractal tree with L System https://en.wikipedia.org/wiki/L-system

var slider;
var axiom = "F";
var sentence = axiom;
var len = 100;
var angle;

var rules = [];

rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate() {
      len *= 0.5;
      var nextSentence = "";
      for (var i = 0; i < sentence.length; i++) {
        var found = false;
        var current = sentence.charAt(i);
        for (var j = 0; j < rules.length; j++) {
          if (current == rules[j].a) {
            found = true;
            nextSentence += rules[j].b;
            break;
          }
        }
        if (!found) {nextSentence += current;}
      }
      sentence = nextSentence;
      createP(sentence);
      turtle();
}

function turtle(){
    background(51);
    textSize(32);
    fill(len*23%255);
    text("L-System", 0, 30);
    resetMatrix(); // dont draw again stuff that we already draw
    translate(width / 2,height);
    
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        
        if (current == "F"){
            stroke(i*35%255,i*25%255,i*15%255)
            line(0,0,0,-len);
            translate(0,-len);
        }else if (current == "+"){
            rotate(slider.value());
        }else if (current == "-"){
            rotate(-slider.value());
        }else if (current == "["){
            push();
        }else if (current == "]"){
            pop();
        }
    }
}

function setup(){
    createCanvas(400,400);
    angle = radians(25);
    background(51);
    createP(axiom);
    slider = createSlider(0,PI,PI/6,PI/6);
    turtle();
    var button = createButton("generate");
    button.mousePressed(generate);
}