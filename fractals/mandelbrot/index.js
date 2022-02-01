const canvas = document.getElementsByTagName('canvas')[0]
const gpu = new GPU({canvas: canvas})
let escape_radius = 1e+36
let useCPU = false;
let renderId = 0;
let res = 10;
let ITERATIONS = 255;
canvas.width = window.innerWidth * 3/4; canvas.height = window.innerHeight
const mandelbrot = gpu.createKernel(function (xx, yy, iterations, escape) {
	let x = (this.thread.x / this.constants.w) * (xx[1] - xx[0]) + xx[0]
	let y = (this.thread.y / this.constants.h) * (yy[1] - yy[0]) + yy[0]
	let z = [0, 0]
	let i = 0
	while ((i < iterations) && ((z[0]**2) + (z[1]**2) < escape)) {
		let xt = z[0] * z[1]
		z[0] = z[0]**2 - z[1]**2 + x
		z[1] = 2 * xt + y
		i = i + 1
	}
	if (i == iterations) {
		this.color(0, 0, 0);
	}
	else {
		i = i + 1 - Math.log(Math.log(Math.abs(z[0])+Math.abs(z[1])))/Math.log(2)
		let r=0, g=0, b=0;
		let f = (Math.PI*2 / (iterations/5))
		r = Math.sin(i * f + 0.2) * 127.5 + 127.5;
		g = Math.sin(i * f + 0) * 127.5 + 127.5;
		b = Math.sin(i * f + 0.6) * 127.5 + 127.5
		this.color(r/255, g/255, b/255)
	}
})
.setOutput([canvas.width, canvas.height])
.setConstants({h: canvas.height, w: canvas.width-1})
.setTactic('precision')
.setGraphical(true)

const cpucanvas = document.getElementsByTagName('canvas')[1]
cpucanvas.width = canvas.width/2
cpucanvas.height = canvas.height/2
const ctx = cpucanvas.getContext('2d')
const cpumandelbrot = async function (iterations, escape, id) {
	let st = Date.now()
	let cA = Math.floor(cpucanvas.width/(10))
	let zx = 0, zy = 0, xt = 0, cx = 0, cy = 0, x = 0
	for (let x = 0; x < cpucanvas.width; x = x + res) {
		//if (id != renderId && (Date.now() - st > 1000)) return false;
		let rx = ((x-(res/2)) / cpucanvas.width) * (xx[1] - xx[0]) + xx[0]
		for (let y = 0; y < cpucanvas.width; y = y + res) {
			let ry = ((y-(res/2)) / cpucanvas.height) * (yy[1] - yy[0]) + yy[0]
			zx = 0
			zy = 0
			let i = 0
			while ((i < iterations) && ((zx*zx) + (zy*zy) < escape)) {
				let xt = zx * zy
				zx = zx**2 - zy**2 + rx
				zy = 2 * xt + ry
				i = i + 1
			}
			if (i == iterations) {
				ctx.fillStyle = 'rgb(0, 0, 0)'
				ctx.fillRect(x, cpucanvas.height - y, res, res)
				continue
			}
			i = i + 1 - Math.log(Math.log(Math.abs(zx)+Math.abs(zy)))/Math.log(2)
			let f = (Math.PI*2 / (iterations/5))
			let r = Math.sin(i * f + 0.2) * 127.5 + 127.5;
			let g = Math.sin(i * f + 0) * 127.5 + 127.5;
			let b = Math.sin(i * f + 0.6) * 127.5 + 127.5
			ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
			ctx.fillRect(x, cpucanvas.height - y, res, res)
		}
		if (x % cA == 0) await sleep(0)
	}
}










let yy = [-1.5, 1.5]
let xx = [-1.5 * (canvas.width/canvas.height), 1.5 * (canvas.width/canvas.height)]
async function render () {
	if (useCPU) {
		renderId = Math.random();
		await cpumandelbrot(ITERATIONS, escape_radius, renderId)
	}
	else {
		await mandelbrot(xx, yy, ITERATIONS, escape_radius)
	}
}
render()
function translate(n=0,a=0){if(0!=n){var t=.1*Math.abs(xx[1]-xx[0]);xx=xx.map(function(a){return a+t*n})}if(0!=a){t=.1*Math.abs(yy[1]-yy[0]);yy=yy.map(function(n){return n+t*a})}render()}
function zoom(x){x/=100;let y=Math.abs(xx[1]-xx[0]),a=Math.abs(yy[1]-yy[0]);yy[0]=yy[0]+a*x,yy[1]=yy[1]-a*x,xx[0]=xx[0]+y*x,xx[1]=xx[1]-y*x,render()}
function sleep(e){return new Promise(n=>{setTimeout(n,e)})}
let Ittv; function updateIterate(t=1){if(t<0&&ITERATIONS-t<=1)return;ITERATIONS+=t,clearTimeout(Ittv);let e=document.getElementById("iterationsDisplay");e.innerText=ITERATIONS,e.style.transition="0s",e.style.opacity=1,render(),Ittv=setTimeout(function(){let t=document.getElementById("iterationsDisplay");t.style.transition="2s",t.style.opacity=0},500); itBox.value = ITERATIONS}