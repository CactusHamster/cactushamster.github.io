var keyvents = []; //Gotta love the pun
var keyFunctions = [];
var keyvents2 = []; //Gotta love the pun
var keyFunctions2 = [];




//Function to make events with keys
function keyon(key, action) {
	keyvents.push(key)
	keyFunctions.push(action)
}

//Efficient way to register key events (inspired by my homemade discord bot framework)
this.addEventListener('keydown', event => {
	/*console.log(event)
	console.log(event.key)
	console.log(event.keyCode)*/
	keyvents.forEach(function (currentValue, index) {
	if (currentValue == event.key) {
		keyFunctions[index]()}
	});
})

function keyoff(key, action) {
	keyvents2.push(key)
	keyFunctions2.push(action)
}

//Efficient way to register key events (inspired by my homemade discord bot framework)
this.addEventListener('keyup', event => {
	/*console.log(event)
	console.log(event.key)
	console.log(event.keyCode)*/
	keyvents2.forEach(function (currentValue, index) {
	if (currentValue == event.key) {
		keyFunctions2[index]()}
	});
})





//Random number function from w2schools
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



