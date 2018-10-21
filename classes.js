var getRandomCoord = () => {
        return Math.round(Math.random() * (canvas.sizeInBlocks-1));
};
var getRandomBlock = function (canvas) {
    var arr_to_return = [getRandomCoord(), getRandomCoord()];
    // // if(canvas.blocks.arr_to_return !== undefined) {
    //     console.warn("Hey! Catch!", canvas.blocks, arr_to_return, canvas.blocks[arr_to_return.toString()]);
    //     // return getRandomBlock(canvas);
    // // };
    return arr_to_return;
};
var getRandomColor = () => {
    var R = Math.round(Math.random() * (255));
    var G = Math.round(Math.random() * (255));
    var B = Math.round(Math.random() * (255));
    return 'rgba('+R+', '+R+', ' +R+', 0.9)';
}

// var renderBlock = function ()
var state = {
    left  :() => { changeCoords(-blocksize,   0) },
    right :() => { changeCoords( blocksize,   0) },
    up    :() => { changeCoords(  0, -blocksize) },
    down  :() => { changeCoords(  0,  blocksize) }
};

var direction_coords = {
    "left" : [-1, 0],
    "right": [ 1, 0],
    "up"   : [ 0,-1],
    "down" : [ 0, 1]
}

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

    checkPosition() {
        let currentPositionBlock = canvas.blocks[this.sBody[this.head].position];
        console.log(canvas.blocks);
        if(currentPositionBlock !== undefined) {
            switch (currentPositionBlock.type) {
                case "Food":
                    currentPositionBlock.erase();
                    this.append(direction_coords[this.direction]);
                    // currentPositionBlock.changeCoords();
                    // currentPositionBlock.render();
                    break;
                case "Blocker":
                    this.respawn();
                    break;
                case "Portal":
                    this.sBody[this.head].position = currentPositionBlock.redirect;
                    break;
                default:
                    break;
            }
        };
    }

    move() {
        this.erase();
        this.append(direction_coords[this.direction]);
        this.pop();
        this.checkPosition();
        this.render();
    };

    render() {
        for(var i = this.head; i >= this.tail; i--) {
            this.sBody[i].render();
        }
    };
    

    clear() {
        this.sBody = {};
        this.sBody[0] = new Block(this.color, "Blocker", this.canvas, getRandomBlock(this.canvas));
        this.tail = 0;
        this.head = 0;
    }

    respawn() {
        clearInterval(this.interval);
        this.clear();
        this.interval = setInterval(() => {
                this.move();
        }, 60);
    }

    erase() {
        for(var i = this.head; i >= this.tail; i--) {
            this.sBody[i].erase();
        }
    };

    pop() {
        delete this.sBody[this.tail];
        this.tail++
    };

    append([coord1, coord2]) {
        this.head++;
        this.sBody[this.head] = new Block(this.color, "Blocker", this.canvas, [this.sBody[this.head-1].position[0]+coord1, this.sBody[this.head-1].position[1]+coord2]);
    };
    
    start() {
        this.sBody[0] = new Block(this.color, "Blocker", this.canvas, getRandomBlock(this.canvas)); //starterPoint
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        this.append([1, 0]);
        snakes.push(this);
        this.interval = setInterval(() => {
            this.move();
        }, 60);
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
        delete canvas.blocks[this.position];
        var context = canvas.getContext("2d");
        context.fillStyle = "rgb(200, 200, 255)";
        context.fillRect(this.position[0]*this.size, this.position[1]*this.size, this.size-1, this.size-1);
    };

    render() {
        canvas.blocks[this.position] = this;
        var context = canvas.getContext("2d");
        context.fillStyle = this.color;
        context.fillRect(this.position[0]*this.size, this.position[1]*this.size, this.size-1, this.size-1);
    };
}

class Food extends Block {
    constructor(color, canvas, position) {
        super(color, "Food", canvas, position);
    }
}

class Blocker extends Block {
    constructor(canvas, position) {
        super("rgb(0, 0, 0)", "Blocker", canvas, position);
    }
}

class Portal extends Block {
    constructor(canvas, position, redirect) {
        super("rgb(148, 0, 150)", "Portal", canvas, position);
        this.redirect = redirect;
    }
}