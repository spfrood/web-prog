// canvas dimension: width="260", height="370"
// https://dev.to/oinak/step-by-step-tetris-on-es6-and-canvas-dob
// https://www.w3schools.com/graphics/game_intro.asp

var frameNo = 0;
var matches = 0;

var canvas = document.getElementById("matchCan");
var ctx = canvas.getContext("2d");

// array to hold all the possible colors of tiles
var colorList = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF"
];

// the width of each tile
const tWidth = 30;
const tHeight = 30;

// Arrays - one for original tiles, and a duplicate used when checking matches
// Another array to keep track of original game state
var tiles = [];
var tempTiles = [];
var origArray = [];


// This function controls the game
function startGame() {
    checkMatches();

    drawScene();
}

// assign a random color to each tile
function setTiles() {
    for (i = 0; i < 8; i++) {
        tiles[i] = [];
        for (j = 0; j < 8; j++) {
            tiles[i][j] = findColor();
        }
    }
}

// Copy the original tile states to a duplicate array
function initTemp() {
    for (i = 0; i < 8; i++) {
        tempTiles[i] = [];
        for (j = 0; j < 8; j++) {
            tempTiles[i][j] = tiles[i][j];
        }
    }
}

// Copy the verticle matches to the originall array
function copyMatch() {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (tempTiles[i][j] == "#FFFFFF") {
                tiles[i][j] = tempTiles[i][j];
            }
        }
    }
}

// Return a random color
function findColor() {
    let temp = Math.floor(6 * Math.random());
    return colorList[temp];
}

// function to display values of arrays as text suitable to printing to DOM
function dispArray(arrayName) {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += arrayName[i][j] + " ";
        }
        text += "</br>";
    }
    return text;
}

// check for horizontal matches
function checkHoriz() {
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] == tiles[i][j + 1] && tiles[i][j] == tiles[i][j + 2] && j + 2 < 8 && tiles[i][j] != "#FFFFFF") {
                if (tiles[i][j] == tiles[i][j + 3] && j + 3 < 8) {
                    if (tiles[i][j] == tiles[i][j + 4] && j + 4 < 8) {
                        if (tiles[i][j] == tiles[i][j + 5] && j + 5 < 8) {
                            if (tiles[i][j] == tiles[i][j + 6] && j + 6 < 8) {
                                if (tiles[i][j] == tiles[i][j + 7] && j + 7 < 8) {
                                    tiles[i][j + 7] = "#FFFFFF";
                                }
                                tiles[i][j + 6] = "#FFFFFF";
                            }
                            tiles[i][j + 5] = "#FFFFFF";
                        }
                        tiles[i][j + 4] = "#FFFFFF";
                    }
                    tiles[i][j + 3] = "#FFFFFF";
                }
                tiles[i][j] = "#FFFFFF";
                tiles[i][j + 1] = "#FFFFFF";
                tiles[i][j + 2] = "#FFFFFF";
                matches++;
            }
        }
    }
}

// check for verticle matches
function checkVert() {
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 8; j++) {
            if (tempTiles[i][j] === tempTiles[i + 1][j] && tempTiles[i][j] === tempTiles[i + 2][j] && i + 2 < 8 && tempTiles[i][j] != "#FFFFFF") {
                if (i + 3 < 8) {
                    if (tempTiles[i][j] === tempTiles[i + 3][j]) {
                        if (i + 4 < 8) {
                            if (tempTiles[i][j] === tempTiles[i + 4][j]) {
                                if (i + 5 < 8) {
                                    if (tempTiles[i][j] === tempTiles[i + 5][j]) {
                                        if (i + 6 < 8) {
                                            if (tempTiles[i][j] === tempTiles[i + 6][j]) {
                                                if (i + 7 < 8) {
                                                    if (tempTiles[i][j] === tempTiles[i + 7][j]) {
                                                        tempTiles[i + 7][j] = "#FFFFFF";
                                                    }
                                                }
                                                tempTiles[i + 6][j] = "#FFFFFF";
                                            }
                                        }
                                        tempTiles[i + 5][j] = "#FFFFFF";
                                    }
                                }
                                tempTiles[i + 4][j] = "#FFFFFF";
                            }
                        }
                        tempTiles[i + 3][j] = "#FFFFFF";
                    }
                }
                tempTiles[i][j] = "#FFFFFF";
                tempTiles[i + 1][j] = "#FFFFFF";
                tempTiles[i + 2][j] = "#FFFFFF";
                matches++;
            }
        }
    }
}

function checkMatches() {
    checkHoriz();
    checkVert();
    copyMatch();
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // below loops draw colored tiles on screen according to values in tiles array
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            ctx.fillStyle = tiles[i][j];
            ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2);
        }
    }

    frameNo++;
}

// Copy original array to a duplicate
function cloneArray() {
    for (i = 0; i < 8; i++) {
        origArray[i] = [];
        for (j = 0; j < 8; j++) {
            origArray[i][j] = tiles[i][j];
        }
    }
}


setTiles();
cloneArray();
initTemp();
startGame();

document.getElementById("status_box1").innerHTML = "Original Tile layout: </br>" + dispArray(origArray);
document.getElementById("status_box3").innerHTML = "Matches:  " + matches;
document.getElementById("status_box4").innerHTML = "tempTiles: </br>" + dispArray(tempTiles);
document.getElementById("status_box5").innerHTML = "tiles (current display): </br>" + dispArray(tiles);

//setInterval(startGame, 200);