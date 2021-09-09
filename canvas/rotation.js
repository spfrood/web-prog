// Uses documentation from https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var isDown = 0;

var x = 300;
var y = 530;

var dx = 0;
var dy = 0;

var obx = 90;
var oby = 90;

var obDX = 2;
var obDY = 2;

var speed = 2;
var angle = 0;
var speedMod = 0;

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

// Display an image
function rendImage(nx, ny, xlen, ylen, imSource) {
    // loading image from HTML element for this level
    let img = document.getElementById(imSource);
    ctx.drawImage(img, nx, ny, xlen, ylen);
}

// Function to rotate a rectangular object
function rotaRect(nx, ny, degs, xlen, ylen) {
    // calculate the center of the shape
    let transx = nx + (xlen * 0.5);
    let transy = ny + (ylen * 0.5);
    ctx.save();
    // translate screen to center of shape
    ctx.translate(transx, transy);
    // rotate around center of shape
    ctx.rotate(degs * (Math.PI / 180));
    // undo the translation - reset back to normal
    ctx.translate(-transx, -transy);
    // draw sprite using x, y below
    rectNest(nx, ny, xlen, ylen);
    ctx.restore();

}

function rotaCirc(nx, ny, degs) {
    ctx.save();
    // move to center of circle before rotating
    ctx.translate(nx, ny);
    // rotate the screen around the center of the image
    ctx.rotate(-degs * (Math.PI / 180));
    // return screen to original position
    ctx.translate(-nx, -ny);
    // draw circular sprite using x, y below
    drawFace(nx, ny, "#FF00FF");
    ctx.restore();
}

// Rotate an image
function rotaImg(nx, ny, xlen, ylen, imSource, degs) {
    ctx.save();
    // find the center of the image
    let transx = nx + (xlen * 0.5);
    let transy = ny + (ylen * 0.5);
    // translate to center of image
    ctx.translate(transx, transy);
    // rotate the image
    ctx.rotate(4 * degs * (Math.PI / 180));
    // go back to normal canvase
    ctx.translate(-transx, -transy);
    // draw the image on the screen
    rendImage(nx, ny, xlen, ylen, imSource);
    ctx.restore();
}

// check to see if sprite is off canvas screen
function outBounds() {
    if (x + 60 >= canvas.width || x <= 0 || y + 45 >= canvas.height || y - 15 <= 0) {
        cancelAnimationFrame();
    }
}


const mouse = {
    x: 0,
    y: 0
};
var angle = 0;

function mouseEvents(e) {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
}
document.addEventListener("mousemove", mouseEvents);


function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);

    // generate angle to constantly rotate image based on frame progression
    if (frameNum > 360) {
        frameNum = 0
    }
    frameNum += 1;

    // limit mouse input to 360 degrees not constant rotation
    angle = (mouse.x - 480) / 10;
    if (angle > 22.5) {
        angle = 22.5;
    } else if (angle < -67.5) {
        angle = -67.5;
    }

    // modify speed of x/y based on the angles such that the x, y velocity is
    // appropriate to the angle for that vector
    speedMod = 22.5 - Math.abs(angle);

    // draw a .bmp image file on the screen
    rotaImg(x, y, 60, 30, "car_01", angle);
    outBounds();
    dx = speed * speedMod / 22.5;
    dy = Math.abs(dx) - speed;

    if (angle < -45) {
        dx = speed * speedMod / 22.5;
        dx = Math.abs(dx) - 4;
    }
    if (angle > 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;



    // // draw and rotate smiley face
    // rotaCirc (obx, oby, frameNum*2);
    // if ((obx + 50) >= canvas.width) {
    //     obDX = -obDX;
    // } else if ((obx - 50) <= 0) {
    //     obDX = -obDX;
    // }
    // if ((oby + 50) >= canvas.height) {
    //     obDY = -obDY;
    // } else if ((oby - 50) <= 0) {
    //     obDY = -obDY;
    // }

    // // draw and rotate rectangle that bounces off walls
    // rotaRect (obx, oby, frameNum, 150, 150);
    // if ((obx + 150) >= canvas.width) {
    //     obDX = -obDX;
    // } else if (obx <= 0) {
    //     obDX = -obDX;
    // }
    // if ((oby + 150) >= canvas.height) {
    //     obDY = -obDY;
    // } else if (oby <= 0) {
    //     obDY = -obDY;
    // }
    obx += obDX;
    oby += obDY;

    document.getElementById("status_box1").innerHTML = "dy: " + dy;
    document.getElementById("status_box2").innerHTML = "dx: " + dx;
    document.getElementById("status_box3").innerHTML = "Angle: " + angle;

    requestAnimationFrame(draw);
}

draw();