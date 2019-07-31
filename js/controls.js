function Controls (player) {
    player.controls = this;
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    
    function keyDown (event) {
        switch (event.keyCode) {
            case 16: // shift
                player.drive();
                break;
            case 65: // a
                player.wheelLeft();
                break;
            case 68: // d
                player.wheelRight();
                break;
        }
    }

    function keyUp (event) {
        switch (event.keyCode) {
            case 16:
                player.stopDrive();
                break;
            case 65:
                player.wheelCenter();
                break;
            case 68:
                player.wheelCenter();
                break;
        }
    }

    this.remove = function () {
        document.removeEventListener("keydown", keyDown);
        document.removeEventListener("keyup", keyUp);
    }
}