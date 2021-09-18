HTMLCanvasElement.prototype.download = function () {
  var link = document.createElement('a');
  link.download = 'julia.png';
  link.href = this.toDataURL()
  link.click();	
}
HTMLCanvasElement.prototype.relativeCoords = function(event) {
  var x,y;
  //This is the current screen rectangle of canvas
  var rect = this.getBoundingClientRect();
  var top = rect.top;
  var bottom = rect.bottom;
  var left = rect.left;
  var right = rect.right;
  //Recalculate mouse offsets to relative offsets
  x = event.clientX - left;
  y = event.clientY - top;
  //Also recalculate offsets of canvas is stretched
  var width = right - left;
  //I use this to reduce number of calculations for images that have normal size 
  if(this.width!=width) {
    var height = bottom - top;
    //changes coordinates by ratio
    x = x*(this.width/width);
    y = y*(this.height/height);
  } 
  //Return as an array
  return [x,y];
}
var frame = 0;
let minX = -2
let maxX = 2
let minY = -2
let maxY = 2
let center = [0, 0]
let factor = 1

var creal = -.8
var cimag = .156;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

let pallette = []
/*
function generateColors() {
for(x=0;x<9;x++) {
	color=(31*x).toString(16); // convert the number to hex
	if(color.length==1) color='0'+color;  // add a zero in front if only one hex digit
	pallette[x]="#"+color+color+'ff'; // colors 0-8: the Red and Green components change, Blue=FF
	pallette[x+8]='#00ff'+color;      // colors 8-16: the Blue component changes, Red and Green=FF
	pallette[17+x]="#"+color+'0000';  // colors 17-25: the Red component changes, Green and Blue=0
}
}
*/
function generateColors() {
for(x=0;x<9;x++) {
	color=(31*x).toString(16); // convert the number to hex
	if(color.length==1) color='0'+color;  // add a zero in front if only one hex digit
	pallette[x]="#"+color+color+'ff'; // colors 0-8: the Red and Green components change, Blue=FF
	pallette[x+8]='#00ff'+color;      // colors 8-16: the Blue component changes, Red and Green=FF
	pallette[17+x]="#"+color+'0000';  // colors 17-25: the Red component changes, Green and Blue=0
}
}
generateColors()


function triggerZoom(e) {
	var coords = canvas.relativeCoords(e)
	var zoomF = Number(eval(zoomAmount.value))
	if (zoomF == 0  || zoomF == undefined || isNaN(zoomF)) {zoomF = 3/10}
	zoom(Math.round(coords[0]), Math.round(coords[1]), zoomF);
	zoomCX = coords[0]
	zoomCY = coords[1]
}

function zoom(x, y, factor1) {
	factor = factor1
	var xt = ( ( (maxX - minX) / canvas.width ) * x ) + minX;
	var yt = ( ( (maxY - minY) / canvas.height ) * y ) + minY;
	var dxt = (maxX-minX) * factor
	var dyt = (maxY - minY) * factor
	minX = xt - (dxt/2);
	maxX = xt + (dxt/2);
	minY = yt - (dyt/2);
	maxY = yt + (dyt/2);
	center = [x, y]
	julia();
}
function triggerZoom2(e) {
	var coords = canvas.relativeCoords(e)
	var zoomF = Number(eval(zoomAmount2.value))
	//console.info(zoomF)
	if (zoomF == 0  || zoomF == undefined || isNaN(zoomF)) {zoomF = 10/3}
	//console.info(zoomF)
	zoom(Math.round(coords[0]), Math.round(coords[1]), zoomF);
	zoomCX = coords[0]
	zoomCY = coords[1]
}
canvas.addEventListener('mousedown', function (event) {
	// e.button === 0: the left button is clicked
    // e.button === 1: the middle button is clicked
    // e.button === 2: the right button is clicked
	if (event.button == 0) triggerZoom(event)
	else triggerZoom2(event)
})



function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) {
	var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin
	return newNum
}





function julia() {
	
	frame = Number(frameSlider.value); if (frame == 0 || isNaN(frame)) frame = 0
	
	res = resBox.value; if (res < 1) res = 4;
	iterations = iterationBox.value; if (iterations == 0 || isNaN(iterations)) iterations = 25;
	var h=heightBox.value; if (h<1) h=500; canvas.height=h; canvas.width = h
	
	
for(y=0;y<canvas.height/res;y++)
        {
        for(x=0;x<canvas.width/res;x++) {
			//var cx=-2+x/(canvas.width/(4*res));
			//var cy=-2+y/(canvas.height/(4*res));
			let cx = prop(x, minX, maxX, (0-center[0]*factor)/res, (canvas.width-center[0]*factor)/res)
			var cy = prop(y, minY, maxY, (0-center[1]*factor)/res, (canvas.height-center[1]*factor)/res)
			var i = 0;
			do {
				xt=cx*cx-cy*cy+creal;
				cy=2*cx*cy+cimag;
				cx=xt;
				i++;
			}
			while ((cx*cx+cy*cy<4)&&i<iterations);
			color = Math.floor(prop(i, 0, pallette.length-1, 0, iterations))
			//color = i
			context.fillStyle = pallette[color];
			context.fillRect(x*res, y*res, res, res);
		}
	}
	
	creal=-.8+.6*Math.sin(frame/(3.14*20));
	cimag=.156+.4*Math.cos(frame/(3.14*40));
	
}

function reset () {
	minX = -2
	maxX = 2
	minY = -2
	maxY = 2
	center = [0, 0]
	factor = 1
	res = 4

	xmin = -2, ymin = -2

	var creal = -.8
	var cimag = .156;

	zoomCX = 300
	zoomCY = 300
	zoomFactor = 1
	frame = 0
	julia()	
}

function frameSliderMovementFunction () {
	julia()
	rangeBox.value = frameSlider.value
	var c = Math.round(prop(frameSlider.value, 0, 255, 0, frameSlider.max))
	var r=0, g=0, b=0
	if (frameSlider.value < frameSlider.max * (1/3) || frameSlider.value > frameSlider.max * (2/3)) {
		r = c; b = 255-r; g = 0 
	} else {b = Math.round(prop(c, c, 255, 0, 255)); g = 255-b; r = 0}
	document.documentElement.style.setProperty("--slider-color", `rgb(${r}, ${g}, ${b})`);
}


frameSlider.addEventListener('input', frameSliderMovementFunction);

rangeBox.addEventListener('input', function (e) {
    frameSlider.value = rangeBox.value
	frameSliderMovementFunction()
	julia()
});


var animation;
var playing = false;
function startAnimation () {
	var delay = Number(speedBox.value)
	if (isNaN(delay) || delay <= 0) delay = 200
	clearInterval(animation)
	playing = true
	animation = setInterval(function () {
		frameSlider.value = Number(frameSlider.value)+1
		if (frameSlider.value == frameSlider.max) frameSlider.value = frameSlider.min
		frameSliderMovementFunction()
		julia()
	}, delay)
}

function stopAnimation () {
	playing = false
	clearInterval(animation)
}






julia()
frameSlider.value = (Number(frameSlider.max)+Number(frameSlider.min))/2
frameSliderMovementFunction()
//a=setInterval(julia,100); //redraw the fractal every 100ms