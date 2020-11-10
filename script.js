
const pose = {smoothness: 0.65};
const emotion = {smoothness: 0.40, enableBalancer : false};
const gender = {smoothness: 0.95, threshold: 0.70};
const feat = {smoothness: 0.90};
const arousal = {smoothness: 0.70};
const attention = {smoothness: 0.83};
const wish = {smoothness: 0.8};
var logger = document.getElementById("logger");


CY.loader()
.addModule(CY.modules().FACE_POSE.name, pose)
.addModule(CY.modules().FACE_DETECTOR.name, {})
.addModule(CY.modules().FACE_AGE.name, {})
.addModule(CY.modules().FACE_EMOTION.name, emotion)
.addModule(CY.modules().FACE_GENDER.name, gender)
.addModule(CY.modules().FACE_FEATURES.name, feat)
.addModule(CY.modules().FACE_AROUSAL_VALENCE.name, arousal)
.addModule(CY.modules().FACE_ATTENTION.name, attention)
.addModule(CY.modules().FACE_WISH.name, wish)
.load()
.then(({ start, stop }) => start());

function control(){
  logger.style.opacity=1;
}
function release(){
  logger.style.opacity=.5;
}

window.addEventListener(CY.modules().FACE_DETECTOR.eventName, (evt) => {
  if(FD.checked==true){goHOW(formatHow(evt.detail,FD0.value,FD1.value));}
});
window.addEventListener(CY.modules().FACE_POSE.eventName, (evt) => {
  if(FP.checked==true){goHOW(formatHow(evt.detail,FP0.value,FP1.value));}
});
window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
  if(FA.checked==true){goHOW(formatHow(evt.detail,FA0.value,FA1.value));}
});
window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
  if(FE.checked==true){goHOW(formatHow(evt.detail,FE0.value,FE1.value));}
});
window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
  if(FG.checked==true){goHOW(formatHow(evt.detail,FG0.value,FG1.value));}
});
window.addEventListener(CY.modules().FACE_FEATURES.eventName, (evt) => {
  if(FF.checked==true){goHOW(formatHow(evt.detail,FF0.value,FF1.value));}
});
window.addEventListener(CY.modules().FACE_AROUSAL_VALENCE.eventName, (evt) => {
  if(FAV.checked==true){goHOW(formatHow(evt.detail,FAV0.value,FAV1.value));}
});
window.addEventListener(CY.modules().FACE_ATTENTION.eventName, (evt) => {
  if(FAtt.checked==true){goHOW(formatHow(evt.detail,FAtt0.value,FAtt1.value));}
});
window.addEventListener(CY.modules().FACE_WISH.eventName, (evt) => {
  if(FW.checked==true){goHOW(formatHow(evt.detail,FW0.value,FW1.value));}
});


function formatHow(obj, s, e){
  var res = JSON.stringify(obj);
  //console.log(res.length);
  if(res.length>s){res = res.substring(s,res.length);}else{res =''}
  if(res.length>e){res = res.substring(0,e);}
  if(logger.innerHTML.length>1000){logger.innerHTML=logger.innerHTML.substring(0,20000);}
  logger.innerHTML = res +'</br>' + logger.innerHTML;
  return res;
}


var asciiArray = [];
function timer(){
	
}
var layers = [];
function goHOW(str){
	 
	//var boundarylist=str.split(':');
	//for(var i=0; i < boundarylist.length-1; i++){
	//	boundarylist[i] = boundarylist[i].replace(/[^\w\s]/gi, '').replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g,"");
	//}
	str.replace(/[^\w\s]/gi, '').replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g,"");
	asciiArray = [];
	for(var i=0; i<str.length; i++){
		asciiArray.push(str.charCodeAt(i));
	}
	var allpixels = chunkArray(asciiArray, 6);
	var allboxshadows = [];
	for(var i=0; i<allpixels.length; i++){
		allpixels[i][0] = wrap(allpixels[i][0],0,document.getElementById('jellyfish').clientHeight);
		allpixels[i][1] = wrap(allpixels[i][1],0,document.getElementById('jellyfish').clientHeight);
		allpixels[i][2] = wrap(allpixels[i][2],0,255);
		allpixels[i][3] = wrap(allpixels[i][3],0,255);
		allpixels[i][4] = wrap(allpixels[i][4],0,255);
		allpixels[i][5] = wrap(allpixels[i][5],0,4);
		allboxshadows[i] = allpixels[i][0]+"px "+allpixels[i][1]+"px 0 "+allpixels[i][5]+"px rgba("+allpixels[i][2]+","+allpixels[i][3]+","+allpixels[i][4]+")";
	}
	allboxshadows.pop();
	//console.log(allpixels);
  if(jellyfish.childElementCount >=10){
    jellyfish.removeChild(jellyfish.firstChild);
  }
  var pix = document.createElement('div');
  pix.setAttribute('class', 'pixel');
  pix.style.boxShadow = allboxshadows.join(", ");
  document.getElementById("jellyfish").appendChild(pix);
                                            
}
function chunkArray(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        var myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}
function value_limit(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}	
function wrap(x, x_min, x_max){
	if (x < x_min)
    return x_max - (x_min - x) % (x_max - x_min);
else
    return x_min + (x - x_min) % (x_max - x_min);
}


function goUI(){
  var checkbox = document.getElementById('uibtn');
  if (checkbox.checked == true)
  {
    document.getElementById('ui').style.display='block';
  }else{
    document.getElementById('ui').style.display='none';
  }
}