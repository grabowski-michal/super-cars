function Tar (x, y, tarOrOil) {
    var image = new Image();

    if (tarOrOil == "tar") image.src = 'images/tar.png';
    else if (tarOrOil == "oil") image.src = 'images/oil.png';

    var tar = {
        x: x,
        y: y,
        img: image,
        tarOrOil: tarOrOil
    }

    tars.push(tar);
}

function checkTar (x, y) {
    var tarred = false;
    var oiled = false;

    for (var j = 0; j < tars.length; j++) {
        if (tars[j].tarOrOil == "tar") {
            var secondX = 39+tars[j].x - 12;
            var secondY = 44+tars[j].y - 11;
            var thirdX = 39+tars[j].x - 12;
            var thirdY = 44+tars[j].y + 11;
            var fourthX = 39+tars[j].x + 12;
            var fourthY = 44+tars[j].y - 11;
            var fifthX = 39+tars[j].x + 12;
            var fifthY = 44+tars[j].y + 11;

            if (((y) - secondY)*(thirdX - secondX) - (thirdY - secondY)*((x) - secondX) <= 0 && ((y) - secondY)*(fourthX - secondX) - (fourthY - secondY)*((x) - secondX) >= 0 && ((y) - thirdY)*(fifthX - thirdX) - (fifthY - thirdY)*((x) - thirdX) <= 0 && ((y) - fourthY)*(fifthX - fourthX) - (fifthY - fourthY)*((x) - fourthX) >= 0) {
                tarred = true;
            }   
        } else if (tars[j].tarOrOil == "oil") {
            var secondX = 39+tars[j].x - 12;
            var secondY = 44+tars[j].y - 12;
            var thirdX = 39+tars[j].x - 12;
            var thirdY = 44+tars[j].y + 12;
            var fourthX = 39+tars[j].x + 12;
            var fourthY = 44+tars[j].y - 12;
            var fifthX = 39+tars[j].x + 12;
            var fifthY = 44+tars[j].y + 12;
            if (((y) - secondY)*(thirdX - secondX) - (thirdY - secondY)*((x) - secondX) <= 0 && ((y) - secondY)*(fourthX - secondX) - (fourthY - secondY)*((x) - secondX) >= 0 && ((y) - thirdY)*(fifthX - thirdX) - (fifthY - thirdY)*((x) - thirdX) <= 0 && ((y) - fourthY)*(fifthX - fourthX) - (fifthY - fourthY)*((x) - fourthX) >= 0) {
                oiled = true;
            }   
        }
    }

    var so = "";

    if (tarred == true) so = "tar";
    else if (oiled == true) so = "oil";

    return so;
}