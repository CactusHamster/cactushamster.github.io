let prop = (oldNum=5, newmin=-2, newmax=2, oldmin=0, oldmax=255) => ((oldNum - oldmin) / (oldmax - oldmin) ) * (newmax - newmin) + newmin
const canvas = document.getElementsByTagName('canvas')[0]
const ctx = canvas.getContext('2d')
const prevCTX = document.getElementsByTagName('canvas')[1].getContext('2d')
function render () {
	canvas.width = (window.innerWidth * 9) / 10
	prevCTX.canvas.width = (window.innerWidth * 9) / 10
	let phase = [+p1.value, +p2.value, +p3.value].map(val => val * Math.PI)
	let length = +lSlr.value ?? 10
	let ff = (Math.PI * 2) / length
	let frequency = [ff * +f1.value, ff * +f2.value, ff * +f3.value]
	let width = +wSlr.value ?? 127.5
	let center = +cSlr.value ?? 127.5
	let step = canvas.width / length
	for (let x = 0; x <= canvas.width; x++) {
		let rgb = [
			Math.sin((frequency[0] * x) + phase[0]) * width + center,
			Math.sin((frequency[1] * x) + phase[1]) * width + center,
			Math.sin((frequency[2] * x) + phase[2]) * width + center
		]
		ctx.fillStyle = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
		ctx.fillRect(x*step-1, 0, step+2, canvas.height)
		for (let i = 0; i < 3; i++) {
			prevCTX.fillStyle = ['rgba(255, 0, 0, 0.1)', 'rgba(0, 255, 0, 0.1)', 'rgba(0, 0, 255, 0.1)'][i]
			let height = prop(rgb[i], 0, prevCTX.canvas.height, 0, 255)
			prevCTX.fillRect(x * (prevCTX.canvas.width/length)-1, prevCTX.canvas.height, (prevCTX.canvas.width/length)+2, -height)
		}
	}
}
Array.from(document.getElementsByClassName('s')).forEach(slider => slider.oninput = render)
Array.from(document.getElementsByClassName('freq')).forEach(slider => {slider.min = 0; slider.max = 2; slider.step = 0.05; slider.value = 1})
Array.from(document.getElementsByClassName('phas')).forEach(slider => {slider.min = 0; slider.max = 2; slider.step = 0.05; slider.value = 0})
render()