// look at https://www.sitepoint.com/the-complete-guide-to-building-html5-games-with-canvas-and-svg/


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// list of car images
// Element ID for images of car from main HTML file
var carIds = [
    "car_01",
    "car_02",
    "car_03",
    "car_04",
    "car_05"
];

var carIdsB = [
    "car_01b",
    "car_02b",
    "car_03b",
    "car_04b",
    "car_05b"
];

// Temp var to use while creating
fraNum = 0;

// Width and height of the car image when driving horizontally
carWidthH = -60;
carHeightH = 30;
// Width and height of the car image when driving vertically
carWidthV = -30;
carHeightV = 60;


var parked = 0;
var lives = 3;
var level = 1;
var numSpaces = 6;
var hints = false;

var x = 80;
var y = 150;
var dx = level + 3;
var dy = 0;

// to determine which car image to display
function carImage() {
    let tempx = level % 5;
    return carIds[tempx];
}

// hitbox checks for collision. Generally this should be called in the function that renders
// the players sprite
function hitBox() {
    if (x > 615) {
        cancelAnimationFrame();
        dx = 0;
    }
}

// draw the parking spaces/targets for player to park in
function drawSpaces() {
    // The interior space = spacewidth x 90 px
    // the borders beetween spaces = 10 px width by 90 depth.

    ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;
    let xstart = 110;
    let ystart = 20;
    let spaceWidth = 75;
    let lamx = xstart;
    ctx.moveTo(xstart, ystart);
    ctx.lineTo(xstart, ystart + 90);
    for (let i = 0; i < numSpaces; i++) {
        lamx += 5;
        ctx.lineTo(lamx, ystart + 90);
        ctx.lineTo(lamx, ystart + 10);
        lamx += spaceWidth;
        ctx.lineTo(lamx, ystart + 10);
        ctx.lineTo(lamx, ystart + 90);
        lamx += 5;
        ctx.lineTo(lamx, ystart + 90);
    }
    ctx.lineTo(lamx, ystart);
    ctx.lineTo(xstart, ystart);
    ctx.moveTo(lamx, ystart + 90);
    ctx.lineTo(lamx - 5, ystart + 90);
    ctx.lineTo(lamx - 5, ystart + 190);
    ctx.lineTo(xstart, ystart + 190);
    ctx.lineTo(xstart, ystart + 195);
    ctx.lineTo(lamx, ystart + 195);
    ctx.lineTo(lamx, ystart + 90);
    ctx.stroke();
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
    document.getElementById("status_box3").innerHTML = "lamx: " + lamx;

}

// Display the image of the car, also the hitbox of the player's car. Done this way
// because of the need to load image files before actually rendering the display.
function rendImage() {
    // loading image from HTML element for this level
    let img = document.getElementById(carImage());
    ctx.drawImage(img, x, y, carWidthH, carHeightH);
}


// Draw the sprite of the car on the screen
function drawCarSprite() {

    ctx.beginPath();
    rendImage();
    ctx.stroke();
    ctx.closePath();
}

function rotSprite() {

    ctx.save();


    ctx.translate(x, y);
    ctx.rotate(90 * Math.PI/180);
    rendImage();

    ctx.restore();

}





function draw() {
    hitBox();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaces();
    drawCarSprite();
    x += dx;

    // Counting how many frames rendered - Remove this and the VAR declaration when done
    fraNum += 1;
    // Elements that are not in the Canvas
    document.getElementById("status_box1").innerHTML = "car image: " + carImage();
    document.getElementById("status_box2").innerHTML = "dx: " + dx + "  x: " + x + "  dy: " + dy + "  y: " + y + "  frame number: " + fraNum;

    // Uncomment or comment the following line to animate or stop the car when canvas loads
    requestAnimationFrame(draw);

}

draw();


