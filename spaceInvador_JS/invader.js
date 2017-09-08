function Invader(x,y){
    this.x = x;
    this.y = y;
    this.r = 60;
    this.ydir = 0.67;
    this.kill = 0;
    this.travel=0;
    this.check = true;
    this.imgSet = false;
    this.imgToSet;

    this.show = function() {
        noFill();
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
    }
    
    this.setImg = function(imgSet, imgToSet){
        this.imgSet = imgSet;
        this.imgToSet = imgToSet;
    }
    
    this.move = function(){
        this.y += this.ydir;
        this.travel++;
        if (this.y > height - 110){
            this.kill++; 
        }
    }  
    
    this.setCheck = function(toCheck){
        this.check = toCheck;
    }
    
    this.isDamage = function(fire) {
        var distance = dist(this.x, this.y, fire.x, fire.y);
        return (distance + 30  < this.r + fire.r);
    }
}