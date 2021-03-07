
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}






//Just a simple clock script
var timeVar = setInterval(Time, 1000);

function Time() {
  var d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}


//Tells me what canvasclick is at
var timeVar = setInterval(CanvasClickQuery, 1000);
function CanvasClickQuery() {
  document.getElementById("click").innerHTML = canvasclick;
}



/*
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
*/



console.log('Hoi')

Draw.font = "30px Arial";
Draw.strokeText("Hai", 10, 50);

Draw.moveTo(0, 0);
Draw.lineTo(500, 300);
Draw.stroke();




function canvasDraw() {
console.log('Canvas was clicked!')	
}


