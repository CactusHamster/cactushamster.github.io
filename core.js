var fpsCap = 100
var playerColor = 'lime';
var brush = Canvas.getContext('2d');
var mouseX, mouseY
brush.lineCap = 'round';
brush.translate(0.5, 0.5);
var course = []


function clear () {
	brush.fillStyle = 'white';
	brush.fillRect(0, 0, Canvas.width, Canvas.height);
}


function courseRec(x, y, width, height, color = 'black', type = 'normal') {
	var courseRectangle = {
	x: x,
	y: Canvas.height - y - height,
	width: width,
	height:height,
	type: type,
	color: color
	}
	course.push(courseRectangle)
}




var square = {
	x: 0, //Spawn X
	y: Canvas.height-40, //Spawn Y
	vx: 0,
	vy: 0,
	size: 40,
	maxSpeed: 2,
	color: 'lime',
	fallSpeed: 0.04,
	jumpSpeed: 0.3,
	jumpLength: 100,
	jumpAllowed: true,
	terminalVelocity: 0.5,
	jump: false,
	move: function () {
		var floored = false;
		var touching = 'none';
		
		brush.fillStyle =square.color;
		
		
		if (square.x < 0 & square.vx < 0) {square.vx = 0}//Canvas x border barrier
		else if (square.x > Canvas.width-square.size & square.vx > 0) {square.vx = 0}
		else {square.x = square.x+square.vx;}
		
		
		
		for (var i of course) { //Check for course rectangles
			var startx = i.x;
			var starty = i.y;
			var endx = Number(i.x)+Number(i.width);
			var endy = Number(i.y)+Number(i.height);
			var x = square.x+square.size; var y = square.y+square.size;
			
			if (x < endx+square.size & x > startx /*& y>=starty*/ & y >= starty & y <= endy) { //Check if box is on top of the rectangle, with +-0.5 unit accuracy
				if (square.jump == false) { //Stop square if not jumping
					floored = true;
					square.vy = 0
					square.jumpAllowed = true
					//Canvas.strokeStyle='blue'
					//drawLine(startx, starty, endx, endy) //Draws a line across rectangle, for debugging
					//console.log(startx, starty, endx, endy)
					touching = i.type
				}
			}
			
			if (x < endx+(2*square.size) & x > endx & y+(0.5*square.size) >= starty & y <= endy & floored == false) { //Check if the square is bumping anything on the +x side
				
				console.log('BUMP')
				square.color='blue'
				//square.vx = (0-(square.vx*2))*0.5
			} else {square.color='lime'}
			
			
		brush.font = "15px Verdana";
		brush.strokeStyle = 'green'
		brush.strokeText(`${startx}, ${starty}`, startx, starty);
		brush.strokeStyle='blue'
		brush.strokeText(`${endx}, ${endy}`, endx, endy);
		brush.strokeStyle='orange'
		drawLine(endx, starty, startx, endy)
		
		
		brush.font = "15px Verdana";
		brush.strokeStyle = 'blue'
		brush.strokeText(`${x}, ${y}`,x, y);
		brush.strokeStyle='blue'
		brush.strokeText(`${endx}, ${endy}`, endx, endy+15);
		brush.strokeStyle='orange'
		drawLine(x, y, x+square.size, y+square.size)
			//console.log(starty, y+(0.5*square.size))
		}
		
		
		
		
		/*if (square.y < 0 & square.vy < 0) {square.vy = 0; floored=true;}*/
		if (square.y > Canvas.height-square.size) { //Canvas floor barrier
			floored=true;
		}
		
		
		if (floored == false & square.jump == false) {square.vy = square.vy+square.fallSpeed; /*square.color= 'red'*/} //Gravity
		//else {square.color= 'lime'} 
		
		
		
		
		if (floored == true){
			if (square.jump == false) { //Makes square stay on top of floor if it's not jumping
			square.vy = 0;
			square.jumpAllowed = true;
			}
		}
		
		if (square.jump == true) { //Jump up
			square.vy = square.vy-square.jumpSpeed;
			//square.color = 'orange';
			}
		

		
		square.y = square.y+square.vy;
		square.x = square.x+square.vx;

		brush.fillRect(square.x, square.y, square.size, square.size)
	
		}
		
		
		
		
		
		
}













/*
drawLine(0,0,500,500)
drawLine(0,0,200,300)
*/


/*onmousemove = function(e){mouseX = e.clientX; mouseY = e.clientY;}*/


/*
//Check for mouse movement
Canvas.onmousemove = function (e) {
	//console.log('moving. . .')
}
*/








/*
brush.font = "30px Arial";
brush.strokeText("Hai", 10, 50);
*/

function drawLine (beginx, beginy, endx, endy) {
brush.moveTo(beginx, beginy);
brush.lineTo(endx, endy);
brush.stroke();
}












keyon('s', function() {
	if (square.vy < square.maxSpeed & square.y < Canvas.height) {
	square.vy=square.vy+square.maxSpeed }
})

keyon('w', function() {/*
	if (square.vy > square.maxSpeed-(2*square.maxSpeed) & square.y > 0) {
	square.vy=square.vy-square.maxSpeed }*/
	
	
	if (square.jumpAllowed) {
		square.jump = true	
		console.log('JUMP!!')
			setTimeout(function () {
				square.jump = false;
			}, square.jumpLength)
			
		square.jumpAllowed = false;
		} else {console.log('Sorry, you can\'t jump here.')}
	
})



keyoff('w', function () {square.jump = false;})




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


function drawCourse() {
	for (var currentValue of course) {
			brush.fillStyle = currentValue.color;
			brush.fillRect(currentValue.x, currentValue.y, currentValue.width, currentValue.height)
		}
}




//Page update
var update = setInterval(Update, 100/fpsCap);
function Update() {
clear()
drawCourse()
square.move()

}


function clearRects () {
	course = []
}