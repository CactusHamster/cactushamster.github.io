rectSettingsButton.onclick = function () {
	courseRec(rectXInput.value, rectYInput.value, rectWidthInput.value, rectHeightInput.value)
}

function listRectangleTypes () {
	console.log('RECTANGLE TYPES:')
	console.log('normal: Just your average obstacle; square can jump on it as a platform.\n\n')
	
	
	
	
}

function listFunctions () {
	console.log('FUNCTIONS:')
	console.log('courseRec(x, y, width, height, color, type):\n', 'Creates a rectangular objsct on the canvas of the given type and color.\n\n')
}


listFunctions()
listRectangleTypes()