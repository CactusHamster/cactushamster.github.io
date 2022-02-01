itBox.value = ITERATIONS
escBox.value = Infinity
itChangeBut.onclick = function () { ITERATIONS = isNaN(+itBox.value) ? 255 : +itBox.value; render() }
escChangeBut.onclick = function () { escape_radius = +escBox.value < 1 ? 1e+36 : +escBox.value; render() }
itBox.oninput = itChangeBut.onclick
escBox.oninput = escChangeBut.onclick
cpuToggle.onclick = function () { useCPU = !useCPU; ctx.clearRect(0, 0, cpucanvas.width, cpucanvas.height); cpuToggle.value = useCPU ? 'Use GPU' : "Use CPU"; render() }
resBox.value = res; resChangeButton.onclick = function () {res = ( resBox.value < 1 ) ? 10 : +resBox.value; render()}; resBox.onchange = resChangeButton.onclick
cpucSiToggle.onclick = function (e) {
	let a = cpucanvas.width == canvas.width
	cpucanvas.width = a ? canvas.width/2 : canvas.width
	cpucanvas.height = a ? canvas.height/2 : canvas.height
	e.target.value = !a ? "half canvas" : "full canvas"
	render()
}