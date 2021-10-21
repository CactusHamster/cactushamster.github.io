function prop (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) {var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin; return newNum}

function color1 (i) { //For 255 iteration mandelbrot
	let r = 0, g = 0, b = 0;
	if (i < 85) r = i * 3
	else if (i < 171) g = 3 * (i - 84)
	else b = 3 * (i - 170);
	r = r.toString(16); g = g.toString(16); b = b.toString(16);
	if (r.length == 1) {r = "0" + r;} if (g.length == 1) {g = "0" + g;} if (b.length == 1) {b = "0" + b;}
	return String("#" + r + g + b).slice(0, 7);
}

function color2 (i) { //For 255 iteration mandelbrot
	let r=0,g=0,b=0
	if ( i < 31 ) r = 255 - 40 * Math.floor(1 / (i / 10))
	else if ( i < 131 ) {
		r = 255;
		g = Math.floor(2.1 * (i - 30))
	}
	else {
		r = 255 - Math.floor((i - 130) * 2);
		g = 255 - Math.floor((i - 130) * 2);
		b = Math.floor((i - 130) * 2);
	}
	r = r.toString(16); g = g.toString(16); b = b.toString(16);
    if (r.length == 1) r = "0" + r; if (g.length == 1) g = "0" + g; if (b.length == 1) b = "0" + b;
	return String("#" + r + g + b); // final hex string	
}



jpallette = []
for(x=0;x<9;x++) {
	color=(31*x).toString(16); // convert the number to hex
	if(color.length==1) color='0'+color;  // add a zero in front if only one hex digit
	jpallette[x]="#"+color+color+'ff'; // colors 0-8: the Red and Green components change, Blue=FF
	jpallette[x+8]='#00ff'+color;      // colors 8-16: the Blue component changes, Red and Green=FF
	jpallette[17+x]="#"+color+'0000';  // colors 17-25: the Red component changes, Green and Blue=0
}
function color3 (i) { //Julia with 25 iterations
	return jpallette[i]
}









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



var creal = -.8
var cimag = .156;
function julia1 (x, y, it=25) {
	
	
	var i = 0;
	while ((x*x+y*y<4)&&i<it) {
		let xt=x*x-y*y+creal;
		y=2*x*y+cimag;
		x=xt;
		i++;
	}
	return i
}


let IT = 255
let fractal = mandel
let clr = color1
function fractalChoice (e) {
	switch (document.getElementById('fractalChoice').value) {
		default:
		case "mandel":
			fractal = mandel
			colorList.innerHTML = '<option value="1" title="Blue, red, green, pretty simple.">Palette 1</option><option value="2" title="Blue and orange makes a nice contrast!">Palette 2</option>'
			IT = 255
			document.getElementById('juliaControls').innerHTML = ''
		break;
		case "ship":
			fractal = burningShip
			colorList.innerHTML = '<option value="1" title="Blue, red, green, pretty simple.">Palette 1</option><option value="2" title="Blue and orange makes a nice contrast!">Palette 2</option>'
			IT = 64
			document.getElementById('juliaControls').innerHTML = ''
		break;
		case "julia1":
			fractal = julia1
			colorList.innerHTML = '<option value="3" title="Just a red fractal with blue background.">Palette 3</option>'
			document.getElementById('juliaControls').innerHTML = `<input type="range" min="-100" max="700" step="1" value="250" class="slider" title="Julia Exponent" oninput="frame = Number(frameSlider.value); if (isNaN(frame)) frame = 0; creal=-.8+.6*Math.sin(frame/(3.14*20));cimag=.156+.4*Math.cos(frame/(3.14*40)); render()" id="frameSlider">`
			IT = 25
		break;
	}
	colorChoice()
}
function colorChoice (e) {
	switch (document.getElementById('colorList').value) {
		default:
		case "1":
			clr = color1
		break;
		case "2":
			clr = color2
		break;
		case "3":
			clr = color3
		break;	
	}
}
document.getElementById('fractalChoice').addEventListener('input', fractalChoice)
document.getElementById('colorList').addEventListener('input', colorChoice)
















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
	//fractalChoice()
	let iterations = iterationBox.value; if (iterations == 0 || isNaN(iterations)) iterations = IT; var s=sizeBox.value; if (s<1) s=600; canvas.height = s; canvas.width = s; res = resBox.value; if (res < 1) res = 4;
	s = s / res
	
	for (let x = 0; x < s; x++) {
		for (let y = 0; y < s; y++) {
			let cx = prop(x, min.x, max.x, 0, s)
			let cy = prop(y, min.y, max.y, 0, s)
			
			let i = fractal(cx, cy, iterations)
			
			//if (x % 100 == 0) console.info(cx, cy, x, y, s, i)
			ctx.fillStyle = clr(i)
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
		x: 2,
		y: 2
	}
	
}


let down = undefined
document.onkeydown = (function (e) {
	if (document.activeElement != canvas && document.activeElement != body) return
	ymaxBox.value=max.y
	xminBox.value=min.x
	yminBox.value=min.y
	xmaxBox.value=max.x
	let winWidth,winHeight
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



