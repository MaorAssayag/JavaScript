function Vehicle(x,y) {
    this.pos = p5.Vector.random2D();
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.target = createVector(x,y);
    this.r = 8;
    this.maxspeed = 5;
    this.maxforce = 1;
    this.color = random(0,255);
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Vehicle.prototype.show = function(hu) {
    stroke(hu*2%255,hu*6%255,random(0,255));  //change the red (third paramater) to this.color for efficiency
    strokeWeight(8);
    point(this.pos.x,this.pos.y);
}

Vehicle.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);
    arrive.mult(1);
    this.appleForce(arrive);
    var mouse = createVector(mouseX,mouseY);
    var flee = this.flee(mouse);
    flee.mult(5);
    this.appleForce(flee);
}

Vehicle.prototype.appleForce = function(f){
    this.acc.add(f);
}

Vehicle.prototype.seek = function(target){
    var desire = p5.Vector.sub(target, this.pos);
    desire.setMag(this.maxspeed);
    var steer = p5.Vector.sub(desire, this.vel);
    steer.limit(this.maxforce);
    return steer;
}

Vehicle.prototype.arrive = function(target){
    var desire = p5.Vector.sub(target, this.pos);
    var d = desire.mag(); // how far away?
    var speed = this.maxspeed;
    if (d<100){
        speed = map(d,0,100,0,this.maxspeed);
    }
    desire.setMag(speed);
    var steer = p5.Vector.sub(desire, this.vel);
    steer.limit(this.maxforce);
    return steer;
}


Vehicle.prototype.flee = function(target){
    var desire = p5.Vector.sub(target, this.pos);
    var d = desire.mag();
    if (d < 80){ // then the flee doesn't count
       desire.setMag(this.maxspeed);
        desire.mult(-1);
        var steer = p5.Vector.sub(desire, this.vel);
        steer.limit(this.maxforce);
        return steer; 
    }
    else {
        return createVector(0,0);
    }
    
}
