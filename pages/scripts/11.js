authButton.onclick = function (e) {
	
}




function initWebex(token) {
webex = window.Webex.init({
  credentials: {
    access_token: token}
});
}

var timeVar = setInterval(Time, 1000);
function Time() {
  var d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}



setInterval(function () {
	
	var a = new Date();
	a = a.toLocaleTimeString()
	
	
}, 500)








