
// canvas dimension: width="260", height="370"
// https://dev.to/oinak/step-by-step-tetris-on-es6-and-canvas-dob



var canvas = document.getElementById("matchCan");
var ctx = canvas.getContext("2d");

var tiles = [];
var colorList = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF" 
];
var rColor;

tWidth = 30;
tHeight = 30;

buff = 10;

var playField = {

}

function component (xTile, yTile, color) {
    this.x = xTile;
    this.y = yTile;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, tWidth, tHeight);



}

function findColor () {
    let temp = Math.floor(6 * Math.random());

    return colorList[temp];
}






function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++){
            rColor = findColor();
            ctx.fillStyle = rColor;
            ctx.fillRect(j * tWidth + 11, i * tHeight + 11, tWidth - 2, tHeight - 2); 
        }
    }

    document.getElementById("status_box1").innerHTML = "Color options:  " + colorList;


}

drawScene();


