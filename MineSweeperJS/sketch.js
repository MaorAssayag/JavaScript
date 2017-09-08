// Maor Assayag
// MineSweeper Game, 40 slots (change by defined w)

var cells;
var cols ;
var rows ;
var w = 40;
var randomChoose = 0;
var gameOver = false;
var c = 170;

function setup() {
    createCanvas(401,401);
    cols = floor(width/w);
    rows = floor(height/w);
    cells = make2DArray(cols,rows);
    intializeArray();
}

function draw() {
    background(255);
    if (frameCount%60==0) {c = floor(random(100,255));}
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            cells[i][j].show(c);
        }
    }
    if (gameOver){
        noStroke();
        fill(170,220);
        rect(width/4,height/2,200,50,100);
        fill('sky');
        noStroke();
        textSize(36);
        text("Press", width/2 - 45, height/2 + 35);
    }
}

function intializeArray(){
    randomChoose = 0;
   for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            cells[i][j] = new Cell(i * w, j * w, w);
        }
    }
    var index = floor(random(0,cols)); // to make it reveal
    for (var i = 0; i < cols; i++){
        for (var j = 0; j < rows; j++){
            if(!cells[i][j].bomb){ 
                cells[i][j].neighboors();  
                if (i==index && randomChoose!=1 && random(1)>0.6){
                    randomChoose = 1;
                    cells[i][j].revealed = true;
                }
            }
        }
        if (i==index && randomChoose==0){index = (index+1) % cols;}
    } 
}

function mousePressed() {
    if (!gameOver){
        for (var i = 0; i < cols; i++){
            for (var j = 0; j < rows; j++){
                if(cells[i][j].contains(mouseX,mouseY)){
                    cells[i][j].reveled();
                    if (cells[i][j].gameOver){
                        gameOver = true;
                    }
                } 
            }
        }
    }
    else {
        gameOver = false;
        intializeArray();
    }
}

function make2DArray(cols,rows){
    var arr = new Array(cols);
    for (var i = 0; i < cols; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}