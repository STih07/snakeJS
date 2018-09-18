var getRandomBlock = function (canvas, blocksize) {
    var blockscount = canvas.width / blocksize;
    var getRandomCoord = (blockscount) => {
        return Math.round(Math.random() * blockscount) * blocksize;
    };
    return [getRandomCoord(blockscount), getRandomCoord(blockscount)];
};

// var renderBlock = function ()
var state = {
    left  :() => { changeCoords(-blocksize,   0) },
    right :() => { changeCoords( blocksize,   0) },
    up    :() => { changeCoords(  0, -blocksize) },
    down  :() => { changeCoords(  0,  blocksize) }
};

class Snake {
    constructor(name, color) {
        this.color = color;
        this.name  = name;
        this.tail  = 0;
        this.head  = 0;
    }
    
    move(x, y) {
        delete this.sBody[this.tail];
        this.tail++;
        var head = this.sBody.head;
        this.head++;
        new_head = [head[0]+x, head[1]+y]
        sBody[head] = new_head;
    };
    
    start(canvas, blocksize) {
        this.sBody = {};
        this.sBody[0] = getRandomBlock(canvas, blocksize); //starterPoint
    };
}

class Block {
    constructor(color, type) {
        this.color = color;
        this.type  = type;


        this.render = function (canvas, blocksize) {
            var context = canvas.getContext("2d");

        }
    }
}
