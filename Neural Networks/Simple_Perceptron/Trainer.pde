class Point{
  float x;
  float y;
  int label;
  
  Point(){
    
    x = random(width);
    y = random(height);
    label = (x>y ? 1:-1); //terny operator
    
  }
  
  void show() {
    stroke(0);
    if (label == 1)
      fill(255); // white
    else
      fill(0); // black
    ellipse(x,y,24,24);
  }
  
}