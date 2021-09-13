
// canvas dimension: width="260", height="370"
// https://dev.to/oinak/step-by-step-tetris-on-es6-and-canvas-dob
// https://www.w3schools.com/graphics/game_intro.asp

var frameNo = 0;
var matches = 0;

var canvas = document.getElementById("matchCan");
var ctx = canvas.getContext("2d");

var colorList = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF" 
];

tWidth = 30;
tHeight = 30;

var tiles = [];

function startGame() {
    drawScene();
}

function setTiles() {
    for (i = 0; i < 8; i++) {
        tiles[i] = [];
        for (j = 0; j < 8; j++) {
            tiles[i][j] = findColor();
            // ctx.fillStyle = findColor();
            // ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2); 
        }
    }
}

function findColor () {
    let temp = Math.floor(6 * Math.random());
    return colorList[temp];
}

function dispArray() {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += tiles[i][j] + " ";
        }
        text += "</br>";
    }
    return text;
}

function checkMatch () {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] == tiles[i][j+1] && tiles[i][j] == tiles[i][j+2] && tiles[i][j] != "#FFFFFF") {
                tiles[i][j] = "#FFFFFF";
                tiles[i][j+1] = "#FFFFFF";
                tiles[i][j+2] = "#FFFFFF";
                ctx.fillStyle = "#FFFFFF";
                matches++;
                drawScene();
            }
        }
    }
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("status_box2").innerHTML = "Tiles Array Values: </br>" + dispArray();
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++){
            ctx.fillStyle = tiles[i][j];
            ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2); 
        }
    }
    checkMatch();


    document.getElementById("status_box1").innerHTML = "Color options:  " + colorList;
    document.getElementById("status_box2").innerHTML = "Tiles Array Values: </br>" + dispArray();
    document.getElementById("status_box3").innerHTML = "Frame Number:  " + frameNo;
    document.getElementById("status_box4").innerHTML = "Matches:  " + matches;


    frameNo++;
}

setTiles();
startGame();

//setInterval(startGame, 200);


