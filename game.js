changeBlockSize();

var kappa = new Block("rgb(123, 123, 0)", "Apple", canvas, [7, 1]);

var testButton = document.getElementById("test");
testButton.addEventListener("click", function() {
    for(var i = 0; i < 10; i++) {
        var block = new Block("rgb(123, 123, 0)", "Apple", canvas, [7, 1]);
        block.changeCoords();
        block.render();
    }
})

console.log(kappa);