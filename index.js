//initializing game zone
var canvas  = document.getElementById("gamezone");
var context = canvas.getContext("2d");
var body    = document.querySelector("body");

//initializing inputs for game properties
let inputGameSize = document.getElementById("inputGameSize");

//functions to change game
var changeGameSize = () => {
    let size = inputGameSize.value;
    if(size < 60 && size > 5) {
        canvas.width  = size * 20;
        canvas.height = size * 20;
    } else {
        if(size > 60) {
            canvas.width  = 60 * 20;
            canvas.height = 60 * 20;
        }
    }
}