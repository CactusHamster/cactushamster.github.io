
//Just some fun stuff for when the page loads!

var x = random(1,5)
switch(x){
	case 1:
	console.log('Hi there!'); break;
	case 2:
	console.log('Why, hello there!'); break;	
	case 3:
	console.log('Hai!'); break;
	case 4:
	console.log('🙄✋'); break;
	case 5:
	console.log('hehe'); break;
}
function chaos (amount) {
for (i=0; i < amount; i++) {
drawLine(random(0,1000),random(0,1000),random(0,1000),random(0,1000))
}
}

//Page update
var update = setInterval(Update, 1);
function Update() {

}


//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//Text making function
function drawText (beginx, beginy, text, font) {
	brush.fillStyle = "#FF0000";
	brush.font = font;
	brush.strokeText(text, beginx, beginy);
}


//Line drawing function
function drawLine (beginx, beginy, endx, endy) {
brush.fillStyle = "#FF0000";
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}


//Rectangle drawing function
function drawRectangle (beginx, beginy, endx, endy) {
brush.fillStyle = "#FF0000";
brush.fillRect(beginx, beginy, endx, endy);
}


//Circle drawing function
function drawCircle(beginx, beginy, radius) {
brush.beginPath();
brush.arc(beginx, beginy, radius, 0, 2 * Math.PI);
brush.stroke();
}


//Arc drawing function
function drawArc(beginx, beginy, radius, startAng, endAng) {
brush.beginPath();
brush.arc(beginx, beginy, radius, startAng, endAng);
brush.stroke();
}






//Just a simple clock script
var timeVar = setInterval(Time, 1000);

function Time() {
  var d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}


//Tells me what canvasclick is at
var timeVar = setInterval(CanvasClickQuery, 10);
function CanvasClickQuery() {
  document.getElementById("click").innerHTML = canvasclick;
}









function paint() {
brush.fillStyle = "#FF0000";
brush.beginPath();
brush.arc(mouseX, mouseY, (paintSize*5), 0, 2 * Math.PI);
brush.stroke();
}




