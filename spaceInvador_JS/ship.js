function Ship(){
    this.x = width/2;
    this.v = 3;
    this.width = 16;
    
    //
    this.show = function() {
        fill ('pink');
        rectMode(CENTER);
        noStroke();
        rect(this.x, height -20, this.width, 40,200);
    }

    // speed to the ship
    this.move = function(dir) {
        this.x += dir*this.v;
    }
    
    this.addVelocity = function(toAdd){
        this.v += toAdd;
    }
    
    this.eatSpecial = function(special){
        var distance = dist(this.x, height - 60, special.x, special.y);
        return (distance  < special.r);
    }
}