var canvas = document.getElementById('canvas');
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











var pallette = []


for(x=0;x<256;x++) // the loop that creates the pallette
        {
        if(x<85)        // colors 0-84
                {
                r=x*3;
                g=0;
                b=0;
                }
        if(x>84&&x<171)        // colors 85-170
                {
                r=0;
                g=3*(x-84);
                b=0;
                }
        if(x>170)        // colors 170-255
                {
                r=0;
                g=0;
                b=3*(x-170);
                }
 
        r=r.toString(16); // conversion to hex
        g=g.toString(16);
        b=b.toString(16);        
 
        if (r.length==1) r="0"+r; // add a zero in front to change single-digit to double digit
        if (g.length==1) g="0"+g;
        if (b.length==1) b="0"+b;
 
        pallette[x]="#"+r+g+b; // final hex string
}








































let minX = -2
let maxX = 2
let minY = -2
let maxY = 2
let center = [0, 0]
let factor = 1
var res = 4

var xmin = -2, ymin = -2
var color;


var t = 3 //4
var ty = 4

let zoomCX = 300
let zoomCY = 300
let zoomFactor = 1







canvas.addEventListener("mousedown", function (e) {
	var coords = canvas.relativeCoords(e)
	var zoomF = eval(eval('zoomAmount.value'))
	if (zoomF == 0 ) zoomF = 3/10
	console.info(zoomF)
	
	zoom(Math.round(coords[0]), Math.round(coords[1]), zoomF);
	zoomCX = coords[0]
	zoomCY = coords[1]
}, false);

var context = canvas.getContext('2d');
mandel();




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
	mandel();
}


function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) {
	var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin
	return newNum
}

function mandel() {
	
	iterations = iterationBox.value; if (iterations == 0 || isNaN(iterations)) iterations = 255;
	var h=heightBox.value; if (h<1) h=600; canvas.height=h; canvas.width = h
	res = resBox.value; if (res < 1) res = 4;
	
	
	
    for (let x = 0; x < canvas.height/res; x++) {
        for (let y = 0; y < canvas.height/res; y++) {
            let i = 0;

			//var cx = prop(x, minX, maxX, 0, (canvas.width)/res)
			//var cy = prop(y, minY, maxY, 0, (canvas.height)/res)
			//var cx2 = prop(zoomX, minX, maxX, 0, canvas.width/res)
			//var cy2 = prop(y+zoomX, minY, maxY, 0, (canvas.height+zoomY)/res)


			var u = 1
			var cx = prop(x, minX, maxX, (0-center[0]*factor)/res, (canvas.width-center[0]*factor)/res)
			var cy = prop(y, minY, maxY, (0-center[1]*factor)/res, (canvas.height-center[1]*factor)/res)
			let zx = 0;
            let zy = 0;

            do {
                let xt = zx * zy;
                zx = zx * zx - zy * zy + cx;
                zy = 2 * xt + cy;
                i++;
            }
            while (i < iterations && (zx * zx + zy * zy) < 4);

            //color = i.toString(16); context.fillStyle = '#' + color + color + color;
			color = pallette[Math.ceil(prop(i, 0, 255, 0, iterations))]
			context.fillStyle = color
            context.fillRect(x * res, y * res, res, res);
        }
    }
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

	t = 3 //4
	ty = 4

	zoomCX = 300
	zoomCY = 300
	zoomFactor = 1
	mandel()	
}