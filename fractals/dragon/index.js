function byteHex(n) { let nybHexString = "0123456789ABCDEF"; return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1); }
function RGB2Color(r,g,b) { return '#' + byteHex(r) + byteHex(g) + byteHex(b); }
class Rainbow {
	constructor (arrayLength=32,phase=0) {
		this.colors = []
		let center = 128;
		this.phase = phase;
		let width = 127;
		let ret = []
		let frequency = Math.PI*2/arrayLength;
		for (var i = 0; i < arrayLength; ++i) {
		 ret.push(RGB2Color(Math.sin(frequency*i+2+phase) * width + center,Math.sin(frequency*i+0+phase) * width + center, Math.sin(frequency*i+4+phase) * width + center))
		}
		this.colors = ret
		return ret
	}
	recalc (arrayLength=32,phase=0) {
		return this.constructor(arrayLength, phase)
	}
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

async function pDragon(ctx, x, y, order, size) {
	const ran = new Rainbow(10000)
	// Plotting Dragon curves. 2/25/17 aev
	var c=0
	var d=1
	var order = 1 << order;
	//let points = []
	ctx.beginPath();
	ctx.strokeStyle = 'blue'
	let i = 1
	async function inner()  {
	ctx.strokeStyle = ran[i % ran.length]
		ctx.lineTo((x/*+hsh*/)*size,(y/*+vsh*/)*size)
		//points.push([(x/*+hsh*/)*size,(y/*+vsh*/)*size])
		var c1 = c & 1;
		var c2 = c & 2;
		var c2x = 1 * d;
		if(c2 > 0) c2x = (-1)*d
		var c2y = (-1) * c2x
		if(c1 > 0) y += c2y
		else x += c2x
		c+=i/(i&-i)
		ctx.stroke()
		if (i % 2 == 0) ctx.beginPath()
		if (i % 20 == 0) await sleep(0)
		i++
		if (!(i<=order+1)) return;
		inner()
	}
	inner()
  //return points;
}

function sleep (ms) {return new Promise((resolve) => { setTimeout(resolve, ms); });}

async function render () {
	const canvas = document.getElementsByTagName('canvas')[0]
	const width = 4000
	const height = 4000
	canvas.width = width; canvas.height = height
	const ctx = canvas.getContext('2d')
	/*const points = pDragon((canvas.width / 2), (canvas.height / 2), 12, 1)
	ctx.fillStyle = 'red'
	ctx.fillRect((canvas.width / 2)-5, (canvas.height / 2)-5, 10, 10)
	ctx.beginPath();
	ctx.strokeStyle = 'blue'
	for (const index in points) {
		if (index == 0) {}
		ctx.lineTo(...points[index])
		if (index % 10 == 0) await sleep(1)
		ctx.stroke();
	}*/
	const si = 2
	pDragon(ctx, ( (canvas.width / 2) / si ) * (3 / 4), ( (canvas.height / 2) / si ), 60, 2)
}
render()