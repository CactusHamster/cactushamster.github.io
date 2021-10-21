function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) {var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin; return newNum}

let palette = []
function generatePalette() {
        for (x = 0; x < 256; x++) {
			let r = 0, g = 0, b = 0
			if (x < 85) r = x * 3
            else if (x < 171) g = 3 * (x - 84)
            else b = 3 * (x - 170);
            r = r.toString(16); g = g.toString(16); b = b.toString(16);
            if (r.length == 1) r = "0" + r; if (g.length == 1) g = "0" + g; if (b.length == 1) b = "0" + b;
            palette[x] = "#" + r + g + b;
        }
}
generatePalette()

function mandel (x, y, it) {
	let zx = 0
	let zy = 0
	let i = 0
	while ((i < it) && ((zx**2) + (zy**2) < 4)) {
		let xt = zx * zy
		zx = zx**2 - zy**2 + x
		zy = 2 * xt + y
		i = i + 1
	}
	return i;
}












let zoom = 1.0
let zoomCoords = {
	x: canvas.width/2,
	y: canvas.height/2
}
let res = 4


let min = {
	x: -2,
	y: -2
}
let max = {
	x: 2,
	y: 2
}



function render () {
	let iterations = iterationBox.value; if (iterations == 0 || isNaN(iterations)) iterations = 255; var s=sizeBox.value; if (s<1) s=600; canvas.height = s; canvas.width = s; res = resBox.value; if (res < 1) res = 4;
	s = s / res
	
	for (let x = 0; x < s; x++) {
		for (let y = 0; y < s; y++) {
			let cx = prop(x, min.x, max.x, 0, s)
			let cy = prop(y, min.y, max.y, 0, s)
			
			let i = mandel(cx, cy, iterations)
			
			//if (x % 100 == 0) console.info(cx, cy, x, y, s, i)
			
			//if (x % 100 == 0) console.info(prop(i, 0, palette.length, 0, iterations))
			ctx.fillStyle = palette[i]
			//ctx.fillStyle = palette[Math.round(prop(i, 0, palette.length, 0, iterations))]
			ctx.fillRect(x*res, y*res, res, res)
		}
	}
}


let xTranslate = 0.1
let yTranslate = 0.1


let mods = {
	tran: {
		x: 1,
		y: 1
	},
	zoom: {
		x: 1,
		y: 1
	}
	
}


document.onkeydown = (function (e) {
	let rerender = true
	let a = 0;
	switch (e.key) {
		case "ArrowUp":
		case "w":
			min.y = min.y - (yTranslate * mods.tran.y)
			max.y = max.y - (yTranslate * mods.tran.y)
		break;
		case "ArrowDown":
		case "s":
			min.y = min.y + (yTranslate * mods.tran.y)
			max.y = max.y + (yTranslate * mods.tran.y)
		break;
		case "ArrowRight":
		case "d":
			min.x = min.x + (xTranslate * mods.tran.x)
			max.x = max.x + (xTranslate * mods.tran.x)
		break;
		case "ArrowLeft":
		case "a":
			min.x = min.x - (xTranslate * mods.tran.x)
			max.x = max.x - (xTranslate * mods.tran.x)
		break;
		case "=":
			min.x = ((min.x * 9)/10)
			max.x = ((max.x * 9)/10)
			min.y = ((min.y * 9)/10)
			max.y = ((max.y * 9)/10)
			xTranslate = ((xTranslate * 9)/10)
		break;
		case "-":
			min.x = ((min.x * 10)/9)
			max.x = ((max.x * 10)/9)
			min.y = ((min.y * 10)/9)
			max.y = ((max.y * 10)/9)
			xTranslate = ((xTranslate * 10)/9)
		break;
		
		default:
			rerender = false
		break;
	}
	if (rerender) render()
})



let scale = 1
let t = undefined
/*
document.onwheel = function (e) {
	e.preventDefault();
	scale += event.deltaY * -0.001;
	scale = Math.min(Math.max(.125, scale), 4);
	min.x = min.x * scale
	max.x = max.x * scale
	min.y = min.y * scale
	max.y = max.y * scale
	if (t != undefined) clearTimeout(t)	
	t = setTimeout( function () {
		console.info(scale)
		render()
	}, 500)
	
}
*/











function reset () {
	min = {
		x: -2,
		y: -2
	}
	max = {
		x: 2,
		y: 2
	}
	
	scale = 1
	clearTimeout(t); t = undefined
	xTranslate = 0.1
	yTranslate = 0.1
	render()
	
}



