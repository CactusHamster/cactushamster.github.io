var squarex = 0
var squarey = 0
var squarevx = 1
var square vy = 1



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










//Page update
var update = setInterval(Update, 1);
function Update() {

}





console.log('Hai there')
/*
brush.font = "30px Arial";
brush.strokeText("Hai", 10, 50);
*/

function drawLine (beginx, beginy, endx, endy) {
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}


function square () {
	
	
	
	
}





function canvasDraw() {
console.log('Canvas was clicked!')	
}


