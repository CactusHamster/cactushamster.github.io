//event.preventDefault();

this.addEventListener('keypress', event => {
  if (event.key == '[') {
	  console.log(paintsize)
	  if (paintsize > 2) {paintsize = paintsize-1;}
  }
})


this.addEventListener('keypress', event => {
  if (event.key == ']') {
	  console.log(paintsize)
    if (paintsize < 100) {paintsize = paintsize + 1;}
  }
})