var reader=new FileReader();

//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


//Console stuff
var a = random(1,5)
switch(a){
	case 1:
	console.log('Hoi'); break;
	case 2:
	console.log('Hai'); break;	
	case 3:
	console.log('hehe'); break;
	case 4:
	console.log('"NOW THE TIME HAS COME FOR ALL THE WORLD TO BOW BEFORE ME" \n-Pineapple'); break;
	case 5:
	console.log('hehe'); break;
	case 6:
	console.log('Sigh. . . I\'m programming something for Brayden, and he gave me plenty of information, except the only information I actually needed.'); break;
	case 7:
	console.log('ヾ(•ω•`)o'); break;
}



var result






/*
var somevar;
reader.onload=function (evt) {window.somevar=evt.target.text}
var file=document.getElementById('file');
*/
//Main function
function output(text) {
	document.getElementById("output").value = document.getElementById("output").value + text + '\n';
}

function convert() {
//console.log(fileText);
//Cut file up by semicolons:
var sliced = fileText.replace(';', '\n').split("\n");


//Reset output box
document.getElementById("output").value = '';

//loop through each line:
for (const lines of sliced) {

//Remove extra whitespace:
var line = lines.trim()

//Take out comments:
if (line.slice(0,2) == '//') {line = ''}

//Get rid of semicolons:
//line = line.replace(';', '');

//SET:
if (line.includes('var') & !line.includes('getLink')) {
	line = line.replace('var', 'set');
	line = line.replace('=', '');
}

//Operators
if (!line.includes('var') & line.includes('=') & !line.includes('getLink')) {
	//FINISH: Add in the rest of the operators
	line = line.replace('+', ' ?add? ');
	line = line.replace('-', ' ?sub? ');
	line = line.replace('*', ' ?mul? ');
	line = line.replace('/', ' ?div? ');
//	line = line.replace('//', ' ?idiv? ');
	line = line.replace('%', ' ?mod? ');
	line = line.replace('^', ' ?pow? ');
	line = line.replace('==', ' ?equal? ');
	line = line.replace('!=', ' ?notEqual? ');
	line = line.replace('&&', ' ?land? ');
	line = line.replace('<', ' ?lessThan? ');
	line = line.replace('<=', ' ?lessThanEq? ');
	line = line.replace('>', ' ?greaterThan? ');
	line = line.replace('>=', ' ?greaterThanEq? ');
	line = line.replace('===', ' ?strictEqual? ');
	line = line.replace('<<', ' ?shl? ');
	line = line.replace('>>', ' ?shr? ');
	line = line.replace('||', ' ?or? ');
	line = line.replace('&', ' ?and? ');
	line = line.replace('|', ' ?xor? ');
	//	line = line.replace('flip', ' ?not ');
	line = line.replace('max', ' ?max? ');
	line = line.replace('min', ' ?min? ');
	line = line.replace('angle', ' ?angle? ');
	line = line.replace('Math.abs(', ' ?abs? ');
	line = line.replace('Math.log(', ' ?log? ');
//	line = line.replace('vectorLength(', ' ?len? ');
	line = line.replace('noise(', ' ?noise? ');
	line = line.replace('Math.LN10(', ' ?log10? ');
	line = line.replace('Math.sin(', ' ?sin? ');
	line = line.replace('Math.cos(', ' ?cos? ');
	line = line.replace('Math.tan(', ' ?tan? ');
	line = line.replace('Math.floor(', ' ?floor? ');
	line = line.replace('Math.ceil', ' ?ceil? ');
	line = line.replace('Math.sqrt(', ' ?sqrt? ');
	line = line.replace('Math.random(', ' ?rand? 1');
	
	//Get rid of the end of functions like Math.abs():
	line = line.replace(')', '');
	//Get rid of commas in functions:
	line = line.replace(',', '');
	
	//Add a # to the end and middle of the line:
	line = line+'#';
	line = line.replace('=', '#');
	
	//Rearrange the line:
	var bits = [
	line.slice(0, line.indexOf('#')), //The variable
	line.slice(line.indexOf('#'), line.indexOf('?')), 
	line.slice(line.indexOf('?'), line.lastIndexOf('?')), //The operator
	line.slice(line.lastIndexOf('?'), line.lastIndexOf('#'))];
	line = 'op ';
	line = line+bits[2]+' ';
	line = line+bits[0]+' ';
	line = line+bits[1]+' ';
	line = line+bits[3]+' ';
	
	//Get rid of symbols in line:
	while (line.includes('?')) {line = line.replace('?', ' ');}
	while (line.includes('#')) {line = line.replace('#', '');}
}



//Draw:
if (line.includes('draw') & !line.includes('drawflush')) {
	var drawType = '';
	//Clear:
	if (line.includes('clear')) {drawType = 'clear'}
	//Color:
	else if (line.includes('color')) {drawType = 'color';}
	//Stroke width
	else if (line.includes('.stroke')) {drawType = 'stroke';}
	//Line
	else if (line.includes('.line')) {drawType = 'line';}
	//Rectangle:
	else if (line.includes('.rect')) {drawType = 'rectangle';}
	//LineRect
	else if (line.includes('.lineRect')) {drawType = 'lineRect';}
	//Polygon:
	else if (line.includes('.poly')) {drawType = 'poly';}
	//LinePoly:
	else if (line.includes('.linePoly')) {drawType = 'linePoly';}
	//Triangle:
	else if (line.includes('.linePoly')) {drawType = 'triangle';}
	//Image:
	else if (line.includes('.linePoly')) {drawType = 'image';}
	//Filter function arguments:
	var args = line.slice(line.indexOf('(')+1, line.indexOf(')'));
	var argsArray = line.slice(line.indexOf('(')+1, line.indexOf(')')).split(",");
	//Draw based on the type of line.
	switch (drawType) {
		case 'clear':
		line = line.replace(',',' ')
		line = 'draw clear ' + line.slice(line.indexOf('(')+1, line.indexOf(')'));
		line = line.replace(',',' ')
		line = line.replace(',',' ')
		line = line.replace(',',' ')
		break;
		case 'color':
		while (line.includes(',')) {line = line.replace(',',' ');}
		line = 'draw color ' + line.slice(line.indexOf('(')+1, line.indexOf(')'));
		line = line + ' 0 0'
		break;
		case 'stroke':
		line = 'draw stroke ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0 0 0 0 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'line':
		line = 'draw line ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'rectangle':
		line = 'draw rect ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'lineRect':
		line = 'draw lineRect ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'poly':
		line = 'draw poly ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'linePoly':
		line = 'draw linePoly ' + line.slice(line.indexOf('(')+1, line.indexOf(')')) + ' 0'
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'triangle':
		line = 'draw triangle ' + line.slice(line.indexOf('(')+1, line.indexOf(')'))
		while (line.includes(',')) {line = line.replace(',',' ');}
		break;
		case 'image':
		line = 'draw image ' + line.slice(line.indexOf('(')+1, line.indexOf(')'))
		line = line.replace(',',' ');
		line = line.replace('"', '');
		line = line.replace("'", '');
		break;
	} //End of swootch
} //End of Draw()

//Drawflush:
if (line.includes('drawflush(')) {
	//Get rid of ) at the end of function:
	line = line.replace(')','')
	//Add a space between the function and the value:
	line = line.replace('(',' ')
	//Get rid of quotes:
	while (line.includes('"')) {line = line.replace('"', '');}
	while (line.includes("'")) {line = line.replace("'", '');}
}



/*
draw clear 0 0 0 0 0 0
jump 0 notEqual x false
jump 0 lessThanEq x false
*/

//Jump:
if (line.includes('if') & line.includes('jump')) {
line = line.replace('==', ' ?equal? ');
line = line.replace('===', ' ?strictEqual? ');
line = line.replace('!=', ' ?notEqual? ');
line = line.replace('<', ' ?greaterThan? ');
line = line.replace('>', ' ?lessThan? ');
line = line.replace('<=', ' ?lessThanEq? ');
line = line.replace('>=', ' ?greaterThanEq? ');

line = line.replace('(', ' [ ');
line = line.replace(')', ' ] ');

line = line.replace('if', '#');

var bits = [
	line.slice(0, line.indexOf('#')),
	line.slice(line.indexOf('#'), line.indexOf('?')), 
	line.slice(line.indexOf('?'), line.lastIndexOf('?')),
]

var lineInt = line.slice(line.lastIndexOf('('), line.lastIndexOf(')')); //Line to jump to
var int1 = line.slice(line.indexOf('['), line.indexOf('?')); //First number in JUMP
var int2 = line.slice(line.lastIndexOf('?'), line.lastIndexOf(']'));
var operator = line.slice(line.indexOf('?'), line.lastIndexOf('?'));
lineInt = lineInt - 1;

line = 'jump ' +' '+ lineInt +' '+ operator +' '+ int1 +' '+ int2;

//Get rid of leftover symbols:
line = line.replace('(', '', "g");
line = line.replace('[', '', "g");
line = line.replace(']', '', "g");
line = line.replace('{', '', "g");
line = line.replace('?', '', 'g');
line = line.replace('?', '', 'g');
}


//End:
if (line.includes('end')) {
	line = 'end'
}




//Printflush:
if (line.includes('printflush(')) {
	//Get rid of ) at the end of function:
	line = line.replace(')','')
	//Add a space between the function and the value:
	line = line.replace('(',' ')
	//Get rid of quotes:
	while (line.includes('"')) {line = line.replace('"', '');}
	while (line.includes("'")) {line = line.replace("'", '');}
}



//Print:
if (line.includes('print(')) {
	//Get rid of ) at the end of function:
	line = line.replace(')','')
	line = line.replace(')','')
	//Add a space between the function and the value:
	line = line.replace('(',' ')
	line = line.replace('(',' ')
	//Get rid of single quotes:
	while (line.includes("'")) {line = line.replace("'", '"');}
}

//Get Link
if (line.includes('getLink')) {
	linkInt = line.slice(line.indexOf('(')+1, line.indexOf(')'));
	linkVar = line.slice(0, line.indexOf('='));
	line = 'getlink ' + linkVar +' '+ linkInt;
	
	
}










//No double spaces:
line = line.replace('  ', ' ', "g")
while (line.includes('  ')) {line = line.replace('  ', ' ');}

//Output the finished product:
if (line != '') {output(line)}
}//End of line's FOR:



}



var fileText
document.getElementById('file') 
	.addEventListener('change', function() { 
	
	var fr=new FileReader(); 
	fr.onload=function(){ 
		/*document.getElementById('pOutput') 
				.textContent=fr.result; */
				try {fileText = fr.result;} catch (e) {}
	} 
	
	try {fr.readAsText(this.files[0]); document.getElementById("file").style = "color:#d1c49b; background:#4d4c49; border:1px outset #d1c49b; font-family:verdana;";} catch (e) {}
}) 


var explain = false;
function explaination() {
	if (explain == false) {
		document.getElementById('explanation').innerHTML = '';
		explain = true;
	}
	
	else if (explain == true) {
		document.getElementById('explanation').innerHTML = "\nDraw: \nLine: draw.line(x,y,x1,y1) \nPolygon: draw.poly(x,y,sides,radius,rotation) \nRectangle: draw.rect(x,y,width,height) \nTriangle: draw.triangle(x,y,x2,y2,x3,y3) \nImage: draw.image(x,y,@image,size,rotation) \nColor: draw.color(r,g,b,a) \nClear: draw.clear(r,g,b) \nStroke: draw.stroke(size) \ndrawflush(display) \n \nJump \nif (condition) {jump(line number)}\n \nVariables \nvar name = value \nvar name = value + value \n\nPrint: \nprintflush(message)\nprint('text') \n\nGet Link\nname = getlink(link#)";
		explain = false;
	}
}





var song7 = new Audio('resources/game7.mp3')
function play(song) {song.play()}
