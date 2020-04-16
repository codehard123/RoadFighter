
var carSpeed =2;
var breakcarspeed = 2;
function Update() {
    console.log("123456");
    $('.left-game-container').scrollTop($('.left-game-container').scrollTop() - carSpeed);
    $('.right-game-container').scrollTop($('.right-game-container').scrollTop() - carSpeed);
    $('.road-container').scrollTop($('.right-game-container').scrollTop() - carSpeed);

}

var amount=10;
var borderLeft = 320;
var borderRight = 590;
var time = 80000;
var timeBreak = time*0.1;

var totalCars = 100;
var spacing = 200;
var leftBoundary = 20;
var rightBoundary = 280;
var offset = 400;
var score = 0;
var crashingDistance = 20;
var bottomBoundary = 40000 - offset;
var isPlaying = true;
$(document).ready(function () {

    console.log(bottomBoundary);
    var cars = 1;
    var carArray = [];
    var listA = Random();
    carArray.push(listA);
    while (cars < totalCars) {
        var createPoint = Random();
        var taken = true;
        for (var i = 0; i < carArray.length; i++)
{
    if (euclidean(createPoint[0], createPoint[1], carArray[i][0], carArray[i][1]) < spacing)
        taken = false;
}
if (taken) {
    cars = cars + 1;
    carArray.push(createPoint);
}
    }
    console.log(carArray);
    for (var i = 0; i < totalCars; i++) {
        console.log("dsd");
        $('.enemy-cars').append("<img src='yellow_car.png'class='enemy' style='position:absolute; top:" + carArray[i][1].toString() + "px;z-index:7;left:" + carArray[i][0].toString() + "px' />")
    }
    
    $(".left-game-container").scrollTop($('.left-sidestep').height());
    
    $(".right-game-container").scrollTop($('.right-sidestep').height());
    
    $(".road-container").scrollTop($('.road').height());
    
   
    window.setInterval(function () {
        score = score + 0.01;
        var elem = document.getElementById('car');
        var rect = elem.getBoundingClientRect();
        
        var enemyCars = document.getElementsByClassName("enemy");
        for (var i = 0; i < totalCars;i++) {
            var rectenemy = enemyCars[i].getBoundingClientRect();
            if (euclidean(rectenemy.left, rectenemy.top, rect.left, rect.top) < crashingDistance) {

                alert("Score is ," + Math.floor(score).toString());
                window.location.reload();
            }
        }
    },5)

    window.setInterval(Update,1); 
});


function euclidean(a, b, c, d) {
    var d1 = Math.pow(a - c, 2);
    var d2 = Math.pow(b - d, 2);
    var dist = Math.sqrt(d1 + d2);
    return dist;
}
$(document).keypress(function (e) {

    left = parseInt($("#car").css("left").substring(0, 3));
    console.log(e.keyCode);
    if (e.keyCode == 97 && left > borderLeft)
        $("#car").css("left", (left - 5).toString() + "px");
    if (e.keyCode == 100 && left < borderRight)
        $("#car").css("left", (left + 5).toString() + "px");
    if (e.keyCode == 32) {
        console.log("SPace");
        
    }


});
$(document).keyup(function (e) {
    if (e.keyCode == 32) {
        
    }
});

function Random() {

    return [Math.floor(Math.random() * (rightBoundary - leftBoundary + 1) + leftBoundary), Math.floor(Math.random() * (bottomBoundary+1))];

}
