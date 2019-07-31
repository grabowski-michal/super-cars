function Game (color) {
    canvas = document.getElementById('game');
    context = canvas.getContext('2d');
    canvas.style.backgroundColor = color;

    var player = new Car('images/player.png', (304/2) + statistics.beginPlaceX, (168/2) + statistics.beginPlaceY, 0);
    player.flag = "player";
    player.maxVelocity = statistics.mph;
    var car1 = new Car('images/opp01.png', 340, 155, 0, 135);
    var car2 = new Car('images/opp02.png', 305, 189, 0, 145);
    var car3 = new Car('images/opp01.png', 270, 155, 0, 165);
    var tar1 = new Tar(420, 160, "tar");
    var oil1 = new Tar(370, 150, "oil");

    var controls = new Controls(player);
    var car1_controls = new Computer(car1);
    var car2_controls = new Computer(car2);
    var car3_controls = new Computer(car3);
}