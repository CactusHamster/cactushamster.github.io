//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

drawLine(0,0,500,500)
drawLine(0,0,200,300)



//Adds ] press event
this.addEventListener('keypress', event => {
  if (event.keyCode == 13) {
    alert('hi.')
  }
})





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




//Page update
var update = setInterval(Update, 1);
function Update() {

}





console.log('Hai there')

brush.font = "30px Arial";
brush.strokeText("Hai", 10, 50);


function drawLine (beginx, beginy, endx, endy) {
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}


function paint() {
}





function canvasDraw() {
console.log('Canvas was clicked!')	
}


