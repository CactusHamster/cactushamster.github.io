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
var sliced = fileText.split("\n");

//Reset output box
document.getElementById("output").value = '';

//loop through each line:
for (const lines of sliced) {

//Remove extra whitespace:
var line = lines.trim()

//Take out comments:
if (line.slice(0,2) == '//') {line = ''}

//Get rid of semicolons:
line = line.replace(';', '');

//SET:
if (line.includes('var')) {
	line = line.replace('var', 'set');
	line = line.replace('=', '');
}

//Operators
if (!line.includes('var') & line.includes('=')) {
	//FINISH: Add in the rest of the operators
	line = line.replace('+', ' add ');
	line = line.replace('-', ' sub ');
	line = line.replace('*', ' mul ');
	line = line.replace('/', ' div ');
//	line = line.replace('//', ' idiv ');
	line = line.replace('%', ' mod ');
	line = line.replace('^', ' pow ');
	line = line.replace('==', ' equal ');
	line = line.replace('!=', ' notEqual ');
	line = line.replace('&&', ' land ');
	line = line.replace('<', ' lessThan ');
	line = line.replace('<=', ' lessThanEq ');
	line = line.replace('>', ' greaterThan ');
	line = line.replace('>=', ' greaterThanEq ');
	line = line.replace('===', ' strictEqual ');
	line = line.replace('<<', ' shl ');
	line = line.replace('>>', ' shr ');
	line = line.replace('||', ' or ');
	line = line.replace('&', ' and ');
	line = line.replace('|', ' xor ');
	//	line = line.replace('flip', ' not ');
	line = line.replace('max', ' max ');
	line = line.replace('min', ' min ');
	line = line.replace('angle', ' angle ');
	line = line.replace('Math.abs(', ' abs ');
	line = line.replace('Math.log(', ' log ');
//	line = line.replace('vectorLength(', ' len ');
	line = line.replace('noise(', ' noise ');
	line = line.replace('Math.LN10(', ' log10 ');
	line = line.replace('Math.sin(', ' sin ');
	line = line.replace('Math.cos(', ' cos ');
	line = line.replace('Math.tan(', ' tan ');
	line = line.replace('Math.floor(', ' floor ');
	line = line.replace('Math.ceil', ' ceil ');
	line = line.replace('Math.sqrt(', ' sqrt ');
	line = line.replace('Math.random(', ' rand 1');
	//Get rid of the end of functions like Math.abs():
	line = line.replace(')', '');
	//Get rid of commas in functions:
	line = line.replace(',', '');
	//Rearrange the line:
	var bits = line.split(' ');
	line = 'op ';
	line = line+bits[3]+' ';
	line = line+bits[0]+' ';
	line = line+bits[2]+' ';
	line = line+bits[bits.length-1];
}



//Draw:
/*
draw clear 0 0 0 0 0 0
draw rect 0 0 0 0 0 0
draw line 0 0 0 0 0 0
draw color 0 0 0 255 0 0
drawflush display1
*/

if (line.includes('draw(')) {
	var drawType = '';
	
	//Clear:
	if (line.includes ('clear')) {drawType = 'clear';}
	//Rectangle:
	else if (line.includes ('rect')) {drawType = 'rect';}
	//Color:
	else if (line.includes ('color')) {drawType = 'color';}
	//Stroke width
	else if (line.includes ('stroke')) {drawType = 'stroke';}
	//Line
	else if (line.includes ('line')) {drawType = 'line';}

}


//No double spaces:
line = line.replace('  ', ' ')
line = line.replace('  ', ' ')
line = line.replace('  ', ' ')
//Output the finished product:
output(line)


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





