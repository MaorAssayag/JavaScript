function Cell(x,y,w) {
    if (random(1)<0.25){
        this.bomb = true;
    }
    else {this.bomb = false;}
    this.revealed = false;
    this.x = x;
    this.y = y;
    this.w = w;
    this.gameOver = false;
    this.numOfNeibghoors = 0; // for bomb it will be 0
}

Cell.prototype.show = function(c){
    stroke(50); //color
    strokeWeight(2);
    noFill();
    if (!this.revealed) {rect(this.x,this.y,this.w,this.w);}
    if (this.revealed && !this.bomb){
        fill(200);
        rect(this.x,this.y,this.w,this.w);
        fill(140);
        if (this.numOfNeibghoors!=0){
            noStroke();
            fill(c*3%255,c,c*2%255);
            textSize(32);
            text(this.numOfNeibghoors, this.x + this.w/4, this.y+this.w/1.3);
        }
    }
    
    if (this.revealed && this.bomb){
        rect(this.x,this.y,this.w,this.w);
        fill(140);
        noStroke();
        ellipse(this.x+this.w*0.5,this.y+this.w*0.5,this.w*0.5);
    }
    
}

Cell.prototype.contains = function(x, y){
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveled = function(){
    this.revealed = true;
    if (!this.bomb && this.numOfNeibghoors==0){
        var indexX = this.x/this.w;
        var indexY = this.y/this.w;
        for (var i = -1; i <= 1; i++){
            for (var j = -1; j <= 1; j++){
                if (i+indexX >= 0 && i+indexX < cols && j+indexY >= 0 && j+indexY < rows){
                    if (!cells[i+indexX][j+indexY].bomb && !cells[i+indexX][j+indexY].revealed && cells[i+indexX][j+indexY].numOfNeibghoors==0){
                        cells[i+indexX][j+indexY].reveled();
                    }
                }
            }
        }
    }
    if (this.bomb){
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                cells[i][j].revealed = true;
                this.gameOver = true;
            } 
        }
    }
}

Cell.prototype.neighboors = function(){
    var sum = 0;
    var indexX = this.x/this.w;
    var indexY = this.y/this.w;
    for (var i = -1; i <= 1; i++){
        for (var j = -1; j <= 1; j++){
            if (i+indexX >= 0 && i+indexX < cols && j+indexY >= 0 && j+indexY < rows){
                if (cells[i+indexX][j+indexY].bomb){
                    sum++;
                }
            }
        }
    }
    this.numOfNeibghoors = sum;
}

