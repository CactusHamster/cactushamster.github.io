let newcanva = document.createElement('CANVAS')
let genctx = newcanva.getContext('2d')

function generateScript () {
  if (!ctxImage.src) return alert('You need to add an image!');
  genctx.fillStyle = 'white'
  let lines = []

  ctx.fillStyle = 'black'
  ctx.fillRect((canvas.width/2)-((simSize.w/2)+4), ((canvas.height/2)-(simSize.h/2)+4), simSize.w-4, simSize.h-4)

  genctx.fillRect(0, 0, newcanva.width, newcanva.height)
  ctx.drawImage(ctxImage, imageX, imageY, ctxImage.width, ctxImage.height);

  for (let x = 1; x < simSize.w-8; x++) {
    for (let y = 1; y < simSize.h-8; y++) {
      let c = genctx.getImageData(x+(canvas.width/2)-(((simSize.w/2))+4), y+((canvas.height/2)-(simSize.h/2)+4), 1, 1).data
      lines.push(`graphics.fillRect(${x}, ${y}, 1, 1, ${c[0]}, ${c[1]}, ${c[2]}, ${c[3] ?? 255})`)
    }
  }


  download(lines.join(\n), 'program.lua')
}
