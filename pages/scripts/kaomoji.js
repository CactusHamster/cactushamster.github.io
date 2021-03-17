function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


var prebuilt = ["(o_o)", "(0_o)", "(^_^)", "(-_-)", "(;-;)", "(\\_/)", "(*0*)", "('_`)", "(~_~)"]
document.getElementById("titleKao").innerHTML = prebuilt[random(1,9)-1]

prebuilt = ["Hai!","ヾ(•ω•`)o","ヾ(≧▽≦*)o","ψ(｀∇´)ψ","(*^▽^*)"]
console.log(prebuilt)



var enhance = false
function EnhanceRandomize () {
if (enhance == true) {
	enhance = false;
	document.getElementById("enhancer").style = 'background-color: darkslategrey; color:white; padding: 12px; font-size: 18px; border-radius: 10px; border: none;';
} else {
	enhance = true;
	document.getElementById("enhancer").style = 'background-color: indianred; color:white; padding: 12px; font-size: 18px; border-radius: 10px; border: none;';	
}	
}
//enhancer.onclick = function (e) {EnhanceRandomize()}




function generate() {
if (enhance == false) {
var kaomoji = ''
var leftArm = ['╰','ヽ','੧','⋋','ლ','ლ','ᕙ','୧','┌','└','٩','ᕦ','へ','¯\\_','╚','═','c','乁','o͡͡͡╮','/╲/\╭','凸','〜','┌∩┐','∩','╭∩╮',''] //26
var rightArm = ['凸','〜','┌∩┐','∩','╭∩╮','╯','ﾉ','ノ','੭','⋌','⊃','つ','ᕗ','୨','┐','┘','و','ง','ᕤ','ᓄ','_/¯','═╝','ㄏ','ᕤ','╭','o͡͡͡','ノ','⌒','.',"╮/\╱﻿\\",''] //30
var cheek = ['.','✿','˵','v','*','”','=','~','∗',':',' '] //11
var eye = ['^','＾','o','°','•́','•̀','￣','ݓ','✖','･','・','﹒','՞','︣','⌣','@',' '] //17
var mouth = ['ω','_','ਊ','︿','o','〜','〰','∧','Д','д','۝','ڡ','ʖ','▽','∀',' '] //16
var leftHead = ['(','[','༼','ʕ','໒','(','(','(','('] //9
var rightHead = [')',']','༽','ʔ',')','७',')',')',')'] //9
kaomoji = kaomoji + leftArm[random(1,26)-1]
kaomoji = kaomoji + leftHead[random(1,9)-1]
kaomoji = kaomoji + cheek[random(1,11)-1]
kaomoji = kaomoji + eye[random(1,17)-1]
kaomoji = kaomoji + mouth[random(1,16)-1]
kaomoji = kaomoji + eye[random(1,17)-1]
kaomoji = kaomoji + cheek[random(1,11)-1]
kaomoji = kaomoji + rightHead[random(1,9)-1]
kaomoji = kaomoji + rightArm[random(1,30)-1]
document.getElementById("kaomoji").innerHTML = kaomoji;
} else {
var kaomoji = ''
var leftArm = ['╰','ヽ','੧','⋋','ლ','ლ','ᕙ','୧','┌','└','٩','ᕦ','へ','¯\\_','╚','═','c','乁','凸','〜','┌∩┐',''] //22
var rightArm = ['凸','〜','┌∩┐','╯','ﾉ','ノ','੭','⋌','⊃','つ','ᕗ','୨','┐','┘','و','ง','ᕤ','ᓄ','═╝','ㄏ','ᕤ','╭','ノ','⌒','.',''] //26
var cheek = ['.','✿','˵','v','*','”','=','~','∗',':',' ',' ',' ',' ',' ',' '] //16
var eye = ['^','＾','o','°','•́','•̀','￣','ݓ','･','・','﹒','՞','︣','@',' '] //15
var mouth = ['ω','_','ਊ','︿','o','〜','〰','∧','Д','д','ڡ','ʖ','▽','∀','0'] //15
var Head1 = ['(','[','('] //3
var Head2 = [')',']',')'] //3
var head = random(1,3)-1
var EYE = random(1,15)-1

kaomoji = kaomoji + leftArm[random(1,22)-1]
kaomoji = kaomoji + Head1[head]
kaomoji = kaomoji + cheek[random(1,12)-1]
kaomoji = kaomoji + eye[EYE]
kaomoji = kaomoji + mouth[random(1,15)-1]
if (eye[EYE] == '￣' | eye[EYE] == '^' | eye[EYE] == 'ݓ' | eye[EYE] == '﹒' | eye[EYE] == 'ݓ') {kaomoji = kaomoji + eye[EYE]} else {kaomoji = kaomoji + eye[EYE-(random(1,2)-1)]}
kaomoji = kaomoji + cheek[random(1,11)-1]
kaomoji = kaomoji + Head2[head]
if (leftArm == '¯\\_') {kaomoji = kaomoji + '_/¯'} else {kaomoji = kaomoji + rightArm[random(1,26)-1]}
document.getElementById("kaomoji").innerHTML = kaomoji;
}
}















