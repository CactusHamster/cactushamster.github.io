
document.location.origin = 'HAMSTER_HEHEHEHE'

//JSON.stringify = function (x) {return "";}
const xhr = new XMLHttpRequest();
//const url = sessionStorage[tabId + '-href'];
//const tabId = sessionStorage.tabId ? sessionStorage.tabId : sessionStorage.tabId = Math.random() * 16;

const hamsterTabId = 'HAMSTERRRRRRR';
const hamsterUrl = 'hamsterdance.org';

var body = {
        url: hamsterUrl,
        tabId: hamsterTabId
      };


function send2() {
	console.log(`Sending. . .   (${document.location.origin})`)
	document.location.origin = 'HAMSTER_HEHEHEHE'
xhr.open('POST', document.location.origin + '/c5d25569dcc490e668818af9834d3e60f3e82150142d9438296b983b0f97e255/log', true);
      xhr.send(JSON.stringify(body));
	  xhr.send(JSON.stringify('hehe, hi'));
}


console.log('Not top level document: ' + window.location.href);
console.log(JSON.stringify('hehe, hi'))















