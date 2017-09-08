function Circle(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.growing = true;
    this.c = c;
    
    this.show = function(){
        fill(0,this.x%255,0);
        noStroke();
        ellipse (this.x,this.y,this.r*2,this.r*2)
    }
    
    this.grow = function(){
        if (this.r > random(1,4)){
            this.growing = false;
        }
        if (this.growing){
            this.r += 0.5;
        }
    }
    
    this.edges = function(){
        var isOutOfRange = (this.x + this.r > width || this.x - this.r < 0 || this.y + this.r > height || this.y - this.r < 0);
        var isTouching = false;
        
        for(var i = 0; i < circles.length ; i++){
            var d = dist(circles[i].x,circles[i].y,this.x,this.y);
            if (d!=0 && d < circles[i].r + this.r){
                isTouching = true;
                break;
            }
        }
        this.growing =  !(isOutOfRange || isTouching);
    }
    
}