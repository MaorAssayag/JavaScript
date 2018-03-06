float f(float x){
  // y = m*x + b linear function
  return 0.6 * x + 0.2;
}

class Point{
  float x;
  float y;
  int label;
  float bias = 1;
  
  Point(float x_, float y_){
    x = x_;
    y = y_;
  }
  
  //default constructor
  Point(){
    x = random(-1,1);
    y = random(-1,1);
    
    label = (y > f(x) ? 1:-1); //terny operator 
  }
  
  float pixelX(){
    return map(x, -1, 1, 0, width);
  }
  
  float pixelY(){
    return map(y, -1, 1, height, 0);
  }
  
  void show() {
    stroke(0);
    if (label == 1)
      fill(255); // white
    else
      fill(0); // black
    float _x = pixelX();
    float _y = pixelY();
    ellipse(_x,_y,24,24);
  }
  
}