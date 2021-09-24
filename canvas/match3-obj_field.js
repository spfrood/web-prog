// canvas dimension: width="260", height="370"
// https://dev.to/oinak/step-by-step-tetris-on-es6-and-canvas-dob
// https://www.w3schools.com/graphics/game_intro.asp

var frameNo = 0;
var matches = 0;
var tileVals = "";

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
var tiles = [];
var tempTiles = [];
// for reference to check things afterwards
var origArray = [];
var matchedArray = [];

// assign a random color to each tile
function setTiles() {
    for (i = 0; i < 8; i++) {
        tiles[i] = [];
        for (j = 0; j < 8; j++) {
            tiles[i][j] = findColor();
        }
    }
}

// Copy one array to a duplicate 2D array
function cloneArray(parentArray, newArray) {
    for (i = 0; i < 8; i++) {
        newArray[i] = [];
        for (j = 0; j < 8; j++) {
            newArray[i][j] = parentArray[i][j];
        }
    }
}


// Copy the vertical matches to the original array
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
            text += '<span style="color:' + arrayName[i][j] + '">';
            text += arrayName[i][j] + "</span> ";
        }
        text += "</br>";
    }
    return text;
}

// Loop through to check for vertical matches, then assign matched squares on temp array
// Then check for horizontal matches and assign values to temp array
function checkMatch() {
    // loop through checking for horizontal matches
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] == tiles[i][j + 1] && tiles[i][j] == tiles[i][j + 2] && j + 2 < 8 && tiles[i][j] != "#FFFFFF") {
                if (tiles[i][j] == tiles[i][j + 3] && j + 3 < 8) {
                    if (tiles[i][j] == tiles[i][j + 4] && j + 4 < 8) {
                        if (tiles[i][j] == tiles[i][j + 5] && j + 5 < 8) {
                            if (tiles[i][j] == tiles[i][j + 6] && j + 6 < 8) {
                                if (tiles[i][j] == tiles[i][j + 7] && j + 7 < 8) {
                                    tempTiles[i][j + 7] = "#FFFFFF";
                                }
                                tempTiles[i][j + 6] = "#FFFFFF";
                            }
                            tempTiles[i][j + 5] = "#FFFFFF";
                        }
                        tempTiles[i][j + 4] = "#FFFFFF";
                    }
                    tempTiles[i][j + 3] = "#FFFFFF";
                }
                tempTiles[i][j] = "#FFFFFF";
                tempTiles[i][j + 1] = "#FFFFFF";
                tempTiles[i][j + 2] = "#FFFFFF";
                matches++;
            }
        }
    }
    // loop through checking for vertical matches
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] === tiles[i + 1][j] && tiles[i][j] === tiles[i + 2][j] && i + 2 < 8 && tiles[i][j] != "#FFFFFF") {
                if (i + 3 < 8) {
                    if (tiles[i][j] === tiles[i + 3][j]) {
                        if (i + 4 < 8) {
                            if (tiles[i][j] === tiles[i + 4][j]) {
                                if (i + 5 < 8) {
                                    if (tiles[i][j] === tiles[i + 5][j]) {
                                        if (i + 6 < 8) {
                                            if (tiles[i][j] === tiles[i + 6][j]) {
                                                if (i + 7 < 8) {
                                                    if (tiless[i][j] === tiles[i + 7][j]) {
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

function moveMatched() {
    for (col = 0; col < 8; col++) {
        let temp = "";
        for (row = 7; row >= 0; row--) {
            if (row > 0 && tiles[row][col] == "#FFFFFF") {
                if (row - 1 >= 0 && tiles[row - 1][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 1][col];
                    tiles[row - 1][col] = temp;
                    temp = "";
                } else if (row - 2 >= 0 && tiles[row - 2][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 2][col];
                    tiles[row - 2][col] = temp;
                    temp = "";
                } else if (row - 3 >= 0 && tiles[row - 3][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 3][col];
                    tiles[row - 3][col] = temp;
                    temp = "";
                } else if (row - 4 >= 0 && tiles[row - 4][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 4][col];
                    tiles[row - 4][col] = temp;
                    temp = "";
                } else if (row - 5 >= 0 && tiles[row - 5][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 5][col];
                    tiles[row - 5][col] = temp;
                    temp = "";
                } else if (row - 6 >= 0 && tiles[row - 6][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 6][col];
                    tiles[row - 6][col] = temp;
                    temp = "";
                } else if (row - 7 >= 0 && tiles[row - 7][col] != "#FFFFFF") {
                    temp = tiles[row][col];
                    tiles[row][col] = tiles[row - 7][col];
                    tiles[row - 7][col] = temp;
                    temp = "";
                }
            } 
        }
    }
}

function checkMatches() {
    checkMatch();
    copyMatch();
    moveMatched();
}

function drawScene() {
    // below loops draw colored tiles on screen according to values in tiles array
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            ctx.fillStyle = tiles[i][j];
            ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2);
        }
    }
    frameNo++;
}

// This function controls the game
function fieldController() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    checkMatches();

    drawScene();
    // requestAnimationFrame(fieldController);

    document.getElementById("status_box1").innerHTML = "Original Array: </br>" + dispArray(origArray);
    document.getElementById("status_box2").innerHTML = "Matches: </br>" + dispArray(tempTiles);
    document.getElementById("status_box3").innerHTML = "Current Display: </br>" + dispArray(tiles);
    document.getElementById("status_box4").innerHTML = "Values:  " + matches;
    document.getElementById("status_box5").innerHTML = "Frame:  " + frameNo;
    document.getElementById("status_box6").innerHTML = "X/Y Coords of tiles:  </br>" + tileVals;

}


// Assign each tile a color
setTiles();
// temp array for checking verticle matches
cloneArray(tiles, tempTiles);


// copy beginning-state of tiles to new array to use as reference for later
// to verify matching/moving is going correctly
cloneArray(tiles, origArray);






fieldController();