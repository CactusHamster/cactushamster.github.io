

iterationSlider.oninput = function () {
	render()
}


function render () {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//let iterations = 255*500
	let iterations = Number(iterationSlider.value); if (iterations < 1 || isNaN(iterations)) iterations = 40000
	let res = Number(resbox.value); if (res < 1 || isNaN(res)) res = 4
	
	let i = 0
	let x=0, y=0
	while (i < iterations) {
		
		
		
		let nx, ny;
        let r = Math.random();
        if (r < 0.01) {
            nx =  0;
            ny =  0.16 * y;
        } else if (r < 0.86) {
            nx =  0.85 * x + 0.04 * y;
            ny = -0.04 * x + 0.85 * y + 1.6;
        } else if (r < 0.93) {
            nx =  0.20 * x - 0.26 * y;
            ny =  0.23 * x + 0.22 * y + 1.6;
        } else {
            nx = -0.15 * x + 0.28 * y;
            ny =  0.26 * x + 0.24 * y + 0.44;
        }

        // Scaling and positioning
        let plotX = canvas.width * (x + 3) / 6;
        let plotY = canvas.height - canvas.height * ((y + 2) / 14);
		console.info(x)
		console.info(y)


		ctx.fillStyle = "green"
        ctx.fillRect(plotX, plotY, 1, 1);

        x = nx;
        y = ny;
		
		
		
		
		i = i + 1
	}
	
	
	
}