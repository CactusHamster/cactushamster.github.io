var webex
var x = 0
var New_Pineapple_Spaces = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vNjI1ZGQ1MDAtNzQ1OS0xMWViLWJkZTMtYTU3MGVlOTk0YTll';
var RoomID = ''
var commandType = ''
commandType2 = ''

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
	prepareCommand()
	
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




function CommandListClick(element) {
commandType2 = element.innerHTML
for (var i=0;i<10;i++) {
	for (const i of document.getElementsByClassName("commandList")) {i.style="color:white"}}; 
	element.style="color:#74ad76;"
	
	prepareCommand()
}


function prepareCommand() {
	switch (commandType) {
		
		case 'room':
			switch (commandType2) {
				case 'Create':
				console.log('Room Create');
				document.getElementById("option1").placeholder = 'Room Name';
				document.getElementById("option1").title = 'Give the new room a name!';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';					
				break;
				
				case 'List':
				console.log('Room List');
				document.getElementById("option1").placeholder = 'Room Type (Direct or Group)';
				document.getElementById("option1").title = 'Type "group" or "direct" to specify the type of room to list';
				document.getElementById("option2").placeholder = 'Max';
				document.getElementById("option2").title = 'Maximum number of rooms to list';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';		
				break;
				
				case 'Delete':
				console.log('Room Delete');
				document.getElementById("option1").placeholder = '';
				document.getElementById("option1").title = '';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Edit':
				console.log('Room Edit')
				document.getElementById("option1").placeholder = 'Room Name';
				document.getElementById("option1").title = 'New name for the room';
				document.getElementById("option2").placeholder = 'IsHidden';
				document.getElementById("option2").title = 'Whether or not to update the room as hidden';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
			}
		break;
		
		case 'message':
			switch (commandType2) {
				case 'Create':
				console.log('Message Create')
				document.getElementById("option1").placeholder = 'Text';
				document.getElementById("option1").title = 'Text to add to message';
				document.getElementById("option2").placeholder = 'Markdown';
				document.getElementById("option2").title = 'Markdown text to add to message';
				document.getElementById("option3").placeholder = 'File';
				document.getElementById("option3").title = 'File link(s) to add to message';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'List':
				console.log('Message List');
				document.getElementById("option1").placeholder = 'Max Amount';
				document.getElementById("option1").title = 'Maximum number of readable messages to list';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Delete':
				console.log('Message Delete');
				document.getElementById("option1").placeholder = 'MessageId';
				document.getElementById("option1").title = 'The unique id of the message to delete';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Edit':
				console.log('Message Edit')
				document.getElementById("option1").placeholder = 'MessageId';
				document.getElementById("option1").title = 'The unique id of the message to edit';
				document.getElementById("option2").placeholder = 'Text';
				document.getElementById("option2").title = 'Text to replace old message with';
				document.getElementById("option3").placeholder = 'Markdown';
				document.getElementById("option3").title = 'Markdown Text to replace old message with';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
			}
		break;

		case 'membership':
			switch (commandType2) {
				case 'Create':
				console.log('Membership Create')
				break;
				
				case 'List':
				console.log('Membership List');
				break;
				
				case 'Delete':
				console.log('Membership Delete');
				break;
				
				case 'Edit':
				console.log('Membership Edit')
				break;
			}
		break;
		
		case 'team':
			switch (commandType2) {
				case 'Create':
				console.log('Team Create')
				break;
				
				case 'List':
				console.log('Team List');
				break;
				
				case 'Delete':
				console.log('Team Delete');
				break;
				
				case 'Edit':
				console.log('Team Edit')
				break;
			}
		break;
		
		case 'person':
			switch (commandType2) {
				case 'Create':
				console.log('Person Create')
				break;
				
				case 'List':
				console.log('Person List');
				break;
				
				case 'Delete':
				console.log('Person Delete');
				break;
				
				case 'Edit':
				console.log('Person Edit')
				break;
			}
		break;
	}
}







function run() {
	
		switch (commandType) {
		
		case 'room':
			switch (commandType2) {
				case 'Create':
				console.log('Room Create');
				//document.getElementById("option1").innerHTML = 'Room Name';
				break;
				
				case 'List':
				console.log('Room List');
				break;
				
				case 'Delete':
				console.log('Room Delete');
				break;
				
				case 'Edit':
				console.log('Room Edit')
				break;
			}
		break;
		
		case 'message':
			switch (commandType2) {
				case 'Create':
				console.log('Message Create')
				break;
				
				case 'List':
				console.log('Message List');
				break;
				
				case 'Delete':
				console.log('Message Delete');
				break;
				
				case 'Edit':
				console.log('Message Edit')
				break;
			}
		break;

		case 'membership':
			switch (commandType2) {
				case 'Create':
				console.log('Membership Create')
				break;
				
				case 'List':
				console.log('Membership List');
				break;
				
				case 'Delete':
				console.log('Membership Delete');
				break;
				
				case 'Edit':
				console.log('Membership Edit')
				break;
			}
		break;
		
		case 'team':
			switch (commandType2) {
				case 'Create':
				console.log('Team Create')
				break;
				
				case 'List':
				console.log('Team List');
				break;
				
				case 'Delete':
				console.log('Team Delete');
				break;
				
				case 'Edit':
				console.log('Team Edit')
				break;
			}
		break;
		
		case 'person':
			switch (commandType2) {
				case 'Create':
				console.log('Person Create')
				break;
				
				case 'List':
				console.log('Person List');
				break;
				
				case 'Delete':
				console.log('Person Delete');
				break;
				
				case 'Edit':
				console.log('Person Edit')
				break;
			}
		break;
	}
	
}







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
	  //console.log(`${roomName}`);
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
	
	prepareCommand()
	
for (var i=0;i<10;i++) {
	for (const i of document.getElementsByClassName("commandTypeLink")) {i.style="color:white"}}; 
	a.style="color:#74ad76;"	
}