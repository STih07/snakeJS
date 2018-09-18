//initializing game zone
var canvas  = document.getElementById("gamezone");
var context = canvas.getContext("2d");
var body    = document.querySelector("body");



//defaults
canvas.width  = 400;
canvas.height = 400;
var block = 20;


//initializing inputs for game properties
let inputGameSize  = document.getElementById("inputGameSize");
let inputBlockSize = document.getElementById("inputBlockSize");


//functions to change game
var changeGameSize = () => {
    let size = +inputGameSize.value;
    if(size <= 60 && size > 5) {
        canvas.width  = size * block;
        canvas.height = size * block;
    } else {
        if(size > 60) {
            canvas.width  = 60 * block;
            canvas.height = 60 * block;
        } else {
            canvas.width  =  5 * block;
            canvas.height =  5 * block;
        }
    }
    canvasGrid();
}

var changeBlockSize = () => {
    let blockSize = +inputBlockSize.value;
    if(blockSize <= 20 && blockSize > 3) {
        window.block = blockSize;
    } else {
        if(blockSize > 20) {
            window.block = 20;
        } else {
            window.block = 3;
        }
    }
    changeGameSize();
}; 


//canvas grid render
var canvasGrid = () => {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(255, 255, 255)";
    for(var i=0; i < canvas.width; i+=block) {
        for(var j=0; j < canvas.height; j+=block) {
            context.fillRect(i, j, block-1, block-1);
        }
    }
};


var STih07 = new Snake("stih07", "rgb(255, 0, 0)");
STih07.start(canvas, block);
console.log(STih07);