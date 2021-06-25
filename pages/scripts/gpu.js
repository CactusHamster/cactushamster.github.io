
const a = [0,1,2,3,4,5,6,7,8,9] //Possible first numbers

const card = function () {
var result = '';
var currentStatus = 0;
for (var x1 of a) {
	currentStatus++; document.getElementById('status').innerHTML = currentStatus
	for (var x2 of a) {
		currentStatus++; document.getElementById('status').innerHTML = currentStatus
		for (var x3 of a) {
			currentStatus++; document.getElementById('status').innerHTML = currentStatus
			for (var x4 of a) {
				currentStatus++; document.getElementById('status').innerHTML = currentStatus
				for (var x5 of a) {
					currentStatus++; document.getElementById('status').innerHTML = currentStatus
					for (var x6 of a) {
						currentStatus++; document.getElementById('status').innerHTML = currentStatus
						for (var x7 of a) {
							currentStatus++; document.getElementById('status').innerHTML = currentStatus
							for (var x8 of a) {
								currentStatus++; document.getElementById('status').innerHTML = currentStatus
								for (var x9 of a) {
									currentStatus++; document.getElementById('status').innerHTML = currentStatus
									for (var x10 of a) {
										currentStatus++; document.getElementById('status').innerHTML = currentStatus
										for (var x11 of a) {
											currentStatus++; document.getElementById('status').innerHTML = currentStatus
											for (var x12 of a) {
												currentStatus++; document.getElementById('status').innerHTML = currentStatus
												for (var x13 of a) {
													currentStatus++; document.getElementById('status').innerHTML = currentStatus
													for (var x14 of a) {
														currentStatus++; document.getElementById('status').innerHTML = currentStatus
														for (var x15 of a) {
															currentStatus++; document.getElementById('status').innerHTML = currentStatus
															for (var x16 of a) {
																currentStatus++; document.getElementById('status').innerHTML = currentStatus
				var result = result+'\n' + String(x1)+String(x2)+String(x3)+String(x4)+' '+String(x5)+String(x6)+String(x7)+String(x8)+' '+String(x9)+String(x10)+String(x11)+String(x12)+' '+String(x13)+String(x14)+String(x15)+String(x16);
				}}}}}}}}}}}}
			}
		}
	}
}
return result
}

var GPUresult = card()
console.log(card)










