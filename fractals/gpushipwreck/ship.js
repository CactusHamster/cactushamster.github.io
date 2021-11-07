let canvas = document.getElementById('canvas')
let ctx2 = canvas.getContext('webgl')
if (ctx2 == null) console.info('NULL CTX')





let min = {
	x: -2,
	y: -2
}
let max = {
	x: 2,
	y: 2
}
let xTranslate = 0.2
let yTranslate = 0.2
let mods = {
	tran: {
		x: 0.1,
		y: 0.1
	},
	zoom: {
		x: 10,
		y: 10
	}
}
document.onkeydown = (function (e) {
	if (document.activeElement != canvas && document.activeElement != body) return
	let winWidth,winHeight
	ymaxBox.value=max.y
	xminBox.value=min.x
	yminBox.value=min.y
	xmaxBox.value=max.x
	let rerender = true
	let a = 0;
	switch (e.key) {
		case "ArrowUp":
		case "w":
			min.y = min.y + (yTranslate * mods.tran.y)
			max.y = max.y + (yTranslate * mods.tran.y)
		break;
		case "ArrowDown":
		case "s":
			min.y = min.y - (yTranslate * mods.tran.y)
			max.y = max.y - (yTranslate * mods.tran.y)
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
			/*min.x = ((min.x * 9)/10) * ( 1 / mods.zoom.x )
			max.x = ((max.x * 9)/10) * ( 1 / mods.zoom.x )
			min.y = ((min.y * 9)/10) * ( 1 / mods.zoom.y )
			max.y = ((max.y * 9)/10) * ( 1 / mods.zoom.y )*/
			winWidth = Math.abs(max.x-min.x)
			winHeight = Math.abs(max.y-min.y)
			min.x = min.x + winWidth/(2 * mods.zoom.x)
			max.x = max.x - winWidth/(2 * mods.zoom.x)
			min.y = min.y + winHeight/(2 * mods.zoom.y)
			max.y = max.y - winHeight/(2 * mods.zoom.y)
			xTranslate = (winWidth/10) //Make it move 1/10 of the window width
			yTranslate = (winHeight/10)
			
			//xTranslate = ((xTranslate * 9)/10)
			//yTranslate = ((yTranslate * 9)/10)
		break;
		case "-":
			console.info('Zooming Out!')
			/*min.x = ((min.x * (10*mods.zoom.x))/9); max.x = ((max.x * 10)/9) * (mods.zoom.x / 1); min.y = ((min.y * 10)/9) * (mods.zoom.y / 1); max.y = ((max.y * 10)/9) * (mods.zoom.y / 1)*/
			winWidth = Math.abs(max.x-min.x)
			winHeight = Math.abs(max.y-min.y)
			min.x = min.x - winWidth/(2 * mods.zoom.x)
			max.x = max.x + winWidth/(2 * mods.zoom.x)
			min.y = min.y - winHeight/(2 * mods.zoom.y)
			max.y = max.y + winHeight/(2 * mods.zoom.y)
			
			xTranslate = (winWidth/10) //Make it move 1/10 of the window width
			yTranslate = (winHeight/10)
		break;
		
		default:
			rerender = false
		break;
	}
	if (rerender) render()
})


transSlider.addEventListener('input', function (e) {
	transbox.value = transSlider.value
	mods.tran.x = Number(this.value)
	mods.tran.y = mods.tran.x
})
zoomSlider.addEventListener('input', function (e) {
	zoombox.value = zoomSlider.value
	mods.zoom.x = 1/Number(this.value)
	mods.zoom.y = 1/Number(this.value)
})
zoombox.addEventListener('input', function (e) {
	zoomSlider.value = this.value
})
transbox.addEventListener('input', function (e) {
	transSlider.value = this.value
})



function reset () {
	min = {x: -2,y: -2}
	max = {x: 2,y: 2}
	
	
	
	scale = 1
	clearTimeout(t); t = undefined
	xTranslate = 0.1
	yTranslate = 0.1
	render()
	
}










function burningShip (x, y, it=64) {
	let i = 0
	let zx = 0, zy = 0
	while (zx*zx + zy*zy < 4 && i < it) {
		let cx = zx*zx - zy*zy + x
		zy = Math.abs(2*zx*zy) + y
		zx = cx
		i++
	}
	return i;
}
function color1 (i) { //For 255 iteration mandelbrot
	let r = 0, g = 0, b = 0;
	if (i < 85) r = i * 3
	else if (i < 171) g = 3 * (i - 84)
	else b = 3 * (i - 170);
	return [r, g, b]
}






const gpu = new GPU({
	canvas: canvas,
	context: ctx2
	/*,mode: 'WebGL2Kernel'*/
	
})


let s = 700 //S

let GPUsettings = {
	output: { x: s, y: s}
}


function prop (oldNum, newmin, newmax, oldmin, oldmax) {var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin; return newNum}



const mkernel = gpu.createKernel(function (it, xm, ym, xma, yma, size) {
	let x = this.thread.x
	let y = this.thread.y
	let cx = (x/size) * (xma - xm) + xm
	let cy = (y/size) * (yma - ym) + ym
	let i = 0
	let zx = 0, zy = 0
	while (zx*zx + zy*zy < 4 && i < it) {
		let cx = zx*zx - zy*zy + cx
		zy = Math.abs(2*zx*zy) + cy
		zx = cx
		i++
	}
	let a = color1(i)
	this.color(a[0], a[1], a[2])
}, GPUsettings)
.setGraphical(true)
mkernel.kernel.dynamicOutput = true
mkernel.addFunction(color1)



//let out = mkernel(255, -2, -2, 2, 2, s)
//let out = mkernel(input(255))
//let out = mkernel(6)
let IT = 255

sizebox.addEventListener('input', function () {
	s = Number(sizebox.value); if (isNaN(s) || s < 1) s = 700
	canvas.width = s; canvas.height = s;
	render()
})


async function render () {
	let iterations = Number(iterationBox.value); if (iterations == 0 || isNaN(iterations)) iterations = IT;
	await mkernel.setOutput({x: s, y: s})
	await mkernel(iterations, min.x, min.y, max.x, max.y, s)
}

/*
let ctx = canvas2.getContext('2d')
for (let a of out) {
	for (let b of a) {
		let x = prop(b[0],-2, 2, 0, 600)
		let y = prop(b[1], -2, 2, 0, 600)
		let i = mandel(x, y, 255)
		ctx.fillStyle = color1(i)
		ctx.fillRect(b[0], b[1], 1, 1)
	}
}
*/





