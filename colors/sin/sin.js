let canvas = document.getElementById('preview')
let ctx = canvas.getContext('2d')
let sicanvas = document.getElementById('previewSine')
let sictx = sicanvas.getContext('2d')

let CenWid = [128, 127]

let w = canvas.width
let h = canvas.height
let w2 = sicanvas.width
let h2 = sicanvas.height

function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) {
	var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin
	return newNum
}
function byte2Hex(n) {
	var nybHexString = "0123456789ABCDEF";
	return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}
  function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}


function makeColorGradient(i, frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width) {
	/*let center = 128;
	let width = 127;*/
	let ret = []
	//let frequency = Math.PI*2/arrayLength;
	var red = Math.sin(frequency1 * i + phase1) * width + center;
	var grn = Math.sin(frequency2 * i + phase2) * width + center;
	var blu = Math.sin(frequency3 * i + phase3) * width + center;
	return RGB2Color(red,grn,blu)
}



//let phases = [0, 0.2, 0.4]
//let frequencies = [0.2, 0.4, 0.6]
let phases = [0, 0, 0]
let frequencies = [0, 0, 0]

function render () {
	for (let x=0;x<w;x++) {
		let clr = makeColorGradient(x, ...frequencies, ...phases, ...CenWid)
		ctx.fillStyle = clr
		ctx.fillRect(x, 0, 1, h)
	}
	//sictx.fillStyle = 'black'
	//sictx.fillRect(0, 0, w2, h2)
	/*for (let x=0;x<w2;x++) {
		sictx.fillStyle = `rgb(${x}, ${0}, ${0})`
		let max = Math.PI*6
		
		let b = 7
		
	
		//console.info(x, h2/2+h, 1, h2/2-h)
	}*/
}









let ctrls = [phas1, phas2, phas3, freq1, freq2, freq3]
for (let ctrli in ctrls) {
	ctrls[ctrli].max = 10
	ctrls[ctrli].min = 0
	ctrls[ctrli].value = 1
	ctrls[ctrli].step = 1
	let f = function () { phases[ctrli] = this.value; render() }
	if (ctrli > 2) {
		ctrls[ctrli].max = Math.PI
		//ctrls[ctrli].step = Math.PI/1000
		ctrls[ctrli].step = (Math.PI*2)/(canvas.width/10)
		f = function () {frequencies[ctrli-3] = this.value; render()}
	}
	ctrls[ctrli].addEventListener('input', f)
}

let ctrls2 = [wSlr, cSlr]
for (cti in ctrls2) {
	ctrls2[cti].step = 0.25
	ctrls2[cti].min = 0
	ctrls2[cti].max = 127 * 2
	ctrls2[cti].value = 127/2
	ctrls2[cti].addEventListener('input', function () {
		CenWid[cti] = this.value;
		render()
	})
}

render()