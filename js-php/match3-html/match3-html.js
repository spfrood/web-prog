// game dimensions: width="260", height="370" is best for mobile displays
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS



// array to hold all the possible colors of tiles
const colorList = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF"
];

// default width and height of tiles
const tWidth = 30;
const tHeight = 30;

// Arrays - one for original tiles, and a duplicate used when checking matches
var tiles = [];
var allTiles = [];

var matches = 0;

var vMatch = false;
var hMatch = false;

var startButton = new Tile_data("#738448", 40, 270);

var step = 0;
var stepText = "";
var frameNo = 0;

// Create tile object that holds coordinates and color data for each tile
function Tile_data(tile_color, x_cord, y_cord) {
    this.color = tile_color;
    this.xPixel = x_cord;
    this.yPixel = y_cord;
}

// Return a random color from the color list
function findColor() {
    let temp = Math.floor(6 * Math.random());
    return colorList[temp];
}

// Copy the original color values from the game field into an array to use
// and manipulate while leaving the original gamefield unaltered
function setColors(arrayName) {
    for (i = 0; i < 8; i++) {
        arrayName[i] = [];
        for (j = 0; j < 8; j++) {
            arrayName[i][j] = allTiles[i][j].color;
        }
    }
}

// Copy a 2D array into a NEW 2D array ** Target array should only be standars array, 
// the 2D array aspect will be added during the copy process. Do not use for 2D -> 2D copy
function cloneArray(parentArray, newArray) {
    for (i = 0; i < 8; i++) {
        newArray[i] = [];
        for (j = 0; j < 8; j++) {
            newArray[i][j] = parentArray[i][j];
        }
    }
}


// Format text field to display values of 2D array as text suitable to printing to DOM
function dispArray(arrayName) {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += '<span style="color:' + arrayName[i][j] + '">'
            text += arrayName[i][j] + "</span> ";
        }
        text += "</br>";
    }
    return text;
}

// function to display values of tiles object as text suitable to printing to DOM
function dispTiles() {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += '<span style="color:' + allTiles[i][j].color + '">';
            text += allTiles[i][j].color + " x: " + allTiles[i][j].xPixel + " y: " + allTiles[i][j].yPixel + "</span> ";
        }
        text += "</br>";
    }
    return text;
}

// function to display values of tiles object as tiles in table
function dispTable() {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            document.getElementById("R" + i + "C" + j).innerHTML = "<button style='background-color:" + allTiles[i][j].color + ";width:30px;height:30px'></button>";
        }
        text += "</br>";
    }
    return text;
}

// Assign colors to the main gamefield and calculate x, y coordinate of each tile
function createBoard() {
    // below loops assign colored tiles to gameboard object (allTiles) according to values in tiles array
    for (i = 0; i < 8; i++) {
        allTiles[i] = [];
        for (j = 0; j < 8; j++) {
            allTiles[i][j] = new Tile_data(findColor(), j * tHeight + 11, i * tWidth + 11);
        }
    }
}

// function to give new color to matched tiles
function newColors() {
    // below loops gives a new color to white tiles
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (allTiles[i][j].color == "#FFFFFF") {
                allTiles[i][j].color = findColor();
            }
        }
    }
    // copy new colors to the tiles array 
    setColors(tiles);
}

// Loop through to check for vertical matches, then assign matched squares on temp array
// Then check for horizontal matches and assign values to temp array
function checkMatch() {
    setColors(tiles);
    // loop through checking for horizontal matches
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] == tiles[i][j + 1] && tiles[i][j] == tiles[i][j + 2] && j + 2 < 8 && tiles[i][j] != "#FFFFFF") {
                if (tiles[i][j] == tiles[i][j + 3] && j + 3 < 8) {
                    if (tiles[i][j] == tiles[i][j + 4] && j + 4 < 8) {
                        if (tiles[i][j] == tiles[i][j + 5] && j + 5 < 8) {
                            if (tiles[i][j] == tiles[i][j + 6] && j + 6 < 8) {
                                if (tiles[i][j] == tiles[i][j + 7] && j + 7 < 8) {
                                    allTiles[i][j + 7].color = "#FFFFFF";
                                }
                                allTiles[i][j + 6].color = "#FFFFFF";
                            }
                            allTiles[i][j + 5].color = "#FFFFFF";
                        }
                        allTiles[i][j + 4].color = "#FFFFFF";
                    }
                    allTiles[i][j + 3].color = "#FFFFFF";
                }
                allTiles[i][j].color = "#FFFFFF";
                allTiles[i][j + 1].color = "#FFFFFF";
                allTiles[i][j + 2].color = "#FFFFFF";
                matches++;
                hMatch = true;
            }
        }
    }
    // loop through checking for vertical matches
    for (i = 0; i < 6; i++) {
        for (j = 0; j < 8; j++) {
            if (tiles[i][j] == tiles[i + 1][j] && tiles[i][j] == tiles[i + 2][j] && i + 2 < 8 && tiles[i][j] != "#FFFFFF") {
                if (i + 3 < 8) {
                    if (tiles[i][j] == tiles[i + 3][j]) {
                        if (i + 4 < 8) {
                            if (tiles[i][j] == tiles[i + 4][j]) {
                                if (i + 5 < 8) {
                                    if (tiles[i][j] == tiles[i + 5][j]) {
                                        if (i + 6 < 8) {
                                            if (tiles[i][j] == tiles[i + 6][j]) {
                                                if (i + 7 < 8) {
                                                    if (tiless[i][j] == tiles[i + 7][j]) {
                                                        allTiles[i + 7][j].color = "#FFFFFF";
                                                    }
                                                }
                                                allTiles[i + 6][j].color = "#FFFFFF";
                                            }
                                        }
                                        allTiles[i + 5][j].color = "#FFFFFF";
                                    }
                                }
                                allTiles[i + 4][j].color = "#FFFFFF";
                            }
                        }
                        allTiles[i + 3][j].color = "#FFFFFF";
                    }
                }
                allTiles[i][j].color = "#FFFFFF";
                allTiles[i + 1][j].color = "#FFFFFF";
                allTiles[i + 2][j].color = "#FFFFFF";
                matches++;
                vMatch = true;
            }
        }
    }
    setColors(tiles);
}

// Move matched tiles to the top of field (prepare to remove them)
function moveMatched() {
    vMatch = false;
    hMatch = false;
    for (col = 0; col < 8; col++) {
        let temp = "";
        for (row = 7; row >= 0; row--) {
            if (row > 0 && allTiles[row][col].color == "#FFFFFF") {
                if (row - 1 >= 0 && allTiles[row - 1][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 1][col].color;
                    allTiles[row - 1][col].color = temp;
                    temp = "";
                } else if (row - 2 >= 0 && allTiles[row - 2][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 2][col].color;
                    allTiles[row - 2][col].color = temp;
                    temp = "";
                } else if (row - 3 >= 0 && allTiles[row - 3][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 3][col].color;
                    allTiles[row - 3][col].color = temp;
                    temp = "";
                } else if (row - 4 >= 0 && allTiles[row - 4][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 4][col].color;
                    allTiles[row - 4][col].color = temp;
                    temp = "";
                } else if (row - 5 >= 0 && allTiles[row - 5][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 5][col].color;
                    allTiles[row - 5][col].color = temp;
                    temp = "";
                } else if (row - 6 >= 0 && allTiles[row - 6][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 6][col].color;
                    allTiles[row - 6][col].color = temp;
                    temp = "";
                } else if (row - 7 >= 0 && allTiles[row - 7][col].color != "#FFFFFF") {
                    temp = allTiles[row][col].color;
                    allTiles[row][col].color = allTiles[row - 7][col].color;
                    allTiles[row - 7][col].color = temp;
                    temp = "";
                }
            }
        }
    }
    setColors(tiles);
    checkMatch();
}

// Function that controls drawing and display of items on the gamefield
function fieldController() {

    switch (step) {
        case 0:
            checkMatch();
            dispTable();
            stepText = "Check matches, Display Table, end step 0";
            step++;
            break;
        case 1:
            frameNo++;
            moveMatched();
            document.getElementById("status_box2").innerHTML = "Repeats: (using frameNo) " + frameNo;
            dispTable();
            
            if (vMatch || hMatch) {
                step = 1;
                stepText = "Move Matches, repeat again, repeat step 1";
            } else {
                step++;
                stepText = "No Moves, No repeate, end step 1"
            }
            break;
        case 2:
            newColors();
            dispTable();
            stepText = "Added new colors, disp new table, end step 2";
            step++;
            break;

        default:
            stepText = "No more steps, going back to step 0";
            step = 0;
    }

    document.getElementById("status_box1").innerHTML = stepText;
    //document.getElementById("status_box2").innerHTML = "Matches: " + matches;
    document.getElementById("status_box3").innerHTML = "vMatch: " + vMatch + "  hMatch: " + hMatch;
    document.getElementById("status_box4").innerHTML = "Frame Number: " + frameNo + " Next Step: " + step + " Matches: " + matches;
    document.getElementById("status_box5").innerHTML = "Array Values: </br>" + dispArray(tiles);
    document.getElementById("status_box6").innerHTML = "All Tiles Object: </br>" + dispTiles(allTiles);

}

function nextStep() {
    fieldController();
}

// Assign each tile a color - Run only once each game when starting a game.
createBoard();
// Copy the original color values from the game field into an array
setColors(tiles);
dispTable();