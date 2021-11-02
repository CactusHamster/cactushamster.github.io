
HTMLCanvasElement.prototype.relativeCoords = function(event) {
  var x,y;
  //This is the current screen rectangle of canvas
  var rect = this.getBoundingClientRect();
  var top = rect.top;
  var bottom = rect.bottom;
  var left = rect.left;
  var right = rect.right;
  //Recalculate mouse offsets to relative offsets
  x = event.clientX - left;
  y = event.clientY - top;
  //Also recalculate offsets of canvas is stretched
  var width = right - left;
  //I use this to reduce number of calculations for images that have normal size 
  if(this.width!=width) {
    var height = bottom - top;
    //changes coordinates by ratio
    x = x*(this.width/width);
    y = y*(this.height/height);
  } 
  //Return as an array
  return [x,y];
}
HTMLCanvasElement.prototype.download = function () {
  var link = document.createElement('a');
  link.download = 'mandel.png';
  link.href = this.toDataURL()
  link.click();	
}

document.getElementsByName('body')[0].onload = function () {
	render()
}