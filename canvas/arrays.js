var tiles = [];

var colorList = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF"
];

function findColor() {
    let temp = Math.floor(6 * Math.random());
    return colorList[temp];
}

function fillArray() {
    for (i = 0; i < 8; i++) {
        tiles[i] = [];
        for (j = 0; j < 8; j++) {
            tiles[i][j] = findColor();
            // ctx.fillStyle = findColor();
            // ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2); 
        }
    }
}

function display() {
    fillArray();
    let text = "";
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            text += tiles[i][j] + " ";
        }
        text += "</br>";
    }
    document.getElementById("status_box1").innerHTML = "Tiles Array Values: </br>" + text;

}

display();