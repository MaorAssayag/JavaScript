//
const len = 784; //28*28 pixels image
const total = 1000; // 1000 images

const CAT = 0; // catgory to label
const RAINBOW = 1;
const TRAIN = 2;

let cats_data;
let rainbows_data;
let trains_data;

let cats = {};
let trains = {};
let rainbows = {};

let nn;


function preload(){
    cats_data = loadBytes('data/cat1000.bin');
    trains_data = loadBytes('data/train1000.bin');
    rainbows_data = loadBytes('data/rainbow1000.bin');
}

function prepareData (catgory, data, label){
    let threshold = floor(0.8 * total);
    catgory.testing = [];
    catgory.training = [];

    for (let i = 0; i < total; i++){
        let offset = i * len;
        if(i < threshold){
            catgory.training[i] = data.bytes.subarray(offset, offset+len);
            catgory.training[i].label = label;
        }else{
            catgory.testing[i - threshold] = data.bytes.subarray(offset, offset+len);
            catgory.testing[i - threshold].label = label;
        }
    }    
}

function trainEpoch(training){
    shuffle(training,true); // its important to shuffle each epoch
    
    for (let i = 0; i < training.length; i++){        
        //Normlize the data of each pixel to [0,1];
        let data = training[i];
        let inputs = data.map(x => x/255.0);
        
        let label = training[i].label;
        let targets = [0, 0, 0];
        targets[label] = 1;
        
        nn.train(inputs,targets);
    }
}

function testAll(testing){
    let correct = 0;
    for (let i = 0; i < testing.length; i++){ 

        //Normlize the data of each pixel to [0,1];
        let data = testing[i];
        let inputs = data.map(x => x/255.0);
        
        //get the guess from the Neural Network
        let label = testing[i].label;
        let guess = nn.predict(inputs);
        let m = max(guess);
        let classification = guess.indexOf(m);

        if (classification === label){
            correct++;
        }
    }
    
    let precent = correct / testing.length;
    return precent;
}

function setup(){
    createCanvas(280,280);
    background(0);
    
    // Prepare the data
    prepareData(cats,cats_data, CAT);
    prepareData(rainbows,rainbows_data, RAINBOW);
    prepareData(trains,trains_data, TRAIN);
    
    //Makin the neural network
    nn = new NeuralNetwork(784,64,3);
    
    // Training data
    let training = [];
    training = training.concat(cats.training);
    training = training.concat(trains.training);
    training = training.concat(rainbows.training);
    
    // Testing data
    let testing = [];
    testing = testing.concat(cats.testing);
    testing = testing.concat(trains.testing);
    testing = testing.concat(rainbows.testing); 

   for (let i = 0; i < 5; i++){
        trainEpoch(training);
        console.log("Epoch : " + (i+1));
        let precent =  testAll(testing);
        console.log(precent + "% Correction")
   }
}

function showImage(){
    // show some images from the data
    //    let total = 100;
    //    for (let n = 0; n < total; n++){
    //        let img = createImage(28,28);
    //        img.loadPixels();
    //        let offset = n * 784;
    //        for (let i = 0; i < 784; i++){
    //            let  val = 255 - cats.bytes[i+offset]; // invert black to white background of the draws
    //            img.pixels[i*4] = val;
    //            img.pixels[i*4 + 1] = val;
    //            img.pixels[i*4 + 2] = val;
    //            img.pixels[i*4 + 3] = 255;
    //        }
    //        img.updatePixels();
    //        let x = (n%10) * 28;
    //        let y = floor(n/10) * 28;
    //        image(img,x,y);
    //    }
}