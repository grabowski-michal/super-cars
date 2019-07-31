function Computer (car) {
    car.computer = true;
    car.controls = this;
    
    this.keyDown = function (key) {
        switch (key) {
            case "SHIFT": // shift
                car.drive();
                break;
            case "A": // a
                car.wheelLeft();
                break;
            case "D": // d
                car.wheelRight();
                break;
        }
    }

    this.keyUp = function (key) {
        switch (key) {
            case "SHIFT":
                car.stopDrive();
                break;
            case "A":
                car.wheelCenter();
                break;
            case "D":
                car.wheelCenter();
                break;
        }
    }
}