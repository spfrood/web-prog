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

const tWidth = 10;
const tHeight = 10;

// Arrays - one for original tiles, and a duplicate used when checking matches
var tiles = [];
var allTiles = [];

// assign a random color to each tile
function setColors(arrayName) {
    for (i = 0; i < 8; i++) {
        arrayName[i] = [];
        for (j = 0; j < 8; j++) {
            arrayName[i][j] = findColor();
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
            text += '<span style="color:' + arrayName[i][j] + '">'
            text += arrayName[i][j] + "</span> ";
        }
        text += "</br>";
    }
    return text;
}

function Tile_data(tile_color, x_cord, y_cord) {
    this.color = tile_color;
    this.x = x_cord;
    this.y = y_cord;
}

function createBoard(arrayName) {
    // below loops draw colored tiles on screen according to values in tiles array
    for (i = 0; i < 8; i++) {
        arrayName[i] = [];
        for (j = 0; j < 8; j++) {
            arrayName[i][j] = new Tile_data(findColor(), i, j);
        }
    }
}

// function to display values of tiles object as text suitable to printing to DOM
function dispTiles(arrayName) {
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += '<span style="color:' + arrayName[i][j].color + '">'
            text += arrayName[i][j].color + " x: " + arrayName[i][j].x + " y: " + arrayName[i][j].y + "</span> ";
        }
        text += "</br>";
    }
    return text;
}



// Assign each tile a color
setColors(tiles);
createBoard(allTiles);

document.getElementById("status_box1").innerHTML = "Array Values: </br>" + dispArray(tiles);
document.getElementById("status_box2").innerHTML = "All Tiles Object: </br>"  + dispTiles(allTiles);