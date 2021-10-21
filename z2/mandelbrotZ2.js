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


































let zoomFactor = 1.0
zoomCoords = {x: canvas.width/2, y: canvas.height/2}
let min = {
	x: -2,
	y: -2
}
let max = {
	x: 2,
	y: 2
}
let res = 4



canvas.addEventListener('mousedown', function (event) {
	if (event.button == 0) triggerZoom(event)
	else triggerZoom2(event)
})



/*
function zoomPoint(z,x,y) {
	//xy is point location.
	let center = {x:(canvas.width/2)*res,y:(canvas.height/2)*res}; //Calculated by canvas.width_height/2
	return {x:(x-center.x)*z+center.x,y:(y-center.y)*z+center.y};
}
*/
/*
Then run that through the zoom point equation
{x:minX,y:maxY}
{x:minX,y:minY}

You just calculate the point pos relative to the origin point
And then add that to the translation



*/
function zoomPoint(factor,x,y) {
	//xy is point location.
	let center = {
		x:(canvas.width/2)*res,
		y:(canvas.height/2)*res
	}; //Calculated by canvas.width_height/2
	return {
		x:(x - center.x) * factor + center.x,
		y:(y - center.y) * factor + center.y
	};
}



mandel();





function mandel() {
	
	iterations = iterationBox.value; if (iterations == 0 || isNaN(iterations)) iterations = 255; var h=heightBox.value; if (h<1) h=600; canvas.height=h; canvas.width = h; res = resBox.value; if (res < 1) res = 4;
	let s = h;
	
    for (let y = 0; y < canvas.height/res; y++) {
        for (let x = 0; x < canvas.height/res; x++) {
			
			var zp = zoomPoint(zoomFactor, x, y)
			let xz = zp.x
			let yz = zp.y
			
			let i = 0;

			var cx = prop(xz, min.x, max.x, 0, canvas.width)
			var cy = prop(yz, min.y, max.y, 0, canvas.width)
			let zx = 0;
            let zy = 0;

            do {
                let xt = zx * zy;
                zx = zx * zx - zy * zy + cx;
                zy = 2 * xt + cy;
                i++;
            }
            while (i < iterations && (zx * zx + zy * zy) < 4);

			//let color = palette1[Math.ceil(prop(i, 0, 255, 0, iterations))]
			let color = palette[Math.ceil(prop(i, 0, 255, 0, iterations))]
			context.fillStyle = color
            context.fillRect(x * res, y * res, res, res);
        }
    }
}





function reset () {
	
}