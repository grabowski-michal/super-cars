function drawOverpass (x, y) {
    context.translate(x, y);
    var image = new Image();
    image.src = 'images/overpass.png';
    context.drawImage(image, -1, 0, 64, 80);
    context.translate(-x, -y);
}