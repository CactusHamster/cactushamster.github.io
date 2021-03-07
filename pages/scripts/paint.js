
//Just some fun stuff for when the page loads!

var a = random(1,5)
switch(a){
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


//Page update

var update = setInterval(Update, 0);
function Update() {
	if (canvasclick == true) {
		paint()
	}
}


//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//rgba to hex function from StackOverflow
function rgba2hex (colorString) {
var color = colorString;   //'rgba(249,6,6,1,0)';
var rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
var hex = `#${((1 << 24) + (parseInt(rgba[0]) << 16) + (parseInt(rgba[1]) << 8) + parseInt(rgba[2])).toString(16).slice(1)}`;
//console.log(hex);
return hex
}

function paint() {
brush.fillStyle = color;
brush.beginPath();
brush.arc(mouseX, mouseY, (paintsize*5), 0, 2 * Math.PI);
brush.fill();
}


//Text making function
function drawText (beginx, beginy, text, font) {
	brush.fillStyle = color;
	brush.font = font;
	brush.strokeText(text, beginx, beginy);
}


//Line drawing function
function drawLine (beginx, beginy, endx, endy) {
brush.fillStyle = color;
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}


//Rectangle drawing function
function drawRectangle (beginx, beginy, endx, endy) {
brush.fillStyle = color;
brush.fillRect(beginx, beginy, endx, endy);
}


//Circle drawing function
function drawCircle(beginx, beginy, radius) {
brush.fillStyle = color;
brush.beginPath();
brush.arc(beginx, beginy, radius, 0, 2 * Math.PI);
//brush.stroke();
brush.fill();
}


//Arc drawing function
function drawArc(beginx, beginy, radius, startAng, endAng) {
brush.fillStyle = color;
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
/*
var timeVar = setInterval(CanvasClickQuery, 10);
function CanvasClickQuery() {
  document.getElementById("click").innerHTML = canvasclick;
}*/



colorButton.onclick = function colorChange () {

if (redColor.value < 256) {var red = redColor.value} else {var red = 255}
if (blueColor.value < 256) {var blue = blueColor.value} else {var blue = 255}
if (greenColor.value < 256) {var green = greenColor.value} else {var green = 255}
//if (alphaColor.value < 256) {var alpha = alphaColor.value} else {var alpha = 255}
//color = `rgba(${red},${green},${blue},${alpha},0)`
color = `rgba(${red},${green},${blue},255,0)`
color = rgba2hex(color);
}





function randomColor() {
	var red = random(1,255)
	var green = random(1,255)
	var blue = random(1,255)
	color = `rgba(${red},${green},${blue},255,0)` 
	color = rgba2hex(color);
	return color;
}





function chaos (amount) {
for (i=0; i < amount; i++) {
x = color;
randomColor();
color = randomColor();
drawRectangle(random(1,1000),random(1,500),random(1,1000),random(1,500))
drawCircle(random(1,1000), random(1,500), random(1,300))
drawLine(random(1,1000),random(1,500),random(1,1000),random(1,500))
color = x
}}


var originalX = mouseX
var originalY = mouseY

function mouseDown() {
originalX = mouseX
originalY = mouseY	
paint()
}




function mouseUp() {
brush.fillStyle = color; //Sets color of brush to the chosen color
/*
var x,y = originalX, originalY;

//for (y<mouseY; y++;) {
brush.beginPath();
brush.arc(x, y, paintsize*5, 0, 2 * Math.PI);
brush.fill();
///}


brush.beginPath();
brush.arc(originalX, originalY, paintsize*5, 0, 2 * Math.PI);
brush.fill();
*/
}