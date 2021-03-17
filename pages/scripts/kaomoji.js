function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}


var prebuilt = ["o(≧口≦)o", "(*^▽^*)", "\\(≧∇≦)/", "(_　_)。゜zｚＺ", "( ´･･)ﾉ(._.`)", "(⌐■_■)", "(¬‿¬)", "(╯▽╰ )", "(~_~)"]
document.getElementById("titleKao").innerHTML = prebuilt[random(1,prebuilt.length)-1]

prebuilt = ["Hai!","ヾ(•ω•`)o","ヾ(≧▽≦*)o","ψ(｀∇´)ψ","(*^▽^*)"]
console.log(prebuilt[random(1, prebuilt.length)-1])



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



var kaomojis_generated = 0
function generate() {
kaomojis_generated++;
document.getElementById("generated").innerHTML = kaomojis_generated + " kaomojis generated";


if (enhance == false) {
var kaomoji = ''
var leftArm = ['╰','ヽ','੧','⋋','ლ','ლ','ᕙ','୧','┌','└','٩','ᕦ','へ','¯\\_','╚','═','c','乁','o͡͡͡╮','/╲/\╭','凸','〜','┌∩┐','∩','╭∩╮',''] //26
var rightArm = ['凸','〜','┌∩┐','∩','╭∩╮','╯','ﾉ','ノ','੭','⋌','⊃','つ','ᕗ','୨','┐','┘','و','ง','ᕤ','ᓄ','_/¯','═╝','ㄏ','ᕤ','╭','o͡͡͡','ノ','⌒','.',"╮/\╱﻿\\",''] //30
var cheek = ['.','✿','˵','v','*','”','=','~','∗',':',' '] //11
var eye = ['^','＾','o','°','•́','•̀','￣','ݓ','✖','･','・','﹒','՞','︣','⌣','@',' '] //17
var mouth = ['ω','_','ਊ','︿','o','〜','〰','∧','Д','д','۝','ڡ','ʖ','▽','∀',' '] //16
var leftHead = ['(','[','༼','ʕ','໒','(','(','(','('] //9
var rightHead = [')',']','༽','ʔ',')','७',')',')',')'] //9
kaomoji = kaomoji + leftArm[random(1,leftArm.length)-1]
kaomoji = kaomoji + leftHead[random(1,leftHead.length)-1]
kaomoji = kaomoji + cheek[random(1,cheek.length)-1]
kaomoji = kaomoji + eye[random(1,eye.length)-1]
kaomoji = kaomoji + mouth[random(1,mouth.length)-1]
kaomoji = kaomoji + eye[random(1,eye.length)-1]
kaomoji = kaomoji + cheek[random(1,cheek.length)-1]
kaomoji = kaomoji + rightHead[random(1,rightHead.length)-1]
kaomoji = kaomoji + rightArm[random(1,rightArm.length)-1]
document.getElementById("kaomoji").innerHTML = kaomoji;
} else {
var kaomoji = ''
var leftArm = ['╰','ヽ','੧','⋋','ლ','ლ','ᕙ','୧','┌','└','٩','ᕦ','へ','¯\\_','╚','═','c','乁','凸','〜','┌∩┐',''] //22
var rightArm = ['凸','〜','┌∩┐','╯','ﾉ','ノ','੭','⋌','⊃','つ','ᕗ','୨','┐','┘','و','ง','ᕤ','ᓄ','═╝','ㄏ','ᕤ','╭','ノ','⌒','.',''] //26
var cheek = ['.','✿','˵','v','*','”','=','~','∗',':',' ',' ',' ',' ',' ',' '] //16
var eye = ['^','＾','°','•́','•̀','￣','ݓ','･','・','﹒','՞','︣','@',' '] //15
var mouth = ['ω','_','ਊ','︿','o','〜','〰','∧','Д','д','ڡ','ʖ','▽','∀','0'] //15
var Head1 = ['(','[','('] //3
var Head2 = [')',']',')'] //3
var head = random(1,3)-1
var EYE = random(1,eye.length)-1

kaomoji = kaomoji + leftArm[random(1,leftArm.length)-1]
kaomoji = kaomoji + Head1[head]
kaomoji = kaomoji + cheek[random(1,cheek.length)-1]
kaomoji = kaomoji + eye[EYE]
kaomoji = kaomoji + mouth[random(1,mouth.length)-1]
if (eye[EYE] == '￣' | eye[EYE] == '^' | eye[EYE] == 'ݓ' | eye[EYE] == '﹒' | eye[EYE] == 'ݓ') {kaomoji = kaomoji + eye[EYE]} else {kaomoji = kaomoji + eye[EYE-(random(1,2)-1)]}
kaomoji = kaomoji + cheek[random(1,cheek.length)-1]
kaomoji = kaomoji + Head2[head]
if (leftArm == '¯\\_') {kaomoji = kaomoji + '_/¯'} else {kaomoji = kaomoji + rightArm[random(1,rightArm.length)-1]}
document.getElementById("kaomoji").innerHTML = kaomoji;
}
}















