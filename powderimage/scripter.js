const gpu = new GPU();
gpu.addFunction(prop)

let newcanva = document.createElement('CANVAS')
let genctx = newcanva.getContext('2d')

function closest (arr, goal) {
	var ret = arr.reduce(function(prev, curr) {
		return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
	});
	return ret
}




let tptcolors = ["0","16769184","2109648","4210704","16715776","10526880","14700560","12632272","2154512","16764944","14745376","13664480","8404992","10535167","4210784","16777088","12640511","12623936","2154751","4223008","830464","15554047","7932683","10526975","12632256","1056960","16777215","4215024","13434879","5263472","7360608","16777215","7368736","15790267","14737578","8409168","5263488","8429791","10396598","3158064","15724527","13421772","11184810","5263424","16765072","4210752","4214864","6316128","16777120","12294655","4210752","12640511","15419671","8750341","5263440","16769184","1063697","2236962","4456448","2236962","8429807","8429823","5521729","15655104","12300448","10518672","4478052","8421504","8421631","16752704","677638","6532447","8421504","3355443","3881738","3869194","7368816","14737632","830464","7681424","6710886","14737632","2109648","5300191","7938080","699146","8454048","16777152","7368768","16724753","16760368","13421772","11184810","16764992","16724223","5439","1052688","657979","6710886","4473924","12640511","1056960","2105376","65399","65467","58453","4210745","11153616","6693001","15423767","8427","11180458","7825015","16777198","498176","52428","16769184","11184810","11184810","11184810","7829367","4473924","2171169","5673490","4235360","86","16759552","16777215","6579455","16773768","2117856","2368548","11197917","8960955","6728447","7368800","14675967","39372","10079232","12603472","12628048","668160","16750848","11140864","9474192","2391038","00000000","16773768","5271807","16119260","2105376","16777215","7564141","3874058","670523","14984356","16763904","1131707","16769184","48127","10079232","4473958","16620824","8978312","16580821","20480","20480","12320512","11180441","10066312","14462252","5263440","14360608","10027008","16650742","13895885","16673022","61046","16755234","14078420","13329233","15790240","5267504","7525076","8700623","3368601","6750054","12373471","14016747","8166400","7500402","11971263"]
//let avgclr = []

function getColor(v) {
	let b = (  ((v)>>(8*0))&0xff  )
	let g = (  ((v)>>(8*1))&0xff  )
	let r = (  ((v)>>(8*2))&0xff  )

	return [r,g,b];
}

//new code stuff

let colors = tptcolors.map((val) => {return getColor(val);});

function dist(x,y,z,x2,y2,z2) {
	return Math.hypot(x-x2,y-y2,z-z2);
}

function getClosest(r,g,b) {
	//returns the index of closest elem to rgb value

	let minDist = Infinity;
	let minI = 0;

	colors.forEach((item,i) => {
		let d = dist(...item,r,g,b);
		if (d<minDist) {minI = i;minDist = d;}
	});

	return minI;
}

//...



function rgbaverage (r, g, b) {
	return (r + g + b);// / 3
}


const genimage = new Image()
const getColors = gpu.createKernel(function(img, xoffset, yoffset) {
		let x = this.thread.x
		let y = this.thread.y
		const c = img[this.thread.y + yoffset][this.thread.x + xoffset];
		
		c[0] = c[0] * 255
		c[1] = c[1] * 255
		c[2] = c[2] * 255
		c[3] = c[3] * 255
		
		//this.color(c[0], c[1], c[2], c[3]);
		return c
})
.setOutput([simSize.w - 8, simSize.h - 8])


function generateScript() {
	if (!ctxImage.src) return alert('You need to add an image!');
	let debugLog = []
	ctx.fillStyle = 'white'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	ctx.fillStyle = 'black'
	ctx.fillRect((canvas.width / 2) - ((simSize.w / 2) + 4), ((canvas.height / 2) - (simSize.h / 2) + 4), simSize.w - 4, simSize.h - 4)

	ctx.drawImage(ctxImage, imageX, imageY, ctxImage.width, ctxImage.height);

	genimage.src = canvas.toDataURL()
	genimage.onload = () => {
		//let script = ['']
		let script = ['function image ()'];
		let colors = getColors(genimage, (canvas.width / 2) - ((simSize.w / 2) + 4), ((canvas.height / 2) - (simSize.h / 2) + 4));
		let matches = {}; //Stores matched colors to their elements for speed
		
	
	  
	  for (y in colors) {
		  for (x in colors) {
			let c = colors[y][x]
			  
			if (c[0] == 0 && c[1] == 0 && c[2] == 0 && (c[3] == 0 || c[3] == 255)) {
				continue;
			}


			let j = c.join('|')
			if (matches[j] == undefined) { //Checks if there is an already created key
				let u = getClosest(...c) //Sets u to the closest colored tpt element index
				matches[j] = u
			}



			c = matches[j] ?? c
			script.push(`sim.partCreate(-3, ${x}, ${-y + (simSize.h-4)}, ${c})`)
		}
		script.push(`-- y = ${y}`)
	  }
	  //console.info(matches)
	  script.push('end')
	  
		download('program.lua', script.join('\n'))
		//download('debug.log', debugLog.join('\n'))
	};
}