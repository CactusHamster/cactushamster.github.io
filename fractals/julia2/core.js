function prop(oldNum, newmin, newmax, oldmin, oldmax) { var a = ((oldNum - oldmin) / (oldmax - oldmin)) * (newmax - newmin) + newmin; return a;}
const canvas = document.getElementsByTagName('canvas')[0]
const w = 900
const h = 900
canvas.width = w
canvas.height = h
const gpu = new GPU({canvas: canvas});
let julia = gpu.createKernel(function(xx, yy, c, width, height) {
	let x = (this.thread.x / width) * (xx[1] - xx[0]) + xx[0]
	let y = (this.thread.y / height) * (yy[1] - yy[0]) + yy[0]
	var i = 0;
	while ((x*x+y*y<4) && i < 25 ) {
		let xt = x * x - y * y + c[0];
		y = 2 * x * y + c[1];
		x = xt;
		i++;
	}
	let a = ((i-1) / 24)
	this.color(0, a, 0)
})
.setOutput([canvas.width, canvas.height])
.setGraphical(true)
function newSin(i) {
	var a = (((i - (Math.PI / 2)) % Math.PI) - (Math.PI / 2))
	var b = ((4 * a) / Math.PI) - ((4 * a * Math.abs(a)) / (Math.PI**2))
	var d = ( b * -1 ) ** ( /*Math.floor*/ ( ( i + ( i / 2 ) ) / Math.PI ) )
	return d
}
let xx = [-2, 2]
let yy = [-2, 2]
let frame = 0
let fskip = 1
function render () {
	frame = frame + fskip
	c = [-0.8 + 0.6 * Math.sin(frame / (3.14 * 20)), 0.156 + 0.4 * Math.cos(frame / (3.14 * 40))];
	julia(xx, yy, c, julia.canvas.width, julia.canvas.height);
}
let rendInt = setInterval(render, 50)
function translate (x=0, y=0) {
	if (x != 0) {
		var unit = (Math.abs(xx[1] - xx[0])) * (1/10)
		xx = xx.map(function (a) {
			return (a + (unit * x))
		})
	}
	if (y != 0) {
		var unit = (Math.abs(yy[1] - yy[0])) * (1/10)
		yy = yy.map(function (a) {
			return (a + (unit * y))
		})
	}
}

function zoom (percent) {
	percent = percent / 100
	let width = Math.abs(xx[1] - xx[0])
	let height = Math.abs(yy[1] - yy[0])
	yy[0] = yy[0] + (height * percent)
	yy[1] = yy[1] - (height * percent)
	xx[0] = xx[0] + (width * percent)
	xx[1] = xx[1] - (width * percent)
	console.info(...xx, ...yy)
}

function changeSpeed (ms) {
	clearInterval(rendInt)
	let rendInt = setInterval(render, ms)
}
