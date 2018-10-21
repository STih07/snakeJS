changeBlockSize();

var kal1na = new Snake("Kal1na", "rgb(120, 12, 30)", canvas, ["a", "w", "s", "d"]);
// var cactus = new Snake("Cactus", "rgb(25, 120, 12)", canvas, ["4", "8", "5", "6"]);
var stih07 = new Snake("STih07", "rgb(125, 125, 0)", canvas, ["j", "i", "k", "l"]);

// for(let i = 0; i < 4; i++) {
//     new Portal(canvas, getRandomBlock(canvas), [5, 5]).render();
// };
fillBorders();
setInterval(function () {
    new Food("rgb(200, 100, 100)", canvas, getRandomBlock(canvas)).render();
}, 1000);

// for(var i = 0; i<200; i++) {
//     new Blocker(canvas, getRandomBlock(canvas)).render();
// }

// var zahessi = new Snake("zahessi", "rgb(231, 122, 23)", canvas, ["a", "w", "s", "d"]);
// var catafract = new Snake("catafract", "rgb(0, 122, 122)", canvas, ["a", "w", "s", "d"]);
// var kyrylich = new Snake("kyrylich", "rgb(12, 45, 89)", canvas, ["a", "w", "s", "d"]);
kal1na.start();
// cactus.start();
stih07.start();
// zahessi.start();
// catafract.start();
// kyrylich.start();