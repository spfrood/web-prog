/* 
 Created on : Sep 18, 2017, 6:28:09 PM
 Author     : Head First Javascript Example Project
 */


function viewObject() {

}

viewObject.prototype.displayMessage = function (msg) {
    var messageArea = document.getElementById("messageArea");
    messageArea.innerHTML = msg;
};

viewObject.prototype.displayHit=function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
};

viewObject.prototype.displayMiss=function (location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
};


var view = new viewObject();


//var view = {
//    displayMessage: function(msg) {
//        var messageArea = document.getElementById("messageArea");
//        messageArea.innerHTML = msg;
//    },
//
//    displayHit: function(location) {
//        var cell = document.getElementById(location);
//        cell.setAttribute("class", "hit");
//    },
//
//displayMiss: function (location) {
//    var cell = document.getElementById(location);
//    cell.setAttribute("class", "miss");
//}
//
//}; 