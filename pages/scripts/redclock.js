




var timeVar = setInterval(Time, 1000);

function Time() {
  var d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}












