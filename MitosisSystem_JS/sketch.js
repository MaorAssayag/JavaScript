//A cellular mitosis simulation in p5.js.

var cells = [];

function setup() {
  createCanvas(400, 400);
  cells.push(new Cell());
  cells.push(new Cell());
}

function draw() {
 background(0);
 for (var i = 0; i < cells.length; i++) {
   cells[i].move();
   cells[i].show();
 }
    fill(0, 102, 153);
    textSize(32);
    text("Mitosis System", 0, height-5);
    
}

function mousePressed() {
  for (var i = cells.length-1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}