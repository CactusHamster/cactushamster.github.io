let canvas = document.getElementById('preview')
let ctx = canvas.getContext('2d')
let sicanvas = document.getElementById('previewSine')
let sictx = sicanvas.getContext('2d')
//const gpu2 = new GPU({canvas: sicanvas})
canvas.width = window.innerWidth * 98/100
sicanvas.width = window.innerWidth * 96/100

Array.from(document.getElementsByClassName('s')).map(slider => {slider.onchange = render; slider.oninput = render})
Array.from(document.getElementsByClassName('freq')).map(freqS => {
	freqS.max = 2*canvas.width;
	freqS.step = 1
	freqS.value = 2*canvas.width;
})
Array.from(document.getElementsByClassName('phas')).map(phasS => {
	phasS.max = 20; phasS.step = 0; phasS.value = 0
})
cSlr.max = 255; cSlr.value = Math.floor(255/2); cSlr.min = 0
wSlr.max = 255; wSlr.value = Math.floor(255/2); wSlr.min = 0

function prop (oldNum, newmin, newmax, oldmin, oldmax) { 
	return ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin
}
function byte2Hex(n) {var nybHexString = "0123456789ABCDEF"; return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);}
function RGB2Color(r,g,b) {return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);}

function makeColorGradient(i, freqs, phases, center, width) {
	frequency1 = Math.PI*2/freqs[0];
	frequency2 = Math.PI*2/freqs[1];
	frequency3 = Math.PI*2/freqs[2];
	phases = phases.map(phas => phas / Math.PI)
	var red = Math.sin((frequency1 * i) + phases[0]) * width + center;
	var grn = Math.sin((frequency2 * i) + phases[1]) * width + center;
	var blu = Math.sin((frequency3 * i) + phases[2]) * width + center;
	return [red,grn,blu]
}
/*
let sinARR = gpu2.createKernel(function (freqs, phas, cw) {
	let x = this.thread.x
	let f1 = Math.PI*2/freqs[0];
	let f2 = Math.PI*2/freqs[1];
	let f3 = Math.PI*2/freqs[2];
	let red = Math.sin((f1 * x) + phas[0]) * cw[0] + cw[1];
	let grn = Math.sin((f2 * x) + phas[1]) * cw[0] + cw[1];
	let blu = Math.sin((f3 * x) + phas[2]) * cw[0] + cw[1];
	return [red, grn, blu]
})
.setGraphical(false)
.setOutput({x: canvas.width})
.addFunction(byte2Hex)
.addFunction(RGB2Color)
.addFunction(prop)
*/

function render () {
	let phases = Array.from(document.getElementsByClassName('phas')).map(ctrl => {return +ctrl.value})
	let frequencies = Array.from(document.getElementsByClassName('freq')).map(ctrl => {return +ctrl.value})
	let CenWid = [+cSlr.value, +wSlr.value];
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	sictx.clearRect(0, 0, sicanvas.width, sicanvas.height);
	for (let x=0;x<canvas.width;x++) {
		let clr = makeColorGradient(x, frequencies, phases, ...CenWid);
		ctx.fillStyle = RGB2Color(...clr);
		ctx.fillRect(x, 0, 1, canvas.height);
		clr.forEach((comp, index) => {
			let choices = ['rgba(255, 0, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)']
			sictx.fillStyle = choices[index];
			comp = prop(comp, 0, sicanvas.height, 0, 255)
			//sictx.fillRect(x, Math.floor(sicanvas.height/2)-(comp/2), 1, comp)
			sictx.fillRect(x, sicanvas.height, 1, -comp)
		})
	}
	//renderCTX2(frequencies, phases, CenWid)
}

function resetse (elem) {
	let classes = Array.from(elem.classList)
	if (classes.includes('phas')) elem.value = 0
	else if (classes.includes('freq')) elem.value = 2*canvas.width;
	else elem.value = Math.floor(255/2)
	render()
}

render()