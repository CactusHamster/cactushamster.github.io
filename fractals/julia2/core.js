function prop(oldNum, newmin, newmax, oldmin, oldmax) { var a = ((oldNum - oldmin) / (oldmax - oldmin)) * (newmax - newmin) + newmin; return a;}
let rerendering = true;
let morphing = true;
const canvas = document.getElementsByTagName('canvas')[0]
let w = window.innerWidth
let h = window.innerHeight
let ITERATIONS = 60
let frame = 0
let fskip = 1
let yy = [-1.25, 1.25]
let xx = [-1.25 * (w/h), 1.25 * (w/h)]
canvas.width = w
canvas.height = h
const gpu = new GPU({canvas: canvas});
let julia = gpu.createKernel(function(xx, yy, c, width, height, iterations) {
	let x = (this.thread.x / width) * (xx[1] - xx[0]) + xx[0]
	let y = (this.thread.y / height) * (yy[1] - yy[0]) + yy[0]
	for (var i = 0; (x*x+y*y<4 && i < iterations); i++) {
		let xt = x * x - y * y + c[0];
		y = 2.0 * x * y + c[1];
		x = xt;
	}
	let a = ((i-1.0) / (iterations-1))
	this.color(0.0, a, 0.0)
})
.setOutput([canvas.width, canvas.height])
.setGraphical(true)
.setDynamicOutput(true)
window.addEventListener('resize', function () {
	//yy[0] = yy[0]
	//yy[1] = yy[1]
	//nx = ( nw * x ) / w
	//yy[0] = ( window.innerHeight * yy[0] ) / h
	//yy[1] = ( window.innerHeight * yy[1] ) / h
	//xx[0] = ( window.innerWidth * xx[0] ) / w
	//xx[1] = ( window.innerWidth * xx[1] ) / w
	//xx[0] = xx[0] * (window.innerWidth / w)
	//xx[1] = xx[1] * (window.innerWidth / w)
	w = window.innerWidth
	h = window.innerHeight
	canvas.width = w
	canvas.height = h
	julia.setOutput([canvas.width, canvas.height])
	
})
function newSin(i) {
	var a = (((i - (Math.PI / 2)) % Math.PI) - (Math.PI / 2))
	var b = ((4 * a) / Math.PI) - ((4 * a * Math.abs(a)) / (Math.PI**2))
	var d = ( b * -1 ) ** ( /*Math.floor*/ ( ( i + ( i / 2 ) ) / Math.PI ) )
	return d
}
function render () {
	c = [-0.8 + 0.6 * Math.sin(frame / (Math.PI * 20)), 0.156 + 0.4 * Math.cos(frame / (Math.PI * 40))];
	julia(xx, yy, c, julia.canvas.width, julia.canvas.height, ITERATIONS);
}
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
	render()
}

function zoom (percent) {
	percent = percent / 100
	let width = Math.abs(xx[1] - xx[0])
	let height = Math.abs(yy[1] - yy[0])
	yy[0] = yy[0] + (height * percent)
	yy[1] = yy[1] - (height * percent)
	xx[0] = xx[0] + (width * percent)
	xx[1] = xx[1] - (width * percent)
	render()
}

//let rendInt = setInterval(render, 50)
function sleep (ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	})
}

async function rerender () {
	render()
	if (morphing) frame = frame + fskip
	await sleep(50)
	if (rerendering) rerender()
	return;
}
function togglePause () {
	//rendering = !rendering
	//if (rendering) rerender()
	morphing = !morphing
	rerendering = !rerendering
	rerender()
}
let Ittv;
function updateIterate (factor = 1) {
	if (factor < 0 && ITERATIONS-factor <= 1) return;
	//if (factor > 0 && ITERATIONS+factor >= 5000) return;
	ITERATIONS = ITERATIONS + factor
	clearTimeout(Ittv)
	let di = document.getElementById('iterationsDisplay')
	di.innerText = ITERATIONS
	di.style.transition = "0s";
	di.style.opacity = 1;
	render()
	Ittv = setTimeout(function () {
		let di = document.getElementById('iterationsDisplay')
		di.style.transition = "2s";
		di.style.opacity = 0;
	}, 500)
}

rerender()