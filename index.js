//initializing game zone
var canvas  = document.getElementById("gamezone");
var context = canvas.getContext("2d");
var body    = document.querySelector("body");


//initializing inputs for game properties
let inputGameSize  = document.getElementById("inputGameSize");
let inputBlockSize = document.getElementById("inputBlockSize");


//defaults
canvas.width     = 400;
canvas.height    = 400;
canvas.blockSize = 20;
canvas.size      = canvas.blockSize * 30;
inputGameSize.value  = 30;
inputBlockSize.value = canvas.blockSize;
// body.addEventListener("keypress", )


//functions to change game
var changeGameSize = () => {
    let size = +inputGameSize.value;
    if(size <= 60 && size > 5) {
        canvas.sizeInBlocks = size;
    } else {
        if(size > 60) {
            canvas.sizeInBlocks = 60;
        } else {
            canvas.sizeInBlocks = 5;
        }
    }

    canvas.size   =  canvas.sizeInBlocks * canvas.blockSize;
    canvas.width  =  canvas.size;
    canvas.height =  canvas.size;
    canvasGrid();
}

var changeBlockSize = () => {
    let blockSize = +inputBlockSize.value;
    if(blockSize <= 20 && blockSize > 3) {
        canvas.blockSize = blockSize;
    } else {
        if(blockSize > 20) {
            canvas.blockSize = 20;
        } else {
            canvas.blockSize = 3;
        }
    }
    changeGameSize();
}; 


//canvas grid render
var canvasGrid = () => {
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(0, 0, canvas.size, canvas.size);
    context.fillStyle = "rgb(255, 255, 255)";
    for(var i=0; i < canvas.size; i+=canvas.blockSize) {
        for(var j=0; j < canvas.size; j+=canvas.blockSize) {
            context.fillRect(i, j, canvas.blockSize-1, canvas.blockSize-1);
        }
    }
};
