byte[] data = loadBytes("data/train.npy");
int total = 1000; //images
byte[] outdata = new byte[total * 784];
int outindex = 0;
for(int j = 0; j<total; j++){
  int start = 80 + j*784;
  //PImage img = createImage(28, 28, RGB);
  //img.loadPixels();
  for (int i = 0; i < 784; i++){
    int index = i + start;
    byte val = data[index];
    outdata[outindex]  = val;
    outindex ++;
    //img.pixels[i]=color(255 - val & 0xff);
  }
  //img.updatePixels();
  //int x = 28 * (j % 10);
  //int y = 28 * (j / 10);
  //image(img,x,y);
}

saveBytes("data/train1000.bin",outdata);