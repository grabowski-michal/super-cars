function drawMeta (x, y) {
    context.translate(x, y);
    var image = new Image();
    image.src = 'images/meta.png';
    context.drawImage(image, 0, 0, 10, 64);
    context.translate(-x, -y);
}