

let canvas = document.getElementById('preview')
let sicanvas = document.getElementById('previewSine')


ctx = canvas.getContext('webgl')
let sictx = sicanvas.getContext('webgl')

ctx = canvas.getContext('2d')
let sictx = sicanvas.getContext('2d')




let w = canvas.width
let h = canvas.height
let w2 = sicanvas.width
let h2 = sicanvas.height

let ctrls = [phas1, phas2, phas3, freq1, freq2, freq3]
let ctrls2 = [wSlr, cSlr]

let phases = [2, 0, 4]
let frequencies = [0, 0, 0]
let CenWid = [128, 127]

let clrs = {r: [], g: [], b: []}

function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) { return ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin}
function byte2Hex(n) {var nybHexString = "0123456789ABCDEF"; return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);}
function RGB2Color(r,g,b) {return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);}
function makeColorGradient(i, frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width) {
	frequency1 = Math.PI*2/frequency1;
	frequency2 = Math.PI*2/frequency2;
	frequency3 = Math.PI*2/frequency3;
	var red = Math.sin((frequency1 * i) + phase1) * width + center;
	var grn = Math.sin((frequency2 * i) + phase2) * width + center;
	var blu = Math.sin((frequency3 * i) + phase3) * width + center;
	return [red,grn,blu]
}


function rgb2gl (r, g, b) {r = r / 255; g = g /255; b = b / 255; return [r, g, b]}
const gpu1 = new GPU({canvas: canvas,context: ctx})
const gpu2 = new GPU({canvas: sicanvas,context: sictx})
let renderCanvasGPU = gpu1.createKernel(function  (frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width) {
	let x = this.thread.x
	let c = makeColorGradient(x,frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width )
	c = rgb2gl(c[0], c[1], c[2])
	this.color(c[0], c[1], c[2])
}).setOutput({x: canvas.width, y: canvas.height}).setGraphical(true).addFunction(rgb2gl).addFunction(makeColorGradient); renderCanvasGPU.kernel.dynamicOutput = false
let renderCanvasGPU2 = gpu2.createKernel(function  (frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width) {
	let x = this.thread.x
	let c = makeColorGradient(x,frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width )
	c = rgb2gl(c[0], c[1], c[2])
	this.color(c[0], c[1], c[2])
}).setOutput({x: canvas.width, y: canvas.height})
.setGraphical(true).addFunction(rgb2gl).addFunction(makeColorGradient); renderCanvasGPU.kernel.dynamicOutput = false










function render () {
	
	for (let ctrli in ctrls) { if (ctrli > 2) frequencies[ctrli-3] = Number(ctrls[ctrli].value); else phases[ctrli] = Number(ctrls[ctrli].value); }
	for (cti in ctrls2) {CenWid[cti] = Number(ctrls2[cti].value);}
	
	/*
	for (let x=0;x<w;x++) {
		let clr = makeColorGradient(x, ...frequencies, ...phases, ...CenWid)
		ctx.fillStyle = `rgb(${clr[0]}, ${clr[1]}, ${clr[2]})`
		ctx.fillRect(x, 0, 1, h)	
	*/
	
	renderCanvasGPU(...frequencies, ...phases, ...CenWid)
	//renderCanvasGPU2(...frequencies, ...phases, ...CenWid)
	
}


for (let ctrli in ctrls) {
	ctrls[ctrli].max = 8
	ctrls[ctrli].min = 0
	ctrls[ctrli].value = 0
	ctrls[ctrli].step = 0.1
	let f = function () { phases[ctrli] = Number(this.value); render(); }
	if (ctrli > 2) {
		ctrls[ctrli].value = 0
		ctrls[ctrli].max = 1500
		ctrls[ctrli].step = 2
		f = function () {frequencies[ctrli-3] = Number(this.value); render()}
	}
	ctrls[ctrli].addEventListener('input', f)
}
for (cti in ctrls2) {
	ctrls2[cti].step = 0.25
	ctrls2[cti].min = -127 * 2
	ctrls2[cti].max = 127 * 4
	ctrls2[cti].value = 127
	ctrls2[cti].addEventListener('input', function () {
		CenWid[cti] = Number(this.value);
		render()
	})
}


function resetse (el) {
	if (ctrls.indexOf(el) > -1) {
		el.value = 0
	}
	if (ctrls2.indexOf(el) > -1) {
		el.value = 127
	}
	render()
}

render()






/*
document.addEventListener('keydown', function (e) {
	if (e.key == "Control") {
		for (let ctrl of ctrls) {
			ctrl.step = ctrl.step/10
		}
	}
})
document.addEventListener('keyup', function (e) {
	if (e.key == "Control") {
		for (let ctrl of ctrls) {
			ctrl.step = ctrl.step*10
		}
	}
})
*/

