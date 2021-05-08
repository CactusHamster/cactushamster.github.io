var fpsCap = 100
var playerColor = 'lime';
var brush = Canvas.getContext('2d');
var mouseX, mouseY
var keyvents = []; //Gotta love the pun
var keyFunctions = [];
var keyvents2 = []; //Gotta love the pun
var keyFunctions2 = [];

var course = []



course.forEach(function (currentValue, index) {
	
	
	
	
	
	
})


function courseRec(x, y, width, height) {
	var courseRectangle = [x, y, width, height]
	course.push(courseRectangle)
}




var square = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	size: 10,
	maxSpeed: 0.5,
	speedStep: 0.5,
	color: 'lime',
	fallSpeed: 0.01,
	jumpHeight: 1,
	jumpAllowed: true,
	jump: false,
	move: function () {
		brush.fillStyle = 'white';
		brush.fillRect(0, 0, Canvas.width, Canvas.height);
		brush.fillStyle =square.color;
	
		if (square.x < 0 & square.vx < 0) {square.vx = 0}
		else if (square.x > Canvas.width-square.size & square.vx > 0) {square.vx = 0}
		else {square.x = square.x+square.vx;}
		
		if (square.y < 0 & square.vy < 0) {square.vy = 0}
		else if (square.y > Canvas.height-square.size & square.vy > 0) {square.vy = 0}
		else {square.y = square.y+square.vy;}

		square.jumpAllowed = square.y > Canvas.height-square.size

		brush.fillRect(square.x, square.y, square.size, square.size)	
		}
		
}






//Function to make events with keys
function keyon(key, action) {
	keyvents.push(key)
	keyFunctions.push(action)
}

//Efficient way to register key events (inspired by my homemade discord bot framework)
this.addEventListener('keydown', event => {
	/*console.log(event)
	console.log(event.key)
	console.log(event.keyCode)*/
	keyvents.forEach(function (currentValue, index) {
	if (currentValue == event.key) {
		keyFunctions[index]()}
	});
})









function keyoff(key, action) {
	keyvents2.push(key)
	keyFunctions2.push(action)
}

//Efficient way to register key events (inspired by my homemade discord bot framework)
this.addEventListener('keyup', event => {
	/*console.log(event)
	console.log(event.key)
	console.log(event.keyCode)*/
	keyvents2.forEach(function (currentValue, index) {
	if (currentValue == event.key) {
		keyFunctions2[index]()}
	});
})





//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}








/*
drawLine(0,0,500,500)
drawLine(0,0,200,300)
*/


/*onmousemove = function(e){mouseX = e.clientX; mouseY = e.clientY;}*/



//Check for mouse movement
Canvas.onmousemove = function (e) {
	console.log('moving. . .')
	//console.log(this.width)
}









/*
brush.font = "30px Arial";
brush.strokeText("Hai", 10, 50);
*/

function drawLine (beginx, beginy, endx, endy) {
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}


function jump() {
square.jump = true	
setTimeout(function () {
	square.jump = false;
}, 100)
}





function gravity() {
	if (square.jump == false) {
	square.vy = square.vy+square.fallSpeed; }
	else {
	square.vy = 0-square.jumpHeight*1
	}
}



keyon('s', function() {
	if (square.vy < square.maxSpeed & square.y < Canvas.height) {
	square.vy=square.vy+square.maxSpeed }
})

keyon('w', function() {/*
	if (square.vy > square.maxSpeed-(2*square.maxSpeed) & square.y > 0) {
	square.vy=square.vy-square.maxSpeed }*/
	
	
	if (square.jumpAllowed) {
		jump();
		square.jumpAllowed = false;
		}
	
})

keyon('a', function() {
	if (square.vx > square.maxSpeed-(2*square.maxSpeed) & square.x > 0) {
	square.vx=square.vx-square.maxSpeed }
})
keyoff('a', function() {
	square.vx=0
})




keyon('d', function() {
	if (square.vx < square.maxSpeed & square.x < Canvas.width) {
	square.vx=square.vx+square.maxSpeed }
})
keyoff('d', function () {
	square.vx=0
})





//Page update
var update = setInterval(Update, 100/fpsCap);
function Update() {
square.move()
gravity()
}



