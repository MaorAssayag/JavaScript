function Fire(x,y){
    this.x = x;
    this.y = y;
    this.r = 8;

    this.move = function() {
        this.y -= 5;
    }
    
    this.addR = function(radi) {
        this.r += radi;
    }
    

}