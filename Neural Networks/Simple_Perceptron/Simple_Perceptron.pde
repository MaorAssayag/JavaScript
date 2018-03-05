Preceptron preceptron;

Point[] points = new Point[100];

void setup(){
  size (800,800);
  preceptron = new Preceptron();
  
  for (int i = 0; i< points.length; i++){
    points[i] = new Point();
  }
 
  float[] inputs = {-1,0.5};
  int guess = preceptron.guess(inputs);
  println(guess);
}

void draw(){
  background(255);
  stroke(0);
  line(0,0,width,height);
  for (Point pt :points){
    pt.show();
  }
  
  for (Point pt : points){ // visualiztion of the current correctness for each point
    float[] inputs = {pt.x, pt.y};    
    int guess = preceptron.guess(inputs);
    if (guess == pt.label)
      fill(0,255,0);
    else 
      fill (255,0,0);
    noStroke();
    ellipse(pt.x, pt.y, 16, 16);
  }
  
}

void mousePressed(){ // Train the preceptron
    for (Point pt : points){
    float[] inputs = {pt.x, pt.y};
    preceptron.train(inputs, pt.label); // Train the preceptron
    
    int guess = preceptron.guess(inputs);
    if (guess == pt.label)
      fill(0,255,0); // fill green - current guess is right
    else 
      fill (255,0,0); // fill red - current guess if wrong
    noStroke();
    ellipse(pt.x, pt.y, 16, 16);
  }
}