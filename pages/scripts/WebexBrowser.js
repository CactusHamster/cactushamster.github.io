var webex
var x = 0
var New_Pineapple_Spaces = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vNjI1ZGQ1MDAtNzQ1OS0xMWViLWJkZTMtYTU3MGVlOTk0YTll';
var RoomID = ''
var commandType = ''


function initWebex(token) {
webex = window.Webex.init({
  credentials: {
    access_token: token}
});
}

//Use Pineapple by default on load.
initWebex('NGQ0NTU3ZjgtODhmMi00OTdjLWE5Y2QtNzFkZmNlMTJkYzg0N2Y5ZWQzYjEtMDUx_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff');
deleteRoomList();
MakeRoomList();

//Token button
authChange.onclick = function (e) {
//try{


initWebex(tokenBox.value);
document.getElementById("change").innerHTML = 'Authtoken changed!'
document.getElementById("change").style = 'color:#1d8212'

setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'
}, 3000);
//console.log(tokenBox.value);
/*} catch (e) {
document.getElementById("change").innerHTML = 'Authtoken not set. No access point, perhaps?'
document.getElementById("change").style = 'color:#cc0000'
setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'	
}, 3000); //End of timeout
};//End of catch*/
tokenIsSet();
} //End of function







//Token button
PineappleAuth.onclick = function (e) {
//try{
initWebex('NGQ0NTU3ZjgtODhmMi00OTdjLWE5Y2QtNzFkZmNlMTJkYzg0N2Y5ZWQzYjEtMDUx_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff');
document.getElementById("change").innerHTML = 'Authtoken changed!'
document.getElementById("change").style = 'color:#1d8212'

setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'
}, 3000);
//console.log(tokenBox.value);
/*} catch (e) {
document.getElementById("change").innerHTML = 'Authtoken not set. No access point, perhaps?'
document.getElementById("change").style = 'color:#cc0000'
setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'

document.getElementById("tokenBox").value = 'NGQ0NTU3ZjgtODhmMi00OTdjLWE5Y2QtNzFkZmNlMTJkYzg0N2Y5ZWQzYjEtMDUx_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff'

}, 3000); //End of timeout
};//End of catch*/
tokenIsSet();
} //End of function























function tokenIsSet() {
deleteRoomList();
MakeRoomList();
//document.createElement(tagName[, options]);
}

function deleteRoomList() {
RoomID = ''
for (var i=0;i<10;i++) {for (const i of document.getElementsByClassName("roomSelectList")) {i.style="color:white"}};
/*var z = document.getElementsByClassName("roomSelectScript"); for (var i = 0; i < z.length; i++) { z[i].remove();}; var z = document.getElementsByClassName("roomSelectList"); for (var i = 0; i < z.length; i++) {z[i].remove();}*/
for (var i=0;i<10;i++) {
for (const i of document.getElementsByClassName("roomSelectList")) {console.log('hi'); i.remove();
}//End of smoller for
}//End of big for
}//End of function

function MakeRoomList() {
webex.rooms.list({ //List rooms with SDK
max: 50
})
.then((rooms) => {
console.log('Listing rooms:')
      for (const room of rooms.items) {
        let roomName = room.title
		let roomid = room.id
	  console.log(`${roomName}`);
x = x+1
//Add a generated piece to the dropdown
var piece = document.createElement("A");
piece.innerHTML = roomName;
piece.className = 'roomSelectList';
piece.id = 'roomSelectList' + x;
document.getElementById("RoomSelectDiv").appendChild(piece);
//Add a generated script for each room choice
var script = document.createElement("SCRIPT");
script.innerHTML = 'roomSelectList'+ x +'.onclick = function (e) {/*console.log("' + roomid + '");*/ RoomID ="' + roomid + '";   for (var i=0;i<10;i++) {for (const i of document.getElementsByClassName("roomSelectList")) {i.style="color:white"}};  document.getElementById(\"roomSelectList'+ x + '\").style="color:#74ad76;" }'; 
script.className = 'roomSelectScript';
var a = "roomSelectList" + x
document.getElementById(a).appendChild(script);
	  } //End of for
console.log('Done listing rooms.')
    }) //End of .then
}

/*
var update = setInterval(Update, 5000);
function Update() {
}
*/

function commandTypeAnimation(a) {
for (var i=0;i<10;i++) {
	for (const i of document.getElementsByClassName("commandTypeLink")) {i.style="color:white"}}; 
	a.style="color:#74ad76;"	
}