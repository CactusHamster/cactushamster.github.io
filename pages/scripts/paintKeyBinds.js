this.addEventListener('keypress', event => {
  if (event.key == '[') {
	  if (paintsize > 1) {paintsize = paintsize-1}
  }
})


this.addEventListener('keypress', event => {
  if (event.key == ']') {
    if (paintsize < 100) {paintsize = paintsize+1}
  }
})