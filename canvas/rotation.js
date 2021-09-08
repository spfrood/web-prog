// Uses documentation from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var x = 60;
var y = 500;

var rx = 150;
var ry = 15;

var dx = 2;
var dy = 2;

var drx = 1;
var dry = -1;

var frameNum = 0;


// draw a face on the canvas - nx, ny must be at least 50 and less than width - 50 or height - 50 
// for the whole face to render on the screen
function drawFace(nx, ny, color) {
    let rads = 50;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(nx, ny, rads, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(nx + 35, ny);
    ctx.arc(nx, ny, rads - 15, 0, Math.PI, false); // Mouth (clockwise)
    ctx.moveTo(nx + 25, ny);
    ctx.arc(nx, ny, rads - 25, 0, Math.PI, false);
    ctx.moveTo(nx + 25, ny);
    ctx.lineTo(nx + 35, ny);
    ctx.moveTo(nx - 35, ny);
    ctx.lineTo(nx - 25, ny);
    ctx.moveTo(nx - 10, ny - 10);
    ctx.arc(nx - 15, ny - 10, rads - 45, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(nx + 20, ny - 10);
    ctx.arc(nx + 15, ny - 10, rads - 45, 0, Math.PI * 2, true); // Right eye
    ctx.moveTo(nx + 5, ny + 5);
    ctx.arc(nx, ny + 5, rads - 45, 0, Math.PI * 2, true); //Nose
    ctx.stroke();
}

// using save() and restore() to draw nested rectangles
// values for xlen and ylen need to be at least 150
function rectNest(nx, ny, xlen, ylen) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(nx, ny, xlen, ylen); // Draw a rectangle with default settings
    ctx.save(); // Save the default state

    ctx.fillStyle = '#09F'; // Make changes to the settings
    ctx.fillRect(nx + 15, ny + 15, xlen - 30, ylen - 30); // Draw a rectangle with new settings

    ctx.save(); // Save the current state
    ctx.fillStyle = '#FFF'; // Make changes to the settings
    ctx.globalAlpha = 0.5;
    ctx.fillRect(nx + 30, ny + 30, xlen - 60, ylen - 60); // Draw a rectangle with new settings

    ctx.restore(); // Restore previous state
    ctx.fillRect(nx + 45, ny + 45, xlen - 90, ylen - 90); // Draw a rectangle with restored settings

    ctx.restore(); // Restore original state
    ctx.fillRect(nx + 60, ny + 60, xlen - 120, ylen - 120); // Draw a rectangle with restored settings
}

// Function to rotate a rectangular object
function rotaRect (nx, ny, degs, rwide, rhigh) {
    let transx = nx + (rwide * 0.5);
    let transy = ny + (rhigh * 0.5);
    ctx.save();
    ctx.translate(transx, transy);
    ctx.rotate(degs * (Math.PI / 180));
    ctx.translate(-transx, -transy);
    // draw sprite using x, y below
    rectNest(nx, ny, rwide, rhigh);
    ctx.restore();

}

function rotaCirc (nx, ny, degs) {
    ctx.save();
    ctx.translate(nx, ny);
    ctx.rotate(-degs * (Math.PI / 180));
    ctx.translate(-nx, -ny);
    // draw circular sprite using x, y below
    drawFace(nx, ny, "#FF00FF");
    ctx.restore();
}

function draw () {
    ctx.clearRect (0, 0, canvas.clientWidth, canvas.height);
    if (frameNum > 360) {
        frameNum = 0
    }
    frameNum += 1;
    rotaCirc (x, y, frameNum*2);
    rotaRect (rx, ry, frameNum, 150, 150);
    if ((x + 50) >= canvas.width) {
        dx = -dx;
    } else if ((x - 50) <= 0) {
        dx = -dx;
    }
    if ((y + 50) >= canvas.height) {
        dy = -dy;
    } else if ((y - 50) <= 0) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    if ((rx + 150) >= canvas.width) {
        drx = -drx;
    } else if (rx <= 0) {
        drx = -drx;
    }
    if ((ry + 150) >= canvas.height) {
        dry = -dry;
    } else if (ry <= 0) {
        dry = -dry;
    }
    x += dx;
    y += dy;

    rx += drx;
    ry += dry;

    document.getElementById("status_box1").innerHTML = "Frame: " + frameNum;

    requestAnimationFrame(draw);
}

draw();

