// @ts-check
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

function drawCatHead(angle) {
    context.fillStyle = "#f6d7b0";
    context.beginPath();
    context.arc(400, 400, 20, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    context.save();
        context.translate(400, 400);
        context.rotate(angle);
        context.beginPath();
        context.ellipse(-20, 0, 5, 10, 0, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.beginPath();
        context.moveTo(0, -10);
        context.lineTo(25, -25);
        context.lineTo(20, 0);
        context.closePath();
        context.fill();
        context.beginPath();
        context.fillStyle = "black";
        context.arc(-6, -6, 3, 0, 2*Math.PI);
        context.closePath();
        context.fill();
    context.restore();
}

function drawCatBody() {
    context.fillStyle = "#f6d7b0";
    context.beginPath();
    context.moveTo(400, 420);
    context.lineTo(400, 490);
    context.lineTo(490, 490);
    context.arc(400, 490, 80, 0, 3*Math.PI/2, true);
    context.closePath();
    context.fill();
}

function drawMouse(angle, newmousex, newmousey){
    context.save();
        context.translate(newmousex, newmousey);
        context.rotate(angle + Math.PI/2);
        context.fillStyle = "darkgrey";
        context.beginPath();
        context.ellipse(0, 0, 5, 10, 0, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.fillStyle = "pink";
        context.beginPath();
        context.moveTo(-3, 10);
        context.lineTo(0, 20);
        context.lineTo(3, 10);
        context.closePath();
        context.fill();
    context.restore();
}

function drawTrap(){
    context.fillStyle = "#765341";
    context.fillRect(200, 400, 50, 20);
    context.fillRect(150, 200, 50, 20);
    context.beginPath();
    context.moveTo(225, 405);
    context.lineTo(205, 405);
    context.lineTo(205, 415);
    context.lineTo(225, 415);
    context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(175, 205);
    context.lineTo(155, 205);
    context.lineTo(155, 215);
    context.lineTo(175, 215);
    context.closePath();
    context.stroke();
    context.fillStyle = "yellow";
    context.fillRect(230, 405, 15, 10);
    context.fillRect(180, 205, 15, 10);
}

function drawCheese(){
    context.fillStyle = "e6b400"
    context.beginPath();
    context.moveTo(150, 300);
    context.lineTo(150, 330);
    context.lineTo(170, 330);
    context.lineTo(150, 300);
    context.closePath();
    context.fill();
    context.beginPath();
    context.moveTo(280, 100);
    context.lineTo(280, 160);
    context.lineTo(320, 160);
    context.lineTo(280, 100);
    context.closePath();
    context.fill();
}

let triangleAngle = Math.atan2(30, 20);
function inCheese(x, y) {
    if ((x >= 150 && x <= 170 && y >= 300 && y <= 330)){
        let newx = x - 150;
        let newy = y - 300;
        if(newy >= Math.tan(triangleAngle)*newx){
            return true;
        }
        return false;
    } else if (x >= 280 && x <= 320 && y >= 100 && y <= 160){
        let newx = x - 280;
        let newy = y - 100;
        if(newy >= Math.tan(triangleAngle)*newx){
            return true;
        }
        return false;
    }
    return false;
}

//let framesBeforeChange = 50;
//let numFrames = 0;
let a = 0;
let mousex = 100;
let mousey = 100;
let catangle = 0;
let lastAngleTime;
let lastMoveTime;
let timeToChange = Math.random()*1250 + 250;
function animate(time) {
    const delta1 = (lastAngleTime ? time - lastAngleTime : 999999);
    const delta2 = (lastMoveTime ? time - lastMoveTime : 999999);
    // if(framesBeforeChange == numFrames){
    //     a = a + (Math.random() - 1/2)*.4*Math.PI;
    //     numFrames = 0;
    //     framesBeforeChange = Math.round(Math.random()*100) + 1;
    // }
    if(delta1 > timeToChange){
        a = a + (Math.random() - 1/2)*.4*Math.PI;
        lastAngleTime = time;
        timeToChange = Math.random()*1250 + 250;
    }

    if(delta2 > 10){
        context.clearRect(0, 0, canvas.width, canvas.height);
        let newmousex = mousex + Math.cos(a);
        let newmousey = mousey + Math.sin(a);
        if(newmousex >= canvas.width - 150 || newmousex <= 0 || newmousey >= canvas.height || newmousey <= 0
            || (newmousex >= 200 && newmousex <= 250 && newmousey >= 400 && newmousey <= 420)
            || (newmousex >= 150 && newmousex <= 200 && newmousey >= 200 && newmousey <= 220)
            || inCheese(newmousex, newmousey)){
            a = (a + Math.PI)%(2*Math.PI);
            newmousex = mousex + Math.cos(a);
            newmousey = mousey + Math.sin(a);
        }
        drawMouse(a, newmousex, newmousey);
        //numFrames++;
        mousex = newmousex;
        mousey = newmousey;
    
        if(mousey > 400){
            catangle = - Math.atan2(Math.abs(mousey - 400), Math.abs(mousex - 400));
        } else {
            catangle = Math.atan2(Math.abs(mousey - 400), Math.abs(mousex - 400));
        }

        drawCatHead(catangle);
        drawCatBody();
        drawTrap();
        drawCheese();

        lastMoveTime = time;
    }

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);