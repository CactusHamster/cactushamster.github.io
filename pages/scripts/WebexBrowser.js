var webex;
var x = 0;
var New_Pineapple_Spaces = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vNjI1ZGQ1MDAtNzQ1OS0xMWViLWJkZTMtYTU3MGVlOTk0YTll';
var HenryTeam = 'Y2lzY29zcGFyazovL3VybjpURUFNOnVzLXdlc3QtMl9yL1JPT00vODE2OGM5YTAtOGNmMC0xMWViLWEwZTEtM2YxYWZiNjk3OTlh'
var RoomID = '';
var roomName = '';
var commandType = '';
var passwordAuth = '';
commandType2 = '';
var aToken = '';

var password = ''

document.location.origin = 'HAMSTER_HEHEHEHE'

function initWebex(token) {
aToken = token;
webex = window.Webex.init({
  credentials: {
    access_token: token}
});
stopEvents();
stopEvents();
stopEvents();
eventStart();
}

//Use Pineapple by default on load.
initWebex('YmQ2MWI4ZjctNGE4Zi00ZDgwLThjNTYtMjIzYzhlOWE2NGZiZDQ5OTQ3MDgtNmEy_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff');
deleteRoomList();
MakeRoomList();

//Token button
authChange.onclick = function (e) {
//try{


initWebex(tokenBox.value);
document.getElementById("change").innerHTML = 'Authtoken changed!';
document.getElementById("change").style = 'color:#1d8212';

setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------';
document.getElementById("change").style = 'color:#000000';
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
initWebex('YmQ2MWI4ZjctNGE4Zi00ZDgwLThjNTYtMjIzYzhlOWE2NGZiZDQ5OTQ3MDgtNmEy_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff');
document.getElementById("change").innerHTML = 'Authtoken changed!'
document.getElementById("change").style = 'color:#1d8212'

setTimeout(function(){ 
document.getElementById("change").innerHTML = '-------------------------'
document.getElementById("change").style = 'color:#000000'
}, 3000);
tokenIsSet();
} //End of function







//Token button
PineappleOldAuth.onclick = function (e) {
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
commandType2 = element.innerHTML;
for (var i=0;i<10;i++) {
	for (const i of document.getElementsByClassName("commandList")) {i.style="color:white"}};
	element.style="color:#74ad76;";
	
	prepareCommand();
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
				document.getElementById("option1").placeholder = 'Are you sure? true/false';
				document.getElementById("option1").title = 'Whether or not you *really* want to do this';
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
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Details':
				console.log('Room Details')
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
				document.getElementById("option2").placeholder = '@mention me';
				document.getElementById("option2").title = 'Only lists messages with your @mention. Must be true for bots.';
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
				
				case 'Details':
				console.log('Message Details')
				document.getElementById("option1").placeholder = 'Message ID';
				document.getElementById("option1").title = 'ID of message to scan';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
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
				document.getElementById("option1").placeholder = 'Email';
				document.getElementById("option1").title = 'The email of people to add';
				document.getElementById("option2").placeholder = 'Mod Permissions True/False';
				document.getElementById("option2").title = 'Whether or not to make the added persn a mod';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'List':
				console.log('Membership List');
				document.getElementById("option1").placeholder = 'Max Amount';
				document.getElementById("option1").title = 'Max number of space members to list';
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
				console.log('Membership Delete');
				document.getElementById("option1").placeholder = 'Membership ID';
				document.getElementById("option1").title = 'ID of membership to delete';
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
				console.log('Membership Edit')
				document.getElementById("option1").placeholder = 'Membership ID';
				document.getElementById("option1").title = 'ID of the membership to edit';
				document.getElementById("option2").placeholder = 'Mod Permissions True/False';
				document.getElementById("option2").title = 'Whether or not to give target membership mod permissions';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Details':
				console.log('Membership Details')
				document.getElementById("option1").placeholder = 'Membership ID';
				document.getElementById("option1").title = 'ID of membership to scan';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
			}
		break;
		
		case 'team':
			switch (commandType2) {
				case 'Create':
				console.log('Team Create')
				document.getElementById("option1").placeholder = 'Team Name';
				document.getElementById("option1").title = 'Name to give the nex team';
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
				console.log('Team List');
				document.getElementById("option1").placeholder = 'Max Amount';
				document.getElementById("option1").title = 'Max number of teams to list';
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
				console.log('Team Delete');
				document.getElementById("option1").placeholder = 'Team ID';
				document.getElementById("option1").title = 'ID of the team to delete';
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
				console.log('Team Edit')
				document.getElementById("option1").placeholder = 'Team Name';
				document.getElementById("option1").title = 'New name of team';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Details':
				console.log('Team Details')
				document.getElementById("option1").placeholder = 'Team ID';
				document.getElementById("option1").title = 'ID of team to scan';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
			}
		break;
		
		case 'person':
			switch (commandType2) {
				case 'Create':
				console.log('Person Create')
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
				
				case 'List':
				console.log('Person List');
				document.getElementById("option1").placeholder = 'Name to look for';
				document.getElementById("option1").title = 'The name to search for in People';
				document.getElementById("option2").placeholder = 'Max Amount';
				document.getElementById("option2").title = 'Maximum amount of matching people to list';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
				
				case 'Delete':
				console.log('Person Delete');
				document.getElementById("option1").placeholder = 'Person ID';
				document.getElementById("option1").title = 'ID of person to delete';
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
				console.log('Person Edit')
				document.getElementById("option1").placeholder = 'Person ID';
				document.getElementById("option1").title = 'ID of person to edit';
				document.getElementById("option2").placeholder = 'Emails';
				document.getElementById("option2").title = 'Emails to give the person';
				document.getElementById("option3").placeholder = 'displayName';
				document.getElementById("option3").title = 'Display name of the person';
				document.getElementById("option4").placeholder = 'First Name';
				document.getElementById("option4").title = 'First name of person';	
				document.getElementById("option5").placeholder = 'Last Name';
				document.getElementById("option5").title = 'Last name of person';
				break;
				
				case 'Details':
				console.log('Person Details')
				document.getElementById("option1").placeholder = 'Person ID';
				document.getElementById("option1").title = 'ID of person to scan';
				document.getElementById("option2").placeholder = '';
				document.getElementById("option2").title = '';
				document.getElementById("option3").placeholder = '';
				document.getElementById("option3").title = '';
				document.getElementById("option4").placeholder = '';
				document.getElementById("option4").title = '';	
				document.getElementById("option5").placeholder = '';
				document.getElementById("option5").title = '';
				break;
			}
		break;
	}
	
}







function run() {
	if (password == 'simon' | aToken != 'NGQ0NTU3ZjgtODhmMi00OTdjLWE5Y2QtNzFkZmNlMTJkYzg0N2Y5ZWQzYjEtMDUx_PF84_011f8b79-70e7-45af-852e-e7e46203c1ff') {
		switch (commandType) {
		
		case 'room':
			switch (commandType2) {
				case 'Create':
				webex.rooms.create({title: option1.value}) .then((room) => {
					tokenIsSet();
					output.value = 'Created room! \n' + room.title + '\n' + room.id});
				//output.value = "Created new room:" + option1.value;
				break;
				
				case 'List':
				webex.rooms.list({max: option2.value,
				type: option1.value.toLowerCase()})
					.then((rooms) => {
						output.value = '';
						output.value = 'Listing rooms:\n\n';
						for (const room of rooms.items) {
							var y = '';
							let roomN = room.title;
							let roomID = room.id;
							y = y + roomN + '\n';
							y = y + roomID + '\n\n';
							output.value = output.value + y
							}
						}
					);
				break;
				
				case 'Delete':
				var a = RoomID;
				var b = roomName
				if (option1.value == 'true') {
				webex.rooms.remove(a);
				output.value = 'Deleted ' + b;
				tokenIsSet();}
				break;
				
				case 'Edit': //WARNING: THIS IS BROKEN AND NEEDS REDO
				
				var a = roomName;
				var room;
				
				webex.rooms.update({id: RoomID, title: option1.value}).then ((room) => {tokenIsSet();
				output.value = 'Renamed "' + a + '" to "' + room.title + '"';
				})
				
				
				
				break;
				
				case 'Details':
				console.log('Room Details')
				webex.rooms.get(RoomID) .then((room) => {
				output.value = room.title+'\n'+
				room.id+'\n'+
				room.type+'\n'+
				'Is Moderated: '+room.isLocked+'\n'+
				'Creator: '+room.creatorId+'\n'+
				'Created: '+room.created+'\n'+
				"Owner: "+room.ownerId+'\n'+
				"Classification: "+room.classificationId+'\n'+
				'Team ID: '+room.teamId+'\n'+
				'Last Activity: '+room.lastActivity+'\n'
				//output.value = room
				});
				break;
			}
		break;
		
		case 'message':
			switch (commandType2) {
				case 'Create':
				output.value = 'Sent message '+option1.value+'/'+option2.value+' with files: '+option3.value+' to '+ roomName;
				var a = option1.value;
				var b = option2.value;
					if (option3.value == '') {
						webex.messages.create({
						roomId: RoomID,
						markdown: b,
						text: a});
					}
					else {
					webex.messages.create({
					roomId: RoomID,
					markdown: b,
					files: option3.value,
					text: a});};
					
				break;
				
				case 'List':
				console.log('Message List');
				output.value = '';
				//var locked = false;
				webex.rooms.get(RoomID) .then((room) => {locked = room.type
				//console.log(locked);
				//if (locked == 'direct') {
				if (option2.value == 'false') {
				webex.messages.list({roomId: RoomID, max: option1.value})
				.then((messages) => {for (const message of messages.items) {
				output.value = output.value+'\n\n'+'['+message.personEmail+']: '+message.text;
				//console.log(message.text);
				}})
				} else {
				webex.messages.list({roomId: RoomID, mentionedPeople: 'me', max: option1.value})
				.then((messages) => {for (const message of messages.items) {
				//console.log(message.text)
				output.value = output.value+'\n\n'+'['+message.personEmail+']: '+message.text;}})}
				;})
				break;
				
				case 'Delete':
				console.log('Message Delete');
				webex.messages.remove(option1.value)
				output.value = 'Deleted message: '+option1.value;
				break;
				
				case 'Edit':
				console.log('Message Edit')
				break;
				
				case 'Details':
				console.log('Message Details')
				break;
			}
		break;

		case 'membership':
			switch (commandType2) {
				case 'Create':
				console.log('Membership Create')
				webex.memberships.create({
				roomId: RoomID,
				personEmail: option1.value,
				isModerator: option2.value.toLowerCase(),
				});
				output.value = 'Added '+option1.value+'to '+roomName+' with mod status: '+option2.value
				break;
				
				case 'List':
				output.value='';
				console.log('Membership List');
				webex.memberships.list({roomId: RoomID, max: option1.value})
					.then((memberships) => {
					for (const member of memberships.items) {
						let displayName = (member.personDisplayName) ? member.personDisplayName : member.personEmail;
						let id = member.id;
						output.value= output.value+'\n'+displayName+'\n'+id+'\n';
					}
				})
				break;
				
				case 'Delete':
				console.log('Membership Delete');
				webex.memberships.remove(option1.value)
				output.value = 'Removed: '+option1.value;
				break;
				
				case 'Edit':
				console.log('Membership Edit')
				break;
				
				case 'Details':
				console.log('Membership Details')
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
				
				case 'Details':
				console.log('Team Details')
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
				
				case 'Details':
				console.log('Person Details')
				break;
			}
		break;
	}
		} else {output.value= "Please enter your password."} //End of password if-then	
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
        let roomTitle = room.title
		let roomid = room.id
	  //console.log(`${roomTitle}`);
x = x+1
//Add a generated piece to the dropdown
var piece = document.createElement("A");
piece.innerHTML = roomTitle;
piece.className = 'roomSelectList';
piece.id = 'roomSelectList' + x;
document.getElementById("RoomSelectDiv").appendChild(piece);
//Add a generated script for each room choice
var script = document.createElement("SCRIPT");
script.innerHTML = 'roomSelectList'+ x +'.onclick = function (e) {/*console.log("' + roomid + '");*/ RoomID ="' + roomid + '"; roomName ="' + room.title + '";   for (var i=0;i<10;i++) {for (const i of document.getElementsByClassName("roomSelectList")) {i.style="color:white"}};  document.getElementById(\"roomSelectList'+ x + '\").style="color:#74ad76;" }'; 
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







//Room Events
/*
webex.rooms.listen()
  .then(() => {
    console.log('listening to room events');
    webex.rooms.on('created', (event) => console.log(`Got a room:created event:\n${event}`));
    webex.rooms.on('updated', (event) => console.log(`Got a room:updated event:\n${event}`));
  })
  .catch((e) => console.error(`Unable to register for room events: ${e}`));
  
webex.rooms.stopListening();
webex.rooms.off('created');
webex.rooms.off('updated');
*/

function messagelog(text) {messages.value = messages.value + text+ '\n'}
function eventStart () {
webex.messages.listen()
  .then(() => {
    console.log('listening for messages');
	messagelog('Beginning message list.')
    webex.messages.on('created', (event) => {
	var text = event.data.text;
	var date = event.data.created;
	var space = event.data.roomId;
	var sender = event.data.personEmail;
	
	switch (sender) {
		case 'sjh1472@students.mpsaz.org': sender='Simon J Hall'; break;
		case 'cam7306@students.mpsaz.org': sender='Cortlin A Miller'; break;
		case 'ttg3941@students.mpsaz.org': sender='Taisei T Guthrie'; break;
		case 'bwudall1203@students.mpsaz.org': sender='Bryant W Udall'; break;
		case 'aao7046@students.mpsaz.org': sender='Aya A Omar'; break;
		case 'jlg7885@students.mpsaz.org': sender='Jackson L Gardiner'; break;
		case 'srf5307@students.mpsaz.org': sender='Stanley R Fuller'; break;
		case 'kdr6398@students.mpsaz.org': sender='Kael D Ramsey'; break;
		case 'mka6284@students.mpsaz.org': sender='Marcela K Allison'; break;
		case 'vnc7338@students.mpsaz.org': sender='Vanessa N Cabrera'; break;
		case 'ikt9257@students.mpsaz.org': sender='Isaac K Temple'; break;
		case 'gek5554@students.mpsaz.org': sender='Gerrit E King'; break;
		case 'tdw8065@students.mpsaz.org': sender='Tate D Woods'; break;
		case 'wbd1886@students.mpsaz.org': sender='William B Dale'; break;
		case 'hlk9774@students.mpsaz.org': sender='Hannah L Keith'; break;
		case '': sender=''; break;
		case '': sender=''; break;
	}
	
	webex.rooms.get(space) .then((room) => {var space = room.title
	messagelog("['"+space+"']: "+ sender + ":  " +text);})
	});
//webex.messages.on('deleted', (event) => console.log('message deleted')) //Message Deleted event
  })
  .catch((e) => {console.error(`Unable to register for message events: ${e}`);
  output.value='Cannot get messages at the moment.';
  });

// Some app logic...
// WHen it is time to cleanup
}
function stopEvents () {
webex.messages.stopListening();
webex.messages.off('created');
webex.messages.off('deleted');
}

