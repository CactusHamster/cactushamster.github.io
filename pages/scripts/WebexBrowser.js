var webex

var New_Pineapple_Spaces = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vNjI1ZGQ1MDAtNzQ1OS0xMWViLWJkZTMtYTU3MGVlOTk0YTll';




function initWebex(token) {
var webex = window.Webex.init({
  credentials: {
    access_token: token}
});
}





//Token button
authChange.onclick = function (e) {
try{
tokenIsSet()


initWebex(tokenBox.value);
document.getElementById("change").innerHTML = 'Authtoken changed!'
document.getElementById("change").style = 'color:#1d8212'

setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'
}, 3000);
//console.log(tokenBox.value);
} catch (e) {
document.getElementById("change").innerHTML = 'Authtoken not set. No access point, perhaps?'
document.getElementById("change").style = 'color:#cc0000'
setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'	
}, 3000); //End of timeout
};//End of catch
} //End of function





function tokenIsSet() {
document.getElementById("change").visibility = ''

	
	
}




function say(message, roomid = New_Pineapple_Spaces) {
	
}



function newTeam() {
	
	
	
webex.rooms
  .list({
    max: 10
  })
  .then((rooms) => {
    // Destructure room properties for its id (aliased to roomId) and title
    const { id: roomId, title } = rooms.items.filter(
      room => room.title === 'My First Room!'
    )[0];
});
}


