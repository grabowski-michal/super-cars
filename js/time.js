var elements = [];
var firstGenerate = false;
var tars = [];
var chkpnts = 0;
var pplace = 0;

function Time () {
    context.translate(-statistics.beginPlaceX, -statistics.beginPlaceY);

    var Interval = setInterval(function() {
        var toTranslateXContext = 0;
        var toTranslateYContext = 0;

        for (var i = 0; i < elements.length; i++) {

            if (elements[i].flag == "player") {
                if (elements[i].x - (300/2) > 0 && elements[i].x + (300/2) < 650) statistics.mapMoveX = elements[i].x - (304/2);
                else if (elements[i].x - (304/2) <= 0) statistics.mapMoveX = 0;
                else if (elements[i].x + (304/2) >= 650) statistics.mapMoveX = (650/2) + 24;

                if (elements[i].y - (173/2) > 0 && elements[i].y + (173/2) < 346) statistics.mapMoveY = elements[i].y - (173/2);
                else if (elements[i].y - (173/2) <= 0) statistics.mapMoveY = 0;
                else if (elements[i].y + (173/2) >= 346) statistics.mapMoveY = (346/2);
            }
        }

        context.translate(statistics.mapMoveX, statistics.mapMoveY);

        context.clearRect(0, 0, 384, 282);

        drawMap(statistics.mapMoveX, statistics.mapMoveY);

        context.translate(-statistics.mapMoveX, -statistics.mapMoveY);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].floor == 0) {
                var approximatedAngle = Math.round((elements[i].angle / 22.5))*22.5;

                if (elements[i].x < blockades[14].x && elements[i].y > blockades[14].y) {
                    elements[i].floor = 1;
                    if (elements[i].checkpoint == 6) {
                        elements[i].checkpoint = 1;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[13].x && elements[i].y > blockades[13].y) {
                    elements[i].floor = 0;
                    if (elements[i].checkpoint == 1) {
                        elements[i].checkpoint = 2;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[12].x + 7 && elements[i].y > blockades[12].y) {
                    if (elements[i].checkpoint == 2) {
                         elements[i].checkpoint = 3;
                         elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[10].x + 8 && elements[i].y < blockades[10].y) {
                    if (elements[i].checkpoint == 5) {
                         elements[i].checkpoint = 6;
                         elements[i].Chkp++;
                    }
                }

                if (elements[i].x < blockades[9].x && elements[i].y < blockades[9].y) {
                    if (elements[i].checkpoint == 3) {
                        elements[i].checkpoint = 4;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[9].x && elements[i].y < blockades[9].y) {
                    elements[i].floor = 0;
                }

                if (elements[i].x > blockades[10].x && elements[i].y > blockades[10].y) {
                    elements[i].floor = 1;
                }

                if (elements[i].x > (blockades[8].x + 50) && elements[i].x < (blockades[8].x + 60) && elements[i].y < blockades[8].y) {
                    if (elements[i].checkpoint == 4) {
                        elements[i].checkpoint = 5;
                        elements[i].lap++;
                        elements[i].Chkp++;
                    }
                    if (elements[i].lap == 6) {
                        if (elements[i].placed == false) {
                        pplace++;
                        elements[i].placed = true;
                        }

                    }
                }

                    var place = 0;
                    if (elements[i].flag == "player") {
                        for (var j = 0; j < elements.length; j++) {
                        if (elements[j].Chkp >= elements[i].Chkp) {
                            place++;
                            elements[i].position = place;
                        }}
                    }

                if (elements[i].computer == true) {
                    elements[i].controls.keyDown("SHIFT");
                    elements[i].controls.keyUp("A");
                    elements[i].controls.keyUp("D");

                    if (elements[i].x < blockades[15].x && elements[i].y < blockades[15].y && approximatedAngle == 0) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].x < blockades[14].x && elements[i].y > blockades[14].y && approximatedAngle == -90) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].x > blockades[13].x && elements[i].y > blockades[13].y && (approximatedAngle == -180 || approximatedAngle == 180)) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].x > blockades[9].x && elements[i].y < blockades[9].y && (approximatedAngle == -180 || approximatedAngle == 180)) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].x < blockades[8].x && elements[i].y < blockades[8].y && approximatedAngle == 90) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].x > blockades[10].x && elements[i].y > blockades[10].y && approximatedAngle == -90) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = approximatedAngle;
                    }

                    if (elements[i].controls.left == true) {
                        if (Math.abs(Math.abs(approximatedAngle) - Math.abs(elements[i].controls.nowAngle)) == 90) {
                            elements[i].controls.left = false;
                        } else {
                            elements[i].controls.keyDown("A");
                        }
                    }

                    if (elements[i].controls.right == true) {
                        if (Math.abs(Math.abs(approximatedAngle) - Math.abs(elements[i].controls.nowAngle)) == 90) {
                            elements[i].controls.right = false;
                        } else {
                            elements[i].controls.keyDown("D");
                        }
                    }
                }

                if (elements[i].gas == true) {
                    if (elements[i].velocity < elements[i].maxVelocity)
                        elements[i].velocity += 2;
                    if (elements[i].velocity > elements[i].maxVelocity)
                        elements[i].velocity -= 5;
                } else {
                    if (elements[i].velocity > 0)
                        elements[i].velocity -= 3;
                    if (elements[i].velocity < 0 && elements[i].velocity > -3)
                        elements[i].velocity = 0;
                }

                if (elements[i].velocity > 0) {
                    if (elements[i].flag == "player") {
                        statistics.engine -= 0.005;
                        statistics.fuel -= 0.008;
                        statistics.tyres -= 0.007;
                        statistics.body -= 0.003;
                    }

                    elements[i].x -= Math.cos(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    elements[i].y -= Math.sin(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    if (elements[i].flag == "player") {
                        if (statistics.mapMoveX > 0 && statistics.mapMoveX < (650/2) + 24) toTranslateXContext = Math.cos(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                        else toTranslateXContext = 0;

                        if (statistics.mapMoveY > 0 && statistics.mapMoveY < (346/2)) toTranslateYContext = Math.sin(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                        else toTranslateYContext = 0;
                    }
                }

                if (elements[i].velocity < 0) {
                    elements[i].velocity += 2;
                    elements[i].x += (-1)*Math.cos((approximatedAngle)*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    elements[i].y += (-1)*Math.sin((approximatedAngle)*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    if (elements[i].flag == "player") {
                        if (statistics.mapMoveX > 0 && statistics.mapMoveX < (650/2) + 24) toTranslateXContext = Math.cos((approximatedAngle-180)*(Math.PI/180)) * 1 * ((-elements[i].velocity) / 150);
                        else toTranslateXContext = 0;

                        if (statistics.mapMoveY > 0 && statistics.mapMoveY < (346/2)) toTranslateYContext = Math.sin((approximatedAngle-180)*(Math.PI/180)) * 1 * ((-elements[i].velocity) / 150);
                        else toTranslateYContext = 0;
                    }
                }

                if (elements[i].left == true) {
                    elements[i].angle = elements[i].angle - 1;

                    if (elements[i].velocity > 120) elements[i].velocity -= 6;
                    else if (elements[i].velocity > 90 && elements[i].velocity < 120) elements[i].velocity -= 10;

                    if (elements[i].angle <= -180) elements[i].angle = elements[i].angle + 360;
                }

                if (elements[i].right == true) {
                    elements[i].angle = elements[i].angle + 1;

                    if (elements[i].velocity > 120) elements[i].velocity -= 6;
                    else if (elements[i].velocity > 90 && elements[i].velocity < 120) elements[i].velocity -= 10;

                    if (elements[i].angle > 180) elements[i].angle = elements[i].angle - 360;
                }

                var oneX = 39+elements[i].x-Math.cos((approximatedAngle)*(Math.PI/180)) * 12;
                var oneY = 44+elements[i].y-Math.sin((approximatedAngle)*(Math.PI/180)) * 12;
                var twoX = 39+elements[i].x-Math.cos((approximatedAngle+25)*(Math.PI/180)) * 12;
                var twoY = 44+elements[i].y-Math.sin((approximatedAngle+25)*(Math.PI/180)) * 12;
                var threeX = 39+elements[i].x-Math.cos((approximatedAngle-25)*(Math.PI/180)) * 12;
                var threeY = 44+elements[i].y-Math.sin((approximatedAngle-25)*(Math.PI/180)) * 12;
                var fourX = 39+elements[i].x-Math.cos((approximatedAngle+150)*(Math.PI/180)) * 12;
                var fourY = 44+elements[i].y-Math.sin((approximatedAngle+150)*(Math.PI/180)) * 12;
                var fiveX = 39+elements[i].x-Math.cos((approximatedAngle-150)*(Math.PI/180)) * 12;
                var fiveY = 44+elements[i].y-Math.sin((approximatedAngle-150)*(Math.PI/180)) * 12;
                var sixX = 39+elements[i].x-Math.cos((approximatedAngle-180)*(Math.PI/180)) * 12;
                var sixY = 44+elements[i].y-Math.sin((approximatedAngle-180)*(Math.PI/180)) * 12;

                if (checkTar(oneX, oneY) == "tar" || checkTar(twoX, twoY) == "tar" || checkTar(threeX, threeY) == "tar" ||
                    checkTar(fourX, fourY) == "tar" || checkTar(fiveX, fiveY) == "tar" || checkTar(sixX, sixY) == "tar") {
                    
                    if (elements[i].velocity > 50) elements[i].velocity -= 40;
                }

                if (checkTar(oneX, oneY) == "oil" || checkTar(twoX, twoY) == "oil" || checkTar(threeX, threeY) == "oil" ||
                    checkTar(fourX, fourY) == "oil" || checkTar(fiveX, fiveY) == "oil" || checkTar(sixX, sixY) == "oil") {
                    
                    if (elements[i].wait == 0 && elements[i].floor == 1) {
                        elements[i].rotator = elements[i].velocity;
                        elements[i].velocity = 100;
                        elements[i].wait = 100;
                    }
                }

                if (checkBlockades(elements[i].id, oneX, oneY, elements[i].floor) || checkBlockades(elements[i].id, twoX, twoY, elements[i].floor) || checkBlockades(elements[i].id, threeX, threeY, elements[i].floor)) {
                    elements[i].velocity = -100;
                    if (elements[i].flag == "player") {
                        statistics.body -= 0.5;
                    }
                }

                if (elements[i].wait > 0) elements[i].wait--;

                if(elements[i].wait == 0) {
                    if (checkBlockades(elements[i].id, fourX, fourY, elements[i].floor, true) || checkBlockades(elements[i].id, fiveX, fiveY, elements[i].floor, true) || checkBlockades(elements[i].id, sixX, sixY, elements[i].floor, true)) {
                        // elements[i].velocity += 100;
                        elements[i].wait = 6;
                        if (elements[i].flag == "player") {
                            statistics.body -= 0.5;
                        }
                    }
                }

                context.translate(39+elements[i].x, 44+elements[i].y);
                context.rotate(approximatedAngle * (Math.PI/180));
                context.drawImage(elements[i].img, -12, -6, 24, 12);
                context.rotate(-(approximatedAngle * (Math.PI/180)));
                context.translate(-elements[i].x-39, -elements[i].y-44);
            }
        }

        drawOverpass(39+291, 44+129);
        drawMeta(39+388, 44+10);

        for (var i = 0; i < tars.length; i++) {
            if (tars[i].tarOrOil == "tar") {
                context.translate(39+tars[i].x, 44+tars[i].y);
                context.drawImage(tars[i].img, -12, -11, 24, 22);
                context.translate(-tars[i].x-39, -tars[i].y-44);
            } else {
                context.translate(39+tars[i].x, 44+tars[i].y);
                context.drawImage(tars[i].img, -12, -12, 24, 24);
                context.translate(-tars[i].x-39, -tars[i].y-44);
            }
        }

        context.translate(statistics.mapMoveX, statistics.mapMoveY);

        context.translate(-statistics.mapMoveX, -statistics.mapMoveY);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].floor == 1) {
                var approximatedAngle = Math.round((elements[i].angle / 22.5))*22.5;

                if (elements[i].x < blockades[14].x && elements[i].y > blockades[14].y) {
                    elements[i].floor = 1;
                    if (elements[i].checkpoint == 6) {
                        elements[i].checkpoint = 1;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[13].x && elements[i].y > blockades[13].y) {
                    elements[i].floor = 0;
                    if (elements[i].checkpoint == 1) {
                        elements[i].checkpoint = 2;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[12].x + 7 && elements[i].y > blockades[12].y) {
                    if (elements[i].checkpoint == 2) {
                         elements[i].checkpoint = 3;
                         elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[10].x + 8 && elements[i].y < blockades[10].y) {
                    if (elements[i].checkpoint == 5) {
                         elements[i].checkpoint = 6;
                         elements[i].Chkp++;
                    }
                }

                if (elements[i].x < blockades[9].x && elements[i].y < blockades[9].y) {
                    if (elements[i].checkpoint == 3) {
                        elements[i].checkpoint = 4;
                        elements[i].Chkp++;
                    }
                }

                if (elements[i].x > blockades[9].x && elements[i].y < blockades[9].y) {
                    elements[i].floor = 0;
                }

                if (elements[i].x > blockades[10].x && elements[i].y > blockades[10].y) {
                    elements[i].floor = 1;
                }

                if (elements[i].x > (blockades[8].x + 50) && elements[i].x < (blockades[8].x + 60) && elements[i].y < blockades[8].y) {
                    if (elements[i].checkpoint == 4) {
                        elements[i].checkpoint = 5;
                        elements[i].lap++;
                        elements[i].Chkp++;
                    }
                }

                
                    var place = 0;
                    if (elements[i].flag == "player") {
                        for (var j = 0; j < elements.length; j++) {
                        if (elements[j].Chkp >= elements[i].Chkp) {
                            place++;
                            elements[i].position = place;
                        }}
                    }

                if (elements[i].computer == true) {
                    elements[i].controls.keyDown("SHIFT");
                    elements[i].controls.keyUp("A");
                    elements[i].controls.keyUp("D");

                    if (elements[i].x < blockades[14].x - 10 && elements[i].y < blockades[14].y && approximatedAngle > -90) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = 0;
                    }

                    if (elements[i].x < blockades[13].x && elements[i].y > blockades[13].y + 5 && approximatedAngle > -180) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = -90;
                    }

                    if (elements[i].x > blockades[12].x + 7 && elements[i].y > blockades[12].y && (approximatedAngle == -180 || approximatedAngle > 90)) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = 180;
                    }

                    if (elements[i].x > blockades[10].x + 8 && elements[i].y < blockades[10].y && (approximatedAngle > -180 && approximatedAngle < 180)) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = 180;
                    }

                    if (elements[i].x < blockades[9].x && elements[i].y < blockades[9].y - 8 && approximatedAngle > -180) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = 90;
                    }

                    if (elements[i].x > blockades[11].x && elements[i].y > blockades[11].y + 6 && approximatedAngle < 0) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = -90;
                    }

                    if (elements[i].x > blockades[15].x && elements[i].y < blockades[15].y && elements[i].x < blockades[12].x && approximatedAngle < 0) {
                        elements[i].controls.right = true;
                        elements[i].controls.nowAngle = -90;
                    }

                    if (elements[i].x < blockades[11].x && elements[i].y < blockades[11].y && elements[i].y > blockades[8].y && (approximatedAngle == -180 || approximatedAngle > 90)) {
                        elements[i].controls.left = true;
                        elements[i].controls.nowAngle = 180;
                    }

                    if (elements[i].controls.left == true) {
                        if (Math.abs(Math.abs(approximatedAngle) - Math.abs(elements[i].controls.nowAngle)) == 90) {
                            elements[i].controls.left = false;
                        } else {
                            elements[i].controls.keyDown("A");
                        }
                    }

                    if (elements[i].controls.right == true) {
                        if (Math.abs(Math.abs(approximatedAngle) - Math.abs(elements[i].controls.nowAngle)) == 90) {
                            elements[i].controls.right = false;
                        } else {
                            elements[i].controls.keyDown("D");
                        }
                    }
                }

                if (elements[i].gas == true) {
                    if (elements[i].velocity < elements[i].maxVelocity)
                        elements[i].velocity += 2;
                } else {
                    if (elements[i].velocity > 0)
                        elements[i].velocity -= 3;
                    if (elements[i].velocity < 0 && elements[i].velocity > -3)
                        elements[i].velocity = 0;
                }

                if (elements[i].rotator > 0) {
                    elements[i].rotator -= 1;
                    elements[i].angle += 5;
                    if (elements[i].rotator <= 0) elements[i].rotator = 0;
                }

                if (elements[i].velocity > 0) {
                    if (elements[i].flag == "player") {
                        statistics.engine -= 0.005;
                        statistics.fuel -= 0.008;
                        statistics.tyres -= 0.007;
                        statistics.body -= 0.003;
                    }

                    elements[i].x -= Math.cos(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    elements[i].y -= Math.sin(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);

                    if (elements[i].flag == "player") {
                        if (statistics.mapMoveX > 0 && statistics.mapMoveX < (650/2) + 24) toTranslateXContext = Math.cos(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                        else toTranslateXContext = 0;

                        if (statistics.mapMoveY > 0 && statistics.mapMoveY < (346/2)) toTranslateYContext = Math.sin(approximatedAngle*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                        else toTranslateYContext = 0;
                    }
                }

                if (elements[i].velocity < 0) {
                    elements[i].velocity += 2;
                    elements[i].x += (-1)*Math.cos((approximatedAngle)*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    elements[i].y += (-1)*Math.sin((approximatedAngle)*(Math.PI/180)) * 1 * (elements[i].velocity / 150);
                    if (elements[i].flag == "player") {
                        if (statistics.mapMoveX > 0 && statistics.mapMoveX < (650/2) + 24) toTranslateXContext = Math.cos((approximatedAngle-180)*(Math.PI/180)) * 1 * ((-elements[i].velocity) / 150);
                        else toTranslateXContext = 0;

                        if (statistics.mapMoveY > 0 && statistics.mapMoveY < (346/2)) toTranslateYContext = Math.sin((approximatedAngle-180)*(Math.PI/180)) * 1 * ((-elements[i].velocity) / 150);
                        else toTranslateYContext = 0;
                    }
                }

                if (elements[i].left == true) {
                    elements[i].angle = elements[i].angle - 1;

                    if (elements[i].velocity > 120) elements[i].velocity -= 6;
                    else if (elements[i].velocity > 90 && elements[i].velocity < 120) elements[i].velocity -= 10;

                    if (elements[i].angle <= -180) elements[i].angle = elements[i].angle + 360;
                }

                if (elements[i].right == true) {
                    elements[i].angle = elements[i].angle + 1;

                    if (elements[i].velocity > 120) elements[i].velocity -= 6;
                    else if (elements[i].velocity > 90 && elements[i].velocity < 120) elements[i].velocity -= 10;

                    if (elements[i].angle > 180) elements[i].angle = elements[i].angle - 360;
                }

                var oneX = 39+elements[i].x-Math.cos((approximatedAngle)*(Math.PI/180)) * 12;
                var oneY = 44+elements[i].y-Math.sin((approximatedAngle)*(Math.PI/180)) * 12;
                var twoX = 39+elements[i].x-Math.cos((approximatedAngle+25)*(Math.PI/180)) * 12;
                var twoY = 44+elements[i].y-Math.sin((approximatedAngle+25)*(Math.PI/180)) * 12;
                var threeX = 39+elements[i].x-Math.cos((approximatedAngle-25)*(Math.PI/180)) * 12;
                var threeY = 44+elements[i].y-Math.sin((approximatedAngle-25)*(Math.PI/180)) * 12;
                var fourX = 39+elements[i].x-Math.cos((approximatedAngle+150)*(Math.PI/180)) * 12;
                var fourY = 44+elements[i].y-Math.sin((approximatedAngle+150)*(Math.PI/180)) * 12;
                var fiveX = 39+elements[i].x-Math.cos((approximatedAngle-150)*(Math.PI/180)) * 12;
                var fiveY = 44+elements[i].y-Math.sin((approximatedAngle-150)*(Math.PI/180)) * 12;
                var sixX = 39+elements[i].x-Math.cos((approximatedAngle-180)*(Math.PI/180)) * 12;
                var sixY = 44+elements[i].y-Math.sin((approximatedAngle-180)*(Math.PI/180)) * 12;

                if (checkTar(oneX, oneY) == "tar" || checkTar(twoX, twoY) == "tar" || checkTar(threeX, threeY) == "tar" ||
                    checkTar(fourX, fourY) == "tar" || checkTar(fiveX, fiveY) == "tar" || checkTar(sixX, sixY) == "tar") {
                    
                    if (elements[i].velocity > 50) elements[i].velocity -= 40;
                }

                if (checkTar(oneX, oneY) == "oil" || checkTar(twoX, twoY) == "oil" || checkTar(threeX, threeY) == "oil" ||
                    checkTar(fourX, fourY) == "oil" || checkTar(fiveX, fiveY) == "oil" || checkTar(sixX, sixY) == "oil") {
                    
                    if (elements[i].wait == 0 && elements[i].floor == 1) {
                        elements[i].rotator = elements[i].velocity;
                        elements[i].velocity = 100;
                        elements[i].wait = 100;
                    }
                }

                if (checkBlockades(elements[i].id, oneX, oneY, elements[i].floor) || checkBlockades(elements[i].id, twoX, twoY, elements[i].floor) || checkBlockades(elements[i].id, threeX, threeY, elements[i].floor)) {
                    elements[i].velocity = -100;
                    if (elements[i].flag == "player") {
                        statistics.body -= 0.5;
                    }
                }

                if (elements[i].wait > 0) elements[i].wait--;

                if(elements[i].wait == 0) {
                    if (checkBlockades(elements[i].id, fourX, fourY, elements[i].floor, true) || checkBlockades(elements[i].id, fiveX, fiveY, elements[i].floor, true) || checkBlockades(elements[i].id, sixX, sixY, elements[i].floor, true)) {
                        //elements[i].velocity += 100;
                        elements[i].wait = 6;
                        if (elements[i].flag == "player") {
                            statistics.body -= 0.5;
                        }
                    }
                }

                context.translate(39+elements[i].x, 44+elements[i].y);
                context.rotate(approximatedAngle * (Math.PI/180));
                context.drawImage(elements[i].img, -12, -6, 24, 12);
                context.rotate(-(approximatedAngle * (Math.PI/180)));
                context.translate(-elements[i].x-39, -elements[i].y-44);
            }
        }

        context.translate(toTranslateXContext, toTranslateYContext);

        context.translate(statistics.mapMoveX, statistics.mapMoveY);

        context.clearRect(0, 0, 384, 44);
        context.clearRect(0, 0, 39, 282);
        context.clearRect(343, 0, 384, 282);
        context.clearRect(0, 213, 384, 282);

        context.translate(-statistics.mapMoveX, -statistics.mapMoveY);

        var image = new Image();
        image.src = 'images/speedBar.png';
        context.drawImage(image, 40+statistics.mapMoveX, 221+statistics.mapMoveY, 58, 13);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                var full = (97-41)*(elements[i].velocity/statistics.maxMph)+40;
                for (var j = 41; j < full; j++) {
                    context.beginPath();
                    context.moveTo(j+statistics.mapMoveX,230+statistics.mapMoveY);
                    context.lineTo(j+statistics.mapMoveX,233+statistics.mapMoveY);
                    context.strokeStyle="#C3B7FF";
                    context.closePath();
                    context.stroke();
                }
            }
        }

        var image = new Image();
        image.src = 'images/texts/pos.png';
        context.drawImage(image, 115+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/texts/lap.png';
        context.drawImage(image, 160+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/texts/eng.png';
        context.drawImage(image, 225+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/texts/bod.png';
        context.drawImage(image, 255+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/texts/fue.png';
        context.drawImage(image, 285+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/texts/tyr.png';
        context.drawImage(image, 315+statistics.mapMoveX, 221+statistics.mapMoveY, 23, 5);

        var image = new Image();
        image.src = 'images/bars.png';
        context.drawImage(image, 225+statistics.mapMoveX, 230+statistics.mapMoveY, 114, 5);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                var full = (248-226)*(statistics.engine/statistics.maxEngine)+227;
                for (var j = 226; j < full; j++) {
                    context.beginPath();
                    context.moveTo(j+statistics.mapMoveX,231+statistics.mapMoveY);
                    context.lineTo(j+statistics.mapMoveX,234+statistics.mapMoveY);
                    if ((j-226)/(248-226) < 0.33) {
                        context.strokeStyle="#933A4C";
                    } else if ((j-226)/(248-227) >= 0.33 && (j-226)/(248-226) < 0.67) {
                        context.strokeStyle="#6ACF6F";
                    } else if ((j-226)/(248-226) >= 0.67) {
                        context.strokeStyle="#FBFB8B";
                    }
                    context.stroke();
                }
            }
        }

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                var full = (278-256)*(statistics.body/statistics.maxBody)+257;
                for (var j = 256; j < full; j++) {
                    context.beginPath();
                    context.moveTo(j+statistics.mapMoveX,231+statistics.mapMoveY);
                    context.lineTo(j+statistics.mapMoveX,234+statistics.mapMoveY);
                    if ((j-256)/(278-256) < 0.33) {
                        context.strokeStyle="#933A4C";
                    } else if ((j-256)/(278-257) >= 0.33 && (j-256)/(278-256) < 0.67) {
                        context.strokeStyle="#6ACF6F";
                    } else if ((j-256)/(278-256) >= 0.67) {
                        context.strokeStyle="#FBFB8B";
                    }
                    context.stroke();
                }
            }
        }

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                var full = (308-286)*(statistics.fuel/statistics.maxFuel)+287;
                for (var j = 286; j < full; j++) {
                    context.beginPath();
                    context.moveTo(j+statistics.mapMoveX,231+statistics.mapMoveY);
                    context.lineTo(j+statistics.mapMoveX,234+statistics.mapMoveY);
                    if ((j-286)/(308-286) < 0.33) {
                        context.strokeStyle="#933A4C";
                    } else if ((j-286)/(308-287) >= 0.33 && (j-286)/(308-286) < 0.67) {
                        context.strokeStyle="#6ACF6F";
                    } else if ((j-286)/(308-286) >= 0.67) {
                        context.strokeStyle="#FBFB8B";
                    }
                    context.stroke();
                }
            }
        }

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                var full = (338-316)*(statistics.tyres/statistics.maxTyres)+317;
                for (var j = 316; j < full; j++) {
                    context.beginPath();
                    context.moveTo(j+statistics.mapMoveX,231+statistics.mapMoveY);
                    context.lineTo(j+statistics.mapMoveX,234+statistics.mapMoveY);
                    if ((j-316)/(338-316) < 0.33) {
                        context.strokeStyle="#933A4C";
                    } else if ((j-316)/(338-317) >= 0.33 && (j-316)/(338-316) < 0.67) {
                        context.strokeStyle="#6ACF6F";
                    } else if ((j-316)/(338-316) >= 0.67) {
                        context.strokeStyle="#FBFB8B";
                    }
                    context.stroke();
                }
            }
        }

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].flag == "player") {
                if (elements[i].lap == 0) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/0.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                } else if (elements[i].lap == 1) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/1.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 6, 5);
                } else if (elements[i].lap == 2) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/2.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                } else if (elements[i].lap == 3) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/3.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 6, 5);
                } else if (elements[i].lap == 4) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/4.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                } else if (elements[i].lap == 5) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/5.png';
                    context.drawImage(lapek, 160+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                } else if (elements[i].lap == 6) {
                    endGame(true);
                }

                if (elements[i].position == 1) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/1.png';
                    context.drawImage(lapek, 115+statistics.mapMoveX, 230+statistics.mapMoveY, 6, 5);
                } else if (elements[i].position == 2) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/2.png';
                    context.drawImage(lapek, 115+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                } else if (elements[i].position == 3) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/3.png';
                    context.drawImage(lapek, 115+statistics.mapMoveX, 230+statistics.mapMoveY, 6, 5);
                } else if (elements[i].position == 4) {
                    var lapek = new Image();
                    lapek.src = 'images/numbers/4.png';
                    context.drawImage(lapek, 115+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                }
            }
        }

            var slash = new Image();
            slash.src = 'images/numbers/slash.png';
            context.drawImage(slash, 170+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);

            var slash2 = new Image();
            slash2.src = 'images/numbers/slash.png';
            context.drawImage(slash2, 125+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);

            var lapsImage = new Image();
            lapsImage.src = 'images/numbers/5.png';
            context.drawImage(lapsImage, 178+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);

            var positions = new Image();
            positions.src = 'images/numbers/4.png';
            context.drawImage(positions, 133+statistics.mapMoveX, 230+statistics.mapMoveY, 7, 5);
                

        firstGenerate = true;

        if (statistics.engine <= 0) endGame(false);
        if (statistics.tyres <= 0) endGame(false);
        if (statistics.fuel <= 0) endGame(false);
        if (statistics.body <= 0) endGame(false);
    }, 10)
}