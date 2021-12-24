document.addEventListener('keypress', function (e) {
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
	}
})