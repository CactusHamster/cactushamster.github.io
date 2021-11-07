'use strict'
let imageInput = document.getElementById('loadImageInput')
let canvas = document.getElementsByTagName('canvas')[0]
let ctx = canvas.getContext('2d')
let ctxImage = new Image()

let sizeControlSize = 12

HTMLCanvasElement.prototype.getMousePosition = function (event) {
  let rect = this.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;
  return {x: x, y: y}
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    //console.info(srcWidth, srcHeight, maxWidth, maxHeight, ratio)
    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }
function prop (oldNum, newmin, newmax, oldmin, oldmax) {var newNum = ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin; return newNum}


let imageX = 0
let imageY = 0

sizeControlSizeSlider.addEventListener('input', function () {
  sizeControlSize = this.value
  render()
})

imageInput.addEventListener('change', function (e) {
  let file = e.target.files[0]
  if (!file) return
  let rd = new FileReader()
  rd.readAsDataURL(file);
  rd.addEventListener('load', function () {
    ctxImage.src = this.result
    ctxImage.onload = function () {
      if (this.width > canvas.width || this.height > canvas.height) {
        let xy = calculateAspectRatioFit(this.width, this.height, canvas.width, canvas.height)
        this.width = xy.width
        this.height = xy.height
      }
      render()
      //imageX = 0
      //imageY = 0
    }
  })
})



let simSize = {
  w: (612),
  h: (384)
}

function render () {
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = 'black'
  ctx.fillRect((canvas.width/2)-((simSize.w/2)+4), ((canvas.height/2)-(simSize.h/2)+4), simSize.w-4, simSize.h-4)

  ctx.fillStyle = 'purple'
  ctx.fillRect(imageX - sizeControlSize, imageY  + ctxImage.height, ctxImage.width + (sizeControlSize*2), (sizeControlSize))
  ctx.fillRect(imageX-sizeControlSize, imageY, ctxImage.width + (sizeControlSize*2), -sizeControlSize)


  ctx.drawImage(ctxImage, imageX, imageY, ctxImage.width, ctxImage.height);

  ctx.fillStyle = 'red'
  ctx.fillRect(ctxImage.width+imageX-1, imageY, sizeControlSize, ctxImage.height)
  ctx.fillStyle = 'red'
  ctx.fillRect(imageX+1, imageY, -sizeControlSize, ctxImage.height)

  ctx.fillStyle = 'green'
  ctx.fillRect(imageX, imageY+1, ctxImage.width, -sizeControlSize)
  ctx.fillStyle = 'green'
  ctx.fillRect(imageX, ctxImage.height+imageY-1, ctxImage.width, sizeControlSize)

}


let canvasMouseDown = false
let imageHeld = false
let lastMouseCoords = {x: 0, y: 0}

let buttonsHeld = []

canvas.onmousedown = function (e) {
  let mc = canvas.getMousePosition(e)
  canvasMouseDown = true
  if (mc.x > imageX && mc.x < ctxImage.width+imageX && mc.y > imageY && mc.y < ctxImage.height + imageY) {
    buttonsHeld['image'] = [mc, {x: imageX, y: imageY}]
  }

  if (mc.x > ctxImage.width+imageX && mc.y > imageY - sizeControlSize && mc.x <  ctxImage.width+imageX+sizeControlSize && mc.y < ctxImage.height + imageY + sizeControlSize) {
    buttonsHeld['widthR'] = mc.x
  }
  if (mc.x < imageX && mc.y > imageY - sizeControlSize && mc.x < imageX + ctxImage.width-sizeControlSize && mc.y < ctxImage.height + imageY + sizeControlSize) {
    buttonsHeld['widthL'] = [mc.x, imageX, ctxImage.width]
  }

  if (mc.x > imageX - sizeControlSize && mc.y < imageY && mc.x < imageX + sizeControlSize + ctxImage.width  && mc.y > imageY-sizeControlSize) {
    buttonsHeld['heightDown'] = [mc.y, imageY, ctxImage.height]
    console.info('h')
  }
  if (mc.y > imageY + ctxImage.height && mc.y < ctxImage.height + sizeControlSize + imageY && mc.x > imageX - sizeControlSize && mc.x < imageX + ctxImage.width + sizeControlSize) {
    buttonsHeld['heightUp'] = mc.x
  }

  render()
}

canvas.onmouseup = function (e) {
  canvasMouseDown = false
  render()
  buttonsHeld = []
}

canvas.onmousemove = function (e) {
  if (!canvasMouseDown) return false;
  let mc = canvas.getMousePosition(e)
  if (!!buttonsHeld['image']) {
    let offX = buttonsHeld['image'][0].x - (buttonsHeld['image'][1].x + ctxImage.width/2);
    let offY = buttonsHeld['image'][0].y - (buttonsHeld['image'][1].y + ctxImage.height/2);
    imageX = (mc.x - (ctxImage.width/2))-offX
    imageY = (mc.y - (ctxImage.height/2))-offY
  }
  if (!!buttonsHeld['widthR']) {
    ctxImage.width = mc.x - imageX
  }
  if (!!buttonsHeld['widthL']) {
    imageX = mc.x + (buttonsHeld['widthL'][1] - buttonsHeld['widthL'][0])
    ctxImage.width = buttonsHeld['widthL'][2] - (imageX - buttonsHeld['widthL'][1])
  }
  if (!!buttonsHeld['heightDown']) {
    imageY = mc.y + (buttonsHeld['heightDown'][1] - buttonsHeld['heightDown'][0])
    ctxImage.height = buttonsHeld['heightDown'][2] - (imageY - buttonsHeld['heightDown'][1])
  }
  if (!!buttonsHeld['heightUp']) {
    ctxImage.height = mc.y - imageY
  }

  render()
}







window.addEventListener('resize', function resizeCanvas() {
  imageX = prop(imageX, 0, window.innerWidth, 0, canvas.width,)
  imageY = prop(imageY, 0, window.innerHeight-100, 0, canvas.height,)
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight-100;
  render()
}, false);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-100;
render()
//setInterval(render, 50)
