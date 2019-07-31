var blockades = [
    {x: 289, y: 137},
    {x: 33.5, y: 137},
    {x: 33.5, y: 329},
    {x: 354, y: 329},
    {x: 354, y: 201},
    {x: 609.8, y: 201},
    {x: 609.8, y: 10},
    {x: 290, y: 10},
    {x: 354, y: 73},
    {x: 546.3, y: 73},
    {x: 546.3, y: 137},
    {x: 354, y: 137},
    {x: 289, y: 201},
    {x: 289, y: 265},
    {x: 98, y: 265},
    {x: 98, y: 201},
]

function checkBlockades (id, x, y, floor, onlyCars) {
    var stepped = false;
    x -= 39;
    y -= 44;

    if (onlyCars == false || onlyCars == undefined) {

        if (y < blockades[0].y && x < blockades[0].x) stepped = true;

        if (x < blockades[1].x) stepped = true;

        if (y > blockades[2].y) stepped = true;

        if (x > blockades[3].x && y > blockades[4].y) stepped = true;

        if (x > blockades[5].x) stepped = true;

        if (y < blockades[6].y) stepped = true;

        if (y > blockades[15].y && y < blockades[14].y && x > blockades[15].x && x < blockades[12].x) stepped = true;

        if (y > blockades[8].y && y < blockades[11].y && x > blockades[8].x && x < blockades[9].x) stepped = true;

        if (floor == 1 && y > blockades[12].y && x > blockades[12].x && x < blockades[4].x && y < blockades[12].y+10) stepped = true;

        if (floor == 1 && y < blockades[0].y && x > blockades[0].x && x < blockades[11].x && y > blockades[0].y-10) stepped = true;

        if (floor == 0 && x > blockades[4].x && x < blockades[4].x+10 && y > blockades[11].y && y < blockades[4].y) stepped = true;

        if (floor == 0 && x < blockades[12].x && x > blockades[12].x-10 && y > blockades[0].y && y < blockades[12].y) stepped = true;
    }

    for (var j = 0; j < elements.length; j++) {
        if (id != elements[j].id && floor == elements[j].floor) {
            var approximatedAngle = Math.round((elements[j].angle / 22.5))*22.5;
            var twoX = 39+elements[j].x-Math.cos((approximatedAngle+25)*(Math.PI/180)) * 12;
            var twoY = 44+elements[j].y-Math.sin((approximatedAngle+25)*(Math.PI/180)) * 12;
            var threeX = 39+elements[j].x-Math.cos((approximatedAngle-25)*(Math.PI/180)) * 12;
            var threeY = 44+elements[j].y-Math.sin((approximatedAngle-25)*(Math.PI/180)) * 12;
            var fourX = 39+elements[j].x-Math.cos((approximatedAngle+150)*(Math.PI/180)) * 12;
            var fourY = 44+elements[j].y-Math.sin((approximatedAngle+150)*(Math.PI/180)) * 12;
            var fiveX = 39+elements[j].x-Math.cos((approximatedAngle-150)*(Math.PI/180)) * 12;
            var fiveY = 44+elements[j].y-Math.sin((approximatedAngle-150)*(Math.PI/180)) * 12;

            if (((44+y) - twoY)*(threeX - twoX) - (threeY - twoY)*((39+x) - twoX) <= 0 && ((44+y) - twoY)*(fourX - twoX) - (fourY - twoY)*((39+x) - twoX) >= 0 && ((44+y) - threeY)*(fiveX - threeX) - (fiveY - threeY)*((39+x) - threeX) <= 0 && ((44+y) - fourY)*(fiveX - fourX) - (fiveY - fourY)*((39+x) - fourX) >= 0) {
                stepped = true;
                if (elements[j].velocity > 50) elements[j].velocity += 40;
                if (elements[j].flag == "player") statistics.body -= 0.5;
            }
        }
    }            

    return stepped;
}