function Pipe() {
    
    var spacing = random(93, height/2);
    var center = random(spacing,height-spacing);
    
    this.top = center - spacing/2;
    this.bottom = height - (center +spacing/2);
    this.x = width;
    this.w = 25;
    this.speed = 2;
    this.hit = false;
    this.c = random(100,200);
    
    this.show = function (){
        fill(50,this.c,50);
        if (this.hit){
            fill(255,0,0);
        }
        noStroke();
        rect(this.x ,0 ,this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }
    
    this.update = function(){
        this.x -= this.speed;
    }
    
    this.offscreen = function(){
        return (this.x<-this.w);
    }
    
    this.hits = function(bird){
        if (bird.y < this.top + 30 || bird.y > height - this.bottom -16){
           if (bird.x > this.x && bird.x < this.x + this.w){
               this.hit = true;
               return true;
           } 
        }
        if (bird.y >= height || bird.y <= 0){
            return true;
        }
        return false;
    }
    
    this.pass = function(bird){
        return (bird.x > this.x + this.w - 10);
    }
}