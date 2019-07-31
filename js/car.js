var id = 1;

function Car (source, x, y, angle, speed) {
    var image = new Image();
    image.src = source;

    this.id = id;
    this.img = image;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velocity = 0;
    if (speed == undefined) this.maxVelocity = 100;
    else this.maxVelocity = speed;
    this.gas = false;
    this.left = false;
    this.right = false;
    this.flag = "";
    this.floor = 1;
    this.collisionUp = false;
    this.collisionDown = false;
    this.wait = 0;
    this.rotator = 0;
    this.lap = 0;
    this.position = 4;
    this.checkpoint = 6;
    this.Chkp = 1;
    this.placed = false;

    this.drive = function () {
        this.gas = true;
    }

    this.stopDrive = function () {
        this.gas = false;
    }

    this.wheelLeft = function () {
        this.left = true;
        if (this.right == true) this.right = false;
    }

    this.wheelRight = function () {
        this.right = true;
        if (this.left == true) this.left = false;
    }

    this.wheelCenter = function () {
        this.left = false;
        this.right = false;
    }
    
    this.shoot = function () {

    }

    this.move = function (X, Y) {
        this.x = X;
        this.y = Y;
    }

    elements.push(this);
    id++;
}