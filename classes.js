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
    constructor(name, color, canvas, keys) {
        this.block  = canvas.blockSize;
        this.directionKeys = keys;
        this.direction = "left";
        this.canvas = canvas;
        this.color  = color;
        this.name   = name;
        this.sBody  = {};
        this.tail   = 0;
        this.head   = 0;
    }

    changeDirection(key) {
        if(this.directionKeys.indexOf(key) != -1) {
            if(key === this.directionKeys[0]) {
                if(this.direction !== "right") {
                    this.direction = "left";
                }
            }else if(key === this.directionKeys[1]) {
                if(this.direction !== "down") {
                    this.direction = "up";
                }
            }else if(key === this.directionKeys[2]) {
                if(this.direction !== "up") {
                    this.direction = "down";
                }
            }else if(key === this.directionKeys[3]) {
                if(this.direction !== "left") {
                    this.direction = "right";
                }
            }
        } else {
            console.log(this.directionKeys[key]);
        }
    };

    move() {
        var direction_coords = {
            "left" : [-1, 0],
            "right": [ 1, 0],
            "up"   : [ 0,-1],
            "down" : [ 0, 1]
        }
        this.erase();
        this.append(direction_coords[this.direction]);
        // if(this.sBody[this.head][0] == 0 ||
        //     this.sBody[this.head][0] == this.canvas.sizeInBlocks ||
        //     this.sBody[this.head][1] == 0 ||
        //     this.sBody[this.head][1] == this.canvas.sizeInBlocks ) {
        //     console.log(this);
        //     delete this;
        //     console.log(this);
        // }
        this.pop();
        this.render();
    };

    render() {
        for(var i in this.sBody) {
            this.sBody[i].render();
        }
    };

    erase() {
        for(var i in this.sBody) {
            this.sBody[i].erase();
        }
    };

    pop() {
        delete this.sBody[this.tail];
        this.tail++
    };

    append([coord1, coord2]) {
        this.head++;
        this.sBody[this.head] = new Block(this.color, this.name, this.canvas, [this.sBody[this.head-1].position[0]+coord1, this.sBody[this.head-1].position[1]+coord2]);
    };
    
    start() {
        this.sBody[0] = new Block(this.color, this.name, this.canvas, getRandomBlock(this.canvas)); //starterPoint
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        snakes.push(this);
        setInterval(() => {
            this.move();
        }, 50);
    };
}

class Block {
    constructor(color, type, canvas, position) {
        this.color    = color;
        this.type     = type;
        this.canvas   = canvas;
        this.size     = canvas.blockSize;
        this.position = position;
    };

    changeCoords() {
        this.position = getRandomBlock(this.canvas);
    };

    erase() {
        var context = canvas.getContext("2d");
        context.fillStyle = "rgb(255, 255, 255)";
        context.fillRect(this.position[0]*this.size, this.position[1]*this.size, this.size-1, this.size-1);
    };

    render() {
        var context = canvas.getContext("2d");
        context.fillStyle = this.color;
        context.fillRect(this.position[0]*this.size, this.position[1]*this.size, this.size-1, this.size-1);
    };


}
