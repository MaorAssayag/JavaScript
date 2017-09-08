function Bird(){
    this.y = height/2;
    this.x = 50;
    this.gravity = 0.65;
    this.lift = -15; //upForce
    this.vel = 0;
    
    this.show = function(img) {
        image(img, this.x, this.y,90,90);
    }
    
    this.update = function() {
        this.vel += this.gravity;   
        this.y += this.vel;
        this.vel *= 0.9; //airResistence
    }
    //upForce
    this.up = function(isUp){
        if (isUp){ // by voice
           this.vel += this.lift - 4; 
        }
        else {this.vel += this.lift;}
    }
}
