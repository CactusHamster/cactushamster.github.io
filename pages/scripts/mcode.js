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
var sliced = fileText.split(";");

//Reset output box
document.getElementById("output").value = '';

//loop through each line:
for (const lines of sliced) {

//Remove extra whitespace:
var line = lines.trim()

//SET:
if (line.includes('var')) {
	line = line.replace('var', 'set');
	line = line.replace('=', '');
}

//No double spaces:
line = line.replace('  ', ' ')

//Operators
//op idiv result a b
//op idiv result a b
op mod result a b
op pow result a b
op equal result a b




if (!line.includes('var') & line.includes('=')) {
	//FINISH: Add in the rest of the operators
	line = line.replace('+', ' add ');
	line = line.replace('-', ' sub ');
	line = line.replace('*', ' mul ');
	line = line.replace('/', ' div ');
	line = line.replace('//', ' idiv ');
	line = line.replace('%', ' mod ');
	line = line.replace('^', ' pow ');
	line = line.replace('==', ' equal ');
	var bits = line.split(' ');
	line = 'op ';
	line = line+bits[3]+' '
	line = line+bits[0]+' '
	line = line+bits[2]+' '
	line = line+bits[bits.length-1]	
}

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





