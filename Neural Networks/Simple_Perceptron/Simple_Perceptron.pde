Preceptron preceptron;

Point[] points = new Point[100];
int index = 0;

void setup(){
  size (800,800);
  preceptron = new Preceptron(3);
  
  for (int i = 0; i< points.length; i++){
    points[i] = new Point();
  }
 }

void draw(){
  background(255);
  stroke(0);
  //const line according to mx+b that been determine
  Point p1 = new Point(-1, f(-1));
  Point p2 = new Point(1, f(1));
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  //the line according to what the preceptron think its right
  Point p3 = new Point(-1, preceptron.guessY(-1));
  Point p4 = new Point(1, preceptron.guessY(1));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());

  for (Point pt :points){
    pt.show();
  }
  
  for (Point pt : points){ // visualiztion of the current correctness for each point
    float[] inputs = {pt.x, pt.y, pt.bias};    
    int guess = preceptron.guess(inputs);
    if (guess == pt.label)
      fill(0,255,0);
    else 
      fill (255,0,0);
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 16, 16);
  }
  
    //train 1 point at a time
    Point pt = points[index];
    index++;
    if (index == points.length)
        index = 0;
    float[] inputs = {pt.x, pt.y, pt.bias};
    preceptron.train(inputs, pt.label); // Train the preceptron
    
    int guess = preceptron.guess(inputs);
    if (guess == pt.label)
      fill(0,255,0); // fill green - current guess is right
    else 
      fill (255,0,0); // fill red - current guess if wrong
    noStroke();
    ellipse(pt.pixelX(), pt.pixelY(), 16, 16);
  }