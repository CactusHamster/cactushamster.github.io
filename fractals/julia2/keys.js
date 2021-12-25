document.addEventListener('keypress', function (e) {
	console.log(e.key)
	e.preventDefault()
	switch (e.key) {
	case "d":
		translate(0.1, 0)
		break;
	case "a":
		translate(-0.1, 0)
		break;
	case "w":
		translate(0, 0.1)
		break;
	case "s":
		translate(0, -0.1)
		break;
	case "=":
		zoom(4)
		break;
	case "-":
		zoom(-4)
		break;
	case " ":
		togglePause()
		break;
	case ".":
		updateIterate(1)
		break;
	case ",":
		updateIterate(-1)
		break;
	case "q":
		frame = frame - fskip
		render()
		break;
	case "e":
		frame = frame + fskip
		render()
		break;
	}
})