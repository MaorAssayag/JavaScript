int sign(float n){
  if (n>0) return 1;
  return -1;
}

class Preceptron{
  
  float[] weights = new float[2];
  float lr = 0.01; //Learning rate
  
  //Constructor
  Preceptron(){
    // Intialize the weights randomly
    for (int i=0; i<weights.length;i++){
      weights[i] = random(-1,1);    
    }
  }
  
  int guess(float[] inputs){
    float sum = 0;
    for (int i=0; i<inputs.length; i++){
      sum += inputs[i]*weights[i];  
    }
    return sign(sum);
  }
  
  void train (float[] inputs, int target){
    int guess = guess(inputs);
    int error = target - guess;
    
    // Tune all the weights
    for (int i=0; i<weights.length; i++){
      weights[i] += error * inputs[i] * lr; 
    } 
  }
}