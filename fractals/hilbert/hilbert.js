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
class Solar {
	constructor (arrayLength=32,phase=0) {
		this.colors = []
		let center = 128;
		let width = 127;
		let frequency = Math.PI*2/arrayLength;
		for (var i = 0; i < arrayLength; ++i) {
		 let red   = Math.sin(frequency*i+0.0+phase) * width + center;
		 let green = Math.sin(frequency*i+0.3+phase) * width + center;
		 let blue  = Math.sin(frequency*i+0.6+phase) * width + center;
		 this.colors.push(RGB2Color(red,green,blue))
		}
		return this.colors
	}
	recalc (arrayLength=32,phase=0) {
		return this.constructor(arrayLength, phase)
	}
}

class Hilbert {
	constructor (width, spac = 10, points = []) {
		this.width = width
		this.space = spac
		this.points = points
	}
	calc (x, y, lg, i1, i2) {
		if (lg === 1) {
			const px = (this.width - x) * this.space;
			const py = (this.width - y) * this.space;
			this.points.push([px, py]);
			return;
		}
		lg >>= 1;
		this.calc(x + i1 * lg, y + i1 * lg, lg, i1, 1 - i2);
		this.calc(x + i2 * lg, y + (1 - i2) * lg, lg, i1, i2);
		this.calc(x + (1 - i1) * lg, y + (1 - i1) * lg, lg, i1, i2);
		this.calc(x + (1 - i2) * lg, y + i2 * lg, lg, 1 - i1, i2);
		return this.points;
	}
}

const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')

let order = 6
let width = 2 ** order;
let space = 10;
let timeEffect = false;

let rainbow = new Solar(30, 0)

async function render () {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	order = +orderInput.value
	space = +spaceInput.value
	//order = Math.floor(order);
	width = 2 ** order;
    const hilbert = new Hilbert(width, space, [])
    let p = hilbert.calc(0, 0, width, 0, 0, hilbert);
	const s2 = space/2
	canvas.width = (width * space) + 1 - space
	canvas.height = (width * space) + 1 - space
	ctx.fillStyle = '0xFFFFFF'
	p = p.map(coord => {
		return coord.map(xy => xy - space)
	});
	for (let coordi = p.length-1; coordi > -1; coordi--) {
		if (coordi == 0) continue;
		ctx.fillStyle = rainbow[coordi % rainbow.length]
		let lastx = p[coordi-1][0]
		let lasty = p[coordi-1][1]
		let dif = [(p[coordi][0] - lastx), (p[coordi][1] - lasty)];
		dif = dif.map((a) => { if (a < 1) a++; return a; });
		ctx.fillRect(lastx, lasty, ...dif);
		//console.log(lastx, lasty, p[coordi][0] - lastx, p[coordi][1] - lasty)
		if (timeEffect) await (function () {return new Promise ((res, rej) => {setTimeout(res, 0)})})();
	}
	return p;
}

async function animateDraw() {
	timeEffect = true;
	await render();
	timeEffect = false;
}

render().catch((e) => {
	console.error(e.stack)
})