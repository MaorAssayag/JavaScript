function Particle() {
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxvel = 4;
    this.prevpos = this.pos;

    
    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxvel);
        this.pos.add(this.vel);
        this.acc.mult(0); 
    }
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.show = function() {
        
        strokeWeight(4);
        stroke(100,100,(this.pos.x)%255,10);
        line(this.pos.x,this.pos.y,this.prevpos.x,this.prevpos.y);
        this.updatePrev();
    }
    
    this.updatePrev = function(){
        this.prevpos.x = this.pos.x;
        this.prevpos.y = this.pos.y;
    }
    
    this.edges = function() {
        if (this.pos.x > width+4) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < -4){
           this.pos.x = width;
           this.updatePrev();        
        } 
        if (this.pos.y > height + 4){
          this.pos.y = 0;
          this.updatePrev(); 
        } 
        if (this.pos.y < -4){
          this.pos.y = height; 
          this.updatePrev();
        } 
    }
    
    this.follow = function(flowfield) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * cols;
        var force = flowfield[index];
        this.applyForce(force);
        
    }
}