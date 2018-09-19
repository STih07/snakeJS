var getRandomBlock = function (canvas) {
    var getRandomCoord = () => {
        return Math.round(Math.random() * canvas.sizeInBlocks);
    };
    return [getRandomCoord(), getRandomCoord()];
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
    constructor(color, type, canvas, position) {
        this.color    = color;
        this.type     = type;
        this.canvas   = canvas;
        this.size     = canvas.blockSize;
        this.position = position;
    }
    changeCoords() {
        this.position = getRandomBlock(this.canvas);
    }
    render() {
        var context = canvas.getContext("2d");
        context.fillStyle = this.color;
        context.fillRect(this.position[0]*this.size, this.position[1]*this.size, this.size-1, this.size-1);
    }
}
