var imBrw_op=window.opera; var imBrw_ie=document.all && !imBrw_op; var imBrw_ns=document.getElementById && !imBrw_ie; var imEffectEnabled = /MSIE [678]/.test(navigator.userAgent) && navigator.platform == "Win32"; var isIE9 = /MSIE 9/.test(navigator.userAgent); var imLoadList = ""; var imPopupEffect = true; function imGetLayer(sName) {return document.getElementById?document.getElementById(sName) : document.all?document.all[sName] : "";}
function imIEBody(){return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body}
function imOpenLocation(sNewLocation){
document.location = sNewLocation; }
function imGetParameter(sParamName) {
var sQueryString = ""; var iStart = 0; var iEnd = 0; if (window.top.location.search != 0)
sQueryString = unescape(window.top.location.search); sParamName = sParamName + "="; if (sQueryString.length > 0) {
iStart = sQueryString.indexOf(sParamName); if ( iStart != -1 ) {
iStart += sParamName.length; iEnd = sQueryString.indexOf("&",iStart); if (iEnd == -1)
iEnd = sQueryString.length; return sQueryString.substring(iStart,iEnd); }
return null; }
return null; }
function imMenuMainHover() {
if (document.getElementById("imMnMn") != null) {
if (document.getElementsByTagName) {
var oList = document.getElementById("imMnMn").getElementsByTagName("LI"); for (var i=0; i<oList.length; i++) {
      oList[i].onmouseover=function() {this.className+=" iehover";}
    oList[i].onmouseout=function() {this.className=this.className.replace(new RegExp(" iehover\\b"), "");}}
}}
}
if (navigator.userAgent.indexOf('MSIE 5.5') != -1 || navigator.userAgent.indexOf('MSIE 6') != -1) imLoadList += "imMenuMainHover();"; function imPreloadImages(sImgNames) {
var sNames = new Array (); sNames = sImgNames.split(","); for(iList = 0 ; iList < sNames.length ; iList++) {
var oImg = new Image(); oImg.src = sNames[iList]; }}
var imOpenedSM = null; var imOpenedSMOld = null; var imOpenedSMOldHeight; var imSMCloseTimer = null; var imSMOpenTimer = null; function imSMSlide(start,stop) {
var sm; var smp; if(start < stop)
sm = imOpenedSM; else
sm = imOpenedSMOld; smp = sm.parentNode || sm.parent; var diff = (stop-start)/10; if((diff < stop-smp.clientHeight && start < stop) || (diff > stop-smp.clientHeight && start > stop))
smp.style.height = (smp.clientHeight+diff) + 'px'; else {
smp.style.height = stop + 'px'; if(start < stop) {
clearInterval(imSMOpenTimer); imSMOpenTimer = null; }
else {
clearInterval(imSMCloseTimer); imSMCloseTimer = null; }}
}
function imSMShow(menu) {
if(navigator.appVersion.indexOf('MSIE 6') == -1 && navigator.appVersion.indexOf('MSIE 5') == -1) {
var imOpenedSMP; var imOpenedSMOldP; if(imSMCloseTimer == null && imSMOpenTimer == null) {
if(menu.parentNode)
var sm = menu.parentNode.getElementsByTagName('ul')[0]; else
var sm = menu.parent.getElementsByTagName('ul')[0]; if(imOpenedSM != null) {
imOpenedSMOld = imOpenedSM; imOpenedSMOldP = imOpenedSMOld.parentNode || imOpenedSMOld.parent; imSMCloseTimer = setInterval('imSMSlide(' + imOpenedSMOldP.offsetHeight + ',' + imOpenedSMOldHeight + ')',10); imOpenedSMOldP.getElementsByTagName('a')[0].blur(); imOpenedSMOldP.getElementsByTagName('a')[0].className = ''; }
if(imOpenedSM != sm) {
imOpenedSM = sm; imOpenedSMP = imOpenedSM.parentNode || imOpenedSM.parent; imOpenedSMOldHeight = imOpenedSMP.offsetHeight; imOpenedSMP.style.height = imOpenedSMOldHeight + 'px'; imOpenedSMP.style.overflow = 'hidden'; menu.focus(); menu.className = 'selected'; imOpenedSM.style.display = ''; while(imSMOpenTimer != null); imSMOpenTimer = setInterval('imSMSlide(' + imOpenedSMOldHeight + ',' + (imOpenedSM.offsetHeight+imOpenedSMOldHeight) + ')',10); }
else
imOpenedSM = null; }}
else {
if(imOpenedSM != null) {
imOpenedSM.style.display = 'none'; imOpenedSM.parentNode.getElementsByTagName('a')[0].focus(); imOpenedSM.parentNode.getElementsByTagName('a')[0].className = ''; }
if(imOpenedSM != menu.parentNode.getElementsByTagName('ul')[0]) {
imOpenedSM = menu.parentNode.getElementsByTagName('ul')[0]; menu.focus(); menu.className = 'selected'; imOpenedSM.style.display = ''; }
else
imOpenedSM = null; }}
function imX5ShowImg(sMode, cW, cH, xC, sFile, sFileZ, iMove) {
document.write('<embed src="res/x5im'+sMode+'.swf?cW='+cW+'&cH='+cH+'&xC='+xC+'&File='+sFile+'&FileZ='+sFileZ+'&Move='+iMove+'" '+
'type="application/x-shockwave-flash" width="'+cW+'" height="'+cH+'" wmode="transparent" menu="false" scale="exactfit" '+
'allowscriptaccess="always" quality="high" flashvars="Licence=Only_For_Incomedia_WebSiteX5&Copyrights=WebSiteX5.com">'+
'</embed>'); }
function imX5ShowAdv(iFullSize, iScale, sFileExt, sSoundExt, sUrl, iPreview) {
var imIE6 = /MSIE [6]/.test(navigator.userAgent) && navigator.platform == "Win32"; var sCode = '<div id="imWebSiteX5Adv" style="height: '+iFullSize/4+'px; width: '+iFullSize/4+'px; "'+
(iPreview == 0 ? '' : ' onmouseover="imObjIn(this.id);" onmouseout="imObjOut(this.id);"')+'>'; if (!imIE6) {
document.write(sCode +
'<embed id="imWebSiteX5AdvObj" style="left: -'+parseInt(iFullSize-iFullSize/4)+'px" src="x5advcorner.swf?FileExt='+sFileExt+'&SoundExt='+sSoundExt+'&Url='+sUrl+'&Scale='+iScale+'&Preview='+iPreview+'" '+
  'type="application/x-shockwave-flash" width="'+iFullSize+'" height="'+iFullSize+'" wmode="transparent" menu="false" '+
  'allowscriptaccess="samedomain" quality="high" flashvars="Licence=Only_For_Incomedia_WebSiteX5&Copyrights=WebSiteX5.com">'+
  '</embed></div>'); }
else {
document.write(sCode +
'<object id="imWebSiteX5AdvObj" style="left: -'+parseInt(iFullSize-iFullSize/4)+'px" data="x5advcorner.swf?FileExt='+sFileExt+'&SoundExt='+sSoundExt+'&Url='+sUrl+'&Scale='+iScale+'&Preview='+iPreview+'" '+
'type="application/x-shockwave-flash" width="'+iFullSize+'" height="'+iFullSize+'">'+
'<param name="movie" value="x5advcorner.swf?FileExt='+sFileExt+'&SoundExt='+sSoundExt+'&Url='+sUrl+'&Scale='+iScale+'&Preview='+iPreview+'">'+
'<param name="wmode" value="transparent">'+'<param name="menu" value="false">'+'<param name="allowscriptaccess" value="samedomain">'+'<param name="quality" value="high">'+
'<param name="flashvars" value="Licence=Only_For_Incomedia_WebSiteX5&Copyrights=WebSiteX5.com">'+
  '</object></div>'); }}
var imTimeAdv; function imObjOut(sName) {
imTimeAdv=setTimeout("imSetSize('"+sName+"',0, true);",1500); }
function imObjIn(sName) {
clearTimeout(imTimeAdv); imSetSize(sName,1, true); }
function imSetSize(sName, bVal, bRefresh) {
if (bVal == 0) {
if (bRefresh) imGetLayer(sName).innerHTML = imGetLayer(sName).innerHTML; imGetLayer(sName).style.width = parseInt(imGetLayer(sName+"Obj").width/4)+"px"; imGetLayer(sName).style.height = parseInt(imGetLayer(sName+"Obj").height/4)+"px"; imGetLayer(sName+"Obj").style.left = parseInt(imGetLayer(sName+"Obj").width/4-imGetLayer(sName+"Obj").width)+"px"; }
else{
imGetLayer(sName).style.width = imGetLayer(sName+"Obj").width+"px"; imGetLayer(sName).style.height = imGetLayer(sName+"Obj").height+"px"; imGetLayer(sName+"Obj").style.left = "0px"; }}
function imCodeProt(sAuthor) {
document.oncontextmenu = function(){
alert('Copyrights '+sAuthor+'. All rights reserved.'); return false; }}
function imGetUrl(sUrl) {
var xmlHttp; var sResult; try {
xmlHttp=new XMLHttpRequest(); }
catch (e) {
try {
xmlHttp=new ActiveXObject("Msxml2.XMLHTTP"); }
catch (e) {
try {
xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); }
catch (e) {
alert("Your browser does not support AJAX!"); return false; }}
}
xmlHttp.open('GET', sUrl, false); xmlHttp.send(null); while (xmlHttp.readyState != 4); if (xmlHttp.status == 200) {
sResult = xmlHttp.responseText; }
else {
sResult = "-1"; }
return sResult; }
function imBlogCheckComment(sAlert,sName,sEmail,sBody) {
var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; if(imGetLayer("form_name").value != "") {
if(imGetLayer("form_email").value != "" && filter.test(imGetLayer("form_email").value)) {
if(imGetLayer("form_body").value != "")
return true; else
alert(sAlert + ' ' + sBody); }
else
alert(sAlert + ' ' + sEmail); }
else
alert(sAlert + ' ' + sName); return false; }
function imCheckForm(iType, sID, sAlert, iCount, sUrl) {
var sError = ""; switch (iType) {
case 0:
if (imGetLayer(sID).value == "")
sError = sID; break; case 1:
var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; if (imGetLayer(sID).value == "" || !filter.test(imGetLayer(sID).value))
sError = sID; break; case 2:
if (imGetLayer(sID + "_d").selectedIndex == 0 || imGetLayer(sID + "_m").selectedIndex == 0 || imGetLayer(sID + "_y").value == "")
sError = sID + "_y"; break; case 3:
if (imGetLayer(sID).selectedIndex == 0)
sError = sID; break; case 4:
var bValid = false; while(iCount-- && !bValid)
if (imGetLayer(sID + (iCount+1)).checked == true)
bValid = true; if(!bValid)
sError = sID + "1"; break; case 5:
if (imGetUrl(sUrl+'?chk='+sID+'&ans='+ escape(imGetLayer(sID).value)) != '0')
sError = sID; break; case 6:
if (imGetUrl('captcha/imcaptcha.php?action=check&code='+imGetLayer(sID+'_cpf').value+'&ans='+imGetLayer(sID+'_cpv').value) != '0')
sError = sID+'_cpv'; break; }
if(sError != "") {
alert(sAlert); imGetLayer(sError).focus(); return (false); }
return (true); }
function imShowCaptcha(sName) {
var sCode = ""; var i; var sChar; for (i=0; i<5; i++) {
do
sChar = parseInt(Math.random()*9); while (sCode.indexOf(sChar) > -1)
sCode = sCode+sChar; }
imGetLayer(sName+"_cpf").value=sCode; imGetLayer(sName+"_cpn").src="captcha/imcaptcha.php?action=show&code="+sCode; }
function imFocus(oCtl, sColor) {
oCtl.style.backgroundColor = sColor; }
function imFilterCheck(oEvent,expr){
if (imEffectEnabled)
iKey = oEvent.keyCode; else
iKey = oEvent.which; sKey = String.fromCharCode(iKey); if (expr.test(sKey))
return true; else
return false; }
function imKeyFilter(iType, oEvent){
if (iType == 0)
expr = /[\d\n\b]/; else if (iType == 1)
expr = /[\d\n\b\- ]/; else if (iType == 2)
expr = /[\d\n\b\/\.]/; return imFilterCheck(oEvent,expr); }
function IMTip() {
var el = imGetLayer('imToolTip'); var oldmove; var attached = false; var effect_step = 0; var effect_timer = null; this.imShown = false; this.show = function(obj,content,position,x,y,content_style,must_move,effect,pos_x,pos_y) {
this.imLeft = 0; this.imRight = 0; this.imTop = 0; this.imBottom = 0; el.style.top = '-10000px'; el.style.bottom = ''; el.style.left = '-10000px'; el.style.right = ''; switch(position) {
case 'tl': this.imLeft = 1; this.imTop = 1; break; case 'tr': this.imRight = 1; this.imTop = 1; break; case 'bl': this.imLeft = 1; this.imBottom = 1; break; case 'br': this.imRight = 1; this.imBottom = 1; break; }
this.imX = (x ? x : 0); this.imY = (y ? y : 0); el.style.display = 'none'; el.innerHTML = '<div style=\"' + content_style + '\">' + content + '</div>'; el.imMustMove = must_move; this.imShown = true; switch(effect) {
case 0: el.style.display = ''; break; case 1: clearTimeout(this.effect_timer); this.effect_step = 0; el.style.height = ''; this.fade(); break; case 2: clearTimeout(this.effect_timer); this.effect_step = 0; el.style.height = ''; el.style.opacity = 0.9; el.style.filter = 'alpha(opacity=90)'; el.style.visible='hidden'; el.style.display = ''; elch = el.clientHeight; el.style.display = 'none'; el.style.visible='visible'; this.slide(elch); break; }
if(el.imMustMove == true) {
this.detach(); document.onmousemove = function(e) {
this.imTip.move(e); }; el.onmouseover = function(e) {
imt.move(e); }; }
else {
if(this.imLeft == 1) {
el.style.left = (pos_x != undefined ? pos_x : (this.mouseX-this.imX+10)) + 'px'; }
else {
el.style.right = (pos_x != undefined ? document.documentElement.clientWidth-pos_x : (document.documentElement.clientWidth-this.mouseX-this.imX+10)) + 'px'; }
if(this.imTop == 1) {
el.style.top = (pos_y != undefined ? pos_y : (this.mouseY-this.imY+10)) + 'px'; }
else {
el.style.bottom = (pos_y != undefined ? document.documentElement.clientHeight-pos_y : (document.documentElement.clientHeight-this.mouseY+this.imY+10)) + 'px'; }}
return false; }; this.mousepos = function(evt) {
var e = (evt) ? evt : window.event; this.mouseX = ((e.pageX) ? e.pageX : (e.clientX + document.documentElement.scrollLeft)); this.mouseY = ((e.pageY) ? e.pageY : (e.clientY + document.documentElement.scrollTop)); }; this.attach = function() {
this.attached = true; document.imOldOnMouseMove = document.onmousemove; document.imTip = this; document.onmousemove = function(e) {
this.imTip.mousepos(e); }; }; this.detach = function() {
if(this.attached) {
this.attached = false; document.onmousemove = document.imOldOnMouseMove; }}; this.fade = function() {
if(this.effect_step <= 100) {
el.style.opacity = this.effect_step/100; el.style.filter = "alpha(opacity=" + this.effect_step + ")"; if(this.effect_step == 0) {
el.style.display = ''; }
this.effect_step += 15; this.effect_timer = setTimeout('imt.fade()',50); }}; this.slide = function(height) {
if(this.effect_step <= 100) {
el.style.height = height/100*this.effect_step + 'px'; if(this.effect_step == 0) {
el.style.display = ''; }
this.effect_step += 5; this.effect_timer = setTimeout('imt.slide(' + height + ')',25); }}; this.move = function(evt) {
var e = (evt) ? evt : window.event; if(this.imLeft != 0) {
el.style.left = (((e.pageX) ? e.pageX : (e.clientX + document.documentElement.scrollLeft))-this.imX+10) + 'px'; el.style.right = ''; }
else {
el.style.right = (((e.pageX) ? document.documentElement.clientWidth-e.pageX : (document.documentElement.clientWidth-e.clientX-document.documentElement.scrollLeft))-this.imX+10) + 'px'; el.style.left = ''; }
if(this.imTop != 0) {
el.style.top = (((e.pageY) ? e.pageY : (e.clientY + document.documentElement.scrollTop))-this.imY+10) + 'px'; el.style.bottom = ''; }
else {
el.style.bottom = ((e.pageY ? document.documentElement.clientHeight-e.pageY : (document.documentElement.clientHeight-e.clientY-document.documentElement.scrollTop))-this.imY+10) + 'px'; el.style.top = ''; }}; this.hide = function() {
this.imShown = false; el.style.display = 'none'; el.innerHTML = ''; el.style.top = '-10000px'; el.style.bottom = ''; el.style.left = '-10000px'; el.style.right = ''; document.onmousemove = document.imOldOnMouseMove; el.onmouseover = function(){}; this.attach(); }; }
function imGetPositionX(obj,head) {
var ie7u = navigator.appVersion.indexOf('MSIE') != -1 && navigator.appVersion.indexOf('MSIE 8') == -1; head = head && !ie7u; iX = obj.offsetLeft; if(!head)
do {
obj = obj.parent || obj.parentNode; iX += obj.offsetLeft; }
while(obj.id != 'imPage' && obj.id != 'imSite'); return iX; }
function imGetPositionY(obj,head) {
var ie7u = navigator.appVersion.indexOf('MSIE') != -1 && navigator.appVersion.indexOf('MSIE 8') == -1; head = head && !ie7u; iY = obj.offsetTop; if(!head)
do {
obj = obj.parent || obj.parentNode; iY += obj.offsetTop; }
while(obj.id != 'imPage' && obj.id != 'imSite'); return iY; }
function imTipShow(oLink,iVal,iWidth,sBgColor,sBdColor,sFColor,sFont,iSize,bBold,bItalic,sHtml,iMode,bHead) {
oLink.title = ''; var sStyle = 'position: relative; width: '+iWidth+'px; padding: '+iVal[3]+'px 0 '+iVal[3]+'px 0; margin: '+iVal[5]+'px;'; var sBuf = ''+
'<div style="position: absolute; top: 0; left: 0; width: '+iVal[2]+'px; height: '+iVal[3]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat 0 0; overflow: hidden; " ></div>'+
'<div style="position: absolute; top: 0; left: '+iVal[3]+'px; width: '+(iWidth-iVal[2]-iVal[2])+'px; height: '+(iVal[3]-iVal[7])+'px; border-top: '+iVal[7]+'px solid #'+sBdColor+'; background-color: #'+sBgColor+'; overflow: hidden; " ></div>'+
'<div style="position: absolute; top: 0; left: '+(iWidth-iVal[2])+'px; width: '+iVal[2]+'px; height: '+iVal[3]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat -'+iVal[2]+'px 0px; overflow: hidden; " ></div>'+
'<div style="position: absolute; bottom: 0; left: 0; width: '+iVal[2]+'px; height: '+iVal[3]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat 0px -'+iVal[3]+'px; overflow: hidden; " ></div>'+
'<div style="position: absolute; bottom: 0; left: '+iVal[3]+'px; width: '+(iWidth-iVal[2]-iVal[2])+'px; height: '+(iVal[3]-iVal[7])+'px; border-bottom: '+iVal[7]+'px solid #'+sBdColor+'; background-color: #'+sBgColor+'; overflow: hidden; " ></div>'+
'<div style="position: absolute; bottom: 0; left: '+(iWidth-iVal[2])+'px; width: '+iVal[2]+'px; height: '+iVal[3]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat -'+iVal[2]+'px -'+iVal[3]+'px; overflow: hidden; " ></div>'+
'<div style="position: relative; border-left: '+iVal[7]+'px solid #'+sBdColor+'; border-right: '+iVal[7]+'px solid #'+sBdColor+'; background-color: #'+sBgColor+'; padding: 0 '+(3+iVal[7])+'px 0 '+(3+iVal[7])+'px; font: '+iSize+'pt '+sFont+'; color: #'+sFColor+'; '+(bBold==1?'font-weight:bold; ':'')+(bItalic==1?'font-style:italic; ':'')+'">'+
sHtml+
'</div>'; if (iVal[1] != 0)
sBuf += (iVal[1]==1?'<div style="position: absolute; top:-'+(iVal[5]-iVal[7])+'px ; left: '+parseInt(iVal[6]/100*iWidth-iVal[4]/2)+'px; width: '+iVal[4]+'px; height: '+iVal[5]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat -'+(iVal[2]*2)+'px 0px; overflow: hidden; " ></div>':'<div style="position: absolute; bottom:-'+(iVal[5]-iVal[7])+'px ; left: '+parseInt(iVal[6]/100*iWidth-iVal[4]/2)+'px; width: '+iVal[4]+'px; height: '+iVal[5]+'px; background: url(\'res/t'+iVal[0]+'_'+sBgColor+'.gif\') no-repeat -'+(iVal[2]*2+iVal[4])+'px 0px; overflow: hidden; " ></div>'); imt.attach(); if(iMode >= 0)
imt.show(oLink,sBuf,(iVal[1] == 2 ? 'bl' : 'tl'),parseInt((iWidth)*iVal[6]/100)+iVal[5],0,sStyle,true,iMode); else {
iX = imGetPositionX(oLink,bHead); iY = imGetPositionY(oLink,bHead); imt.show(oLink,sBuf,(iVal[1] == 2 ? 'bl' : 'tl'),parseInt((iWidth-iVal[4])*iVal[6]/100)+iVal[5],0,sStyle,false,Math.abs(iMode)-1,iX,iY+(iVal[1] == 2 ? -iVal[5] : oLink.offsetHeight+iVal[5])); }
return false; }
function imTipHide(){
imt.hide(); imt.detach(); }
function imFormatInt(i) {
if (i<10) i='0'+i; return i; }
function imShowHour() {
var now=new Date(); imGetLayer("imHour").innerHTML = now.getHours()+':'+imFormatInt(now.getMinutes())+':'+imFormatInt(now.getSeconds())+' '; setTimeout(imShowHour,1000); }
function imShowDate(sDay,sMonth,iMode) {
var now=new Date(); if (iMode == 0)
document.write(sDay.substr(now.getDay()*3,3)+' '+now.getDate()+' '+sMonth.substr(now.getMonth()*3,3)+', '+now.getFullYear()); else
document.write(sDay.substr(now.getDay()*3,3)+', '+sMonth.substr(now.getMonth()*3,3)+' '+now.getDate()+' '+now.getFullYear()); }
var imBGSoundUrl = ''; function imSoundLink(url) {
if(imGetLayer('imBGSound').innerHTML == "")
imGetLayer('imBGSound').innerHTML = "<embed style=\"height:0\" id=\"imBGSoundEmbed\" src=\"" + url + "\" loop=\"false\" autostart=\"true\" hidden=\"true\" />"; else {
if(imGetLayer('imBGSoundEmbed').src.substr(imGetLayer('imBGSoundEmbed').src.length-url.length) != url)
imGetLayer('imBGSound').innerHTML = "<embed style=\"height:0\" id=\"imBGSoundEmbed\" src=\"" + url + "\" loop=\"false\" autostart=\"true\" hidden=\"true\" />"; else
imGetLayer('imBGSound').innerHTML = ""; }}
function imPopUpWin(sUrl,w,h,cb,sb){
if (cb=='yes') 
sProp=''; else {
if ((w==-1) || (h==-1)) {
sProp= 'width='+screen.width+',height='+screen.height+',top=0,left=0,scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no'; } else {
l=(screen.width)?(screen.width-w)/2:100; t=(screen.height)?(screen.height-h)/2:100; sProp='width='+ w +',height='+ h +',top='+ t +',left='+ l +',scrollbars='+ sb +',location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no'; }}
oWin=window.open(sUrl,'',sProp); oWin.focus(); }
var msSSTrans = new Array(75); msSSTrans[0] = "BasicImage(grayscale=0, xray=0, mirror=0, invert=0, opacity=1, rotation=0)"; msSSTrans[1] = "rnd"; msSSTrans[2] = "Barn(motion='out',orientation='vertical')"; msSSTrans[3] = "Barn(motion='out',orientation='horizontal')"; msSSTrans[4] = "Barn(motion='in',orientation='vertical')"; msSSTrans[5] = "Barn(motion='in',orientation='horizontal')"; msSSTrans[6] = "Blinds(Bands=2,direction='up')"; msSSTrans[7] = "Blinds(Bands=2,direction='down')"; msSSTrans[8] = "Blinds(Bands=2,direction='left')"; msSSTrans[9] = "Blinds(Bands=2,direction='right')"; msSSTrans[10] = "Blinds(Bands=15,direction='up')"; msSSTrans[11] = "Blinds(Bands=15,direction='down')"; msSSTrans[12] = "Blinds(Bands=15,direction='left')"; msSSTrans[13] = "Blinds(Bands=15,direction='right')"; msSSTrans[14] = "Checkerboard(Direction='up',SquaresX=4,SquaresY=4)"; msSSTrans[15] = "Checkerboard(Direction='down',SquaresX=4,SquaresY=4)"; msSSTrans[16] = "Checkerboard(Direction='left',SquaresX=4,SquaresY=4)"; msSSTrans[17] = "Checkerboard(Direction='right',SquaresX=4,SquaresY=4)"; msSSTrans[18] = "Checkerboard(Direction='up',SquaresX=50,SquaresY=12)"; msSSTrans[19] = "Checkerboard(Direction='down',SquaresX=50,SquaresY=12)"; msSSTrans[20] = "Checkerboard(Direction='left',SquaresX=50,SquaresY=12)"; msSSTrans[21] = "Checkerboard(Direction='right',SquaresX=50,SquaresY=12)"; msSSTrans[22] = "Fade(Overlap=1.00)"; msSSTrans[23] = "Fade(Overlap=0.00)"; msSSTrans[24] = "GradientWipe(GradientSize=0.00,wipestyle=0,motion='forward')"; msSSTrans[25] = "GradientWipe(GradientSize=0.00,wipestyle=0,motion='reverse')"; msSSTrans[26] = "GradientWipe(GradientSize=0.00,wipestyle=1,motion='forward')"; msSSTrans[27] = "GradientWipe(GradientSize=0.00,wipestyle=1,motion='reverse')"; msSSTrans[28] = "GradientWipe(GradientSize=0.75,wipestyle=0,motion='forward')"; msSSTrans[29] = "GradientWipe(GradientSize=0.75,wipestyle=0,motion='reverse')"; msSSTrans[30] = "GradientWipe(GradientSize=0.75,wipestyle=1,motion='forward')"; msSSTrans[31] = "GradientWipe(GradientSize=0.75,wipestyle=1,motion='reverse')"; msSSTrans[32] = "Iris(irisstyle='PLUS',motion='out')"; msSSTrans[33] = "Iris(irisstyle='PLUS',motion='in')"; msSSTrans[34] = "Iris(irisstyle='DIAMOND',motion='out')"; msSSTrans[35] = "Iris(irisstyle='DIAMOND',motion='in')"; msSSTrans[36] = "Iris(irisstyle='CIRCLE',motion='out')"; msSSTrans[37] = "Iris(irisstyle='CIRCLE',motion='in')"; msSSTrans[38] = "Iris(irisstyle='CROSS',motion='out')"; msSSTrans[39] = "Iris(irisstyle='CROSS',motion='in')"; msSSTrans[40] = "Iris(irisstyle='SQUARE',motion='out')"; msSSTrans[41] = "Iris(irisstyle='SQUARE',motion='in')"; msSSTrans[42] = "Iris(irisstyle='STAR',motion='out')"; msSSTrans[43] = "Iris(irisstyle='STAR',motion='in')"; msSSTrans[44] = "RadialWipe(wipestyle='CLOCK')"; msSSTrans[45] = "RadialWipe(wipestyle='WEDGE')"; msSSTrans[46] = "RadialWipe(wipestyle='RADIAL')"; msSSTrans[47] = "Wheel(spokes=2)"; msSSTrans[48] = "Wheel(spokes=4)"; msSSTrans[49] = "Wheel(spokes=10)"; msSSTrans[50] = "RandomBars(orientation='horizontal')"; msSSTrans[51] = "RandomBars(orientation='vertical')"; msSSTrans[52] = "RandomDissolve(duration=1)"; msSSTrans[53] = "Slide(slidestyle='HIDE',Bands=1)"; msSSTrans[54] = "Slide(slidestyle='SWAP',Bands=1)"; msSSTrans[55] = "Slide(slidestyle='PUSH',Bands=1)"; msSSTrans[56] = "Slide(slidestyle='HIDE',Bands=2)"; msSSTrans[57] = "Slide(slidestyle='SWAP',Bands=2)"; msSSTrans[58] = "Slide(slidestyle='PUSH',Bands=2)"; msSSTrans[59] = "Slide(slidestyle='HIDE',Bands=10)"; msSSTrans[60] = "Slide(slidestyle='SWAP',Bands=10)"; msSSTrans[61] = "Slide(slidestyle='PUSH',Bands=10)"; msSSTrans[62] = "Spiral(GridSizeX=8,GridSizeY=8)"; msSSTrans[63] = "Spiral(GridSizeX=16,GridSizeY=16)"; msSSTrans[64] = "Zigzag(GridSizeX=6,GridSizeY=6)"; msSSTrans[65] = "Zigzag(GridSizeX=12,GridSizeY=12)"; msSSTrans[66] = "Stretch(stretchstyle='HIDE')"; msSSTrans[67] = "Stretch(stretchstyle='PUSH')"; msSSTrans[68] = "Stretch(stretchstyle='SPIN')"; msSSTrans[69] = "Strips(motion='rightdown')"; msSSTrans[70] = "Strips(motion='leftdown')"; msSSTrans[71] = "Strips(motion='rightup')"; msSSTrans[72] = "Strips(motion='leftup')"; msSSTrans[73] = "Pixelate(MaxSquare=5)"; msSSTrans[74] = "Pixelate(MaxSquare=50)"; msSSTrans[75] = "Inset()"; var msMESSImage = new Array(); var miMESSEffect = new Array(); var miMESSDelay = new Array(); var miMESSCount = new Array(); var moMESSTime = new Array(); var moMESSTimeImg = new Array(); function imMESSPlay(iID,bMode,oImgData) {
msMESSImage[iID] = new Array(); miMESSEffect[iID] = new Array(); miMESSDelay[iID] = new Array(); for(i=0;i<oImgData.length;i++){
msMESSImage[iID][i+1] = "slideshow/"+oImgData[i][0]; miMESSEffect[iID][i+1] = oImgData[i][1]; miMESSDelay[iID][i+1] = oImgData[i][2]*1000; }
if(!miMESSCount[iID]) miMESSCount[iID]=0; imGetLayer("imMEObj_"+iID).innerHTML = "<div id=\"imMESSImage_"+iID+"_back\" style=\"width: 100%; height: 100%; \"></div><div id=\"imMESSImage_"+iID+"\" style=\"position: absolute; top: 0; width: 100%; height: 100%; \"></div>"; imMESSDoAuto(iID,bMode); }
function imMESSDoAuto(iID,bMode) {
imMESSDoTrans(iID,bMode); iAutoDelay=miMESSDelay[iID][miMESSCount[iID]]; moMESSTime[iID]=setTimeout("imMESSDoAuto("+iID+","+bMode+")", iAutoDelay); }
function imMESSFade(iID) {
var div_Image=imGetLayer("imMESSImage_"+iID); var div_ImageBack=imGetLayer("imMESSImage_"+iID+"_back"); if(div_Image.style.opacity > 0.025)
div_Image.style.opacity -= 0.025; else {
clearInterval(moMESSTimeImg[iID]); div_Image.style.backgroundImage = div_ImageBack.style.backgroundImage; div_Image.style.opacity = 1; }}
function imMESSDoTrans(iID,bMode) {
iLast = msMESSImage[iID].length-1; miMESSCount[iID]=(bMode == 0 ? miMESSCount[iID]+1:Math.floor(Math.random()*msMESSImage[iID].length+1)); if (miMESSCount[iID] == iLast + 1) miMESSCount[iID] = 1; if (miMESSCount[iID] == 0) miMESSCount[iID] = iLast; var div_Main=imGetLayer("imMEObj_"+iID);  
var div_Image=imGetLayer("imMESSImage_"+iID); var div_ImageBack=imGetLayer("imMESSImage_"+iID+"_back"); if (imEffectEnabled) {
if (miMESSEffect[iID][miMESSCount[iID]] == 1)
  iSSEffectType = Math.floor(Math.random()*73) + 2; else
  iSSEffectType = miMESSEffect[iID][miMESSCount[iID]]; div_Main.style.filter="progid:DXImageTransform.Microsoft."+msSSTrans[iSSEffectType]; div_Main.filters.item(0).Apply(); }
if (imEffectEnabled) {
div_ImageBack.style.backgroundImage = "url('')"; div_ImageBack.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\""+msMESSImage[iID][miMESSCount[iID]]+"\", sizingMethod=\"scale\")"; }
else if(miMESSEffect[iID][miMESSCount[iID]] != 0){
div_ImageBack.style.backgroundImage = "url(" + msMESSImage[iID][miMESSCount[iID]] + ")"; moMESSTimeImg[iID] = setInterval('imMESSFade(' + iID + ')',10); }
else
div_Image.style.backgroundImage = "url(" + msMESSImage[iID][miMESSCount[iID]] + ")"; if (imEffectEnabled) div_Main.filters.item(0).Play(); iNext = miMESSCount[iID]+1
if (iNext <= iLast) {
oImg = new Image(); oImg.src = msMESSImage[iID][iNext]; }}
var miSSH = new Array(); var miSSW = new Array(); var msImgList = new Array(); var miImgW = new Array(); var miImgH = new Array(); var miSSDelay = new Array(); var miSSEffect = new Array(); var msSSDescr = new Array(); var msSSLink = new Array(); var miSSCount = new Array(); var moSSTime = new Array(); var moSSTimeImg = new Array(); var moSSTimeDescr = new Array(); var moSSTransTimer = new Array(); function imSSLoad(iID,oImgData) {
msImgList[iID] = new Array(); miImgW[iID] = new Array(); miImgH[iID] = new Array(); miSSEffect[iID] = new Array(); miSSDelay[iID] = new Array(); msSSDescr[iID] = new Array(); msSSLink[iID] = new Array(); moSSTransTimer[iID] = null; for(i=0;i<oImgData.length;i++){
msImgList[iID][i+1] = "slideshow/"+oImgData[i][0]; miImgW[iID][i+1] = oImgData[i][1]; miImgH[iID][i+1] = oImgData[i][2]; miSSDelay[iID][i+1] = oImgData[i][3]*1000; miSSEffect[iID][i+1] = oImgData[i][4]; msSSDescr[iID][i+1] = oImgData[i][5]; msSSLink[iID][i+1] = oImgData[i][6]; }
if(!miSSCount[iID]) miSSCount[iID]=1; if (!imEffectEnabled)
imGetLayer("imSSImage_"+iID+"_back").style.display = ''; }
function imSSFade(iID) {
var div_Image=imGetLayer("imSSImage_"+iID); var div_ImageBack=imGetLayer("imSSImage_"+iID+"_back"); if(div_Image.style.opacity > 0.025) {
div_Image.style.opacity -= 0.025; div_ImageBack.style.opacity = 1-div_Image.style.opacity; }
else {
clearInterval(moSSTimeImg[iID]); div_Image.src = div_ImageBack.src; div_Image.style.paddingTop = div_ImageBack.style.top; div_Image.style.paddingLeft = div_ImageBack.style.left; div_Image.style.opacity = 1; div_ImageBack.style.opacity = 0; }}
function imSSDescrSlide(iID,direction) {
var div_Descr=imGetLayer("imSSDescr_"+iID); var pos = parseInt(div_Descr.style.bottom.substr(0,div_Descr.style.bottom.length-2)); if(pos > -div_Descr.clientHeight-10 && direction == 1) {
pos = (pos+(-div_Descr.clientHeight)/5); if(pos >= -div_Descr.clientHeight-10)
div_Descr.style.bottom = pos + 'px'; else
div_Descr.style.bottom = -div_Descr.clientHeight-10 + 'px'; }
else if(pos < 0 && direction == -1) {
pos = (pos-(-div_Descr.clientHeight)/5); if(pos <= 0)
div_Descr.style.bottom = pos + 'px'; else
div_Descr.style.bottom = '0px'; }
else
clearInterval(moSSTimeDescr[iID]); }
function imSSDescrHide(iID) {
clearInterval(moSSTimeDescr[iID]); moSSTimeDescr[iID] = setInterval('imSSDescrSlide(' + iID + ',1)',10); }
function imSSDescrShow(iID) {
clearInterval(moSSTimeDescr[iID]); moSSTimeDescr[iID] = setInterval('imSSDescrSlide(' + iID + ',-1)',10); }
function imDoTrans(iID,iStep) {
var div_SSBtns = imGetLayer("imSSBtns_"+iID); var div_SSBtnsImgs; var transition = function () {
miSSCount[iID]=(miSSCount[iID]+iStep); if (miSSCount[iID] == iLast + 1) miSSCount[iID] = 1; if (miSSCount[iID] == 0) miSSCount[iID] = iLast; var div_Descr=imGetLayer("imSSDescr_"+iID); var div_DescrBG=imGetLayer("imSSDescr_"+iID+"_bg"); var div_DescrText=imGetLayer("imSSDescr_"+iID+"_text"); var div_Main=imGetLayer("imSSBackg_"+iID); var div_Images=imGetLayer("imSSImages_"+iID);  
var div_Image=imGetLayer("imSSImage_"+iID); var div_ImageBack=imGetLayer("imSSImage_"+iID+"_back"); if (imEffectEnabled) {
if (miSSEffect[iID][miSSCount[iID]] == 1)
  iSSEffectType = Math.floor(Math.random()*73) + 2; else
  iSSEffectType = miSSEffect[iID][miSSCount[iID]]; div_Images.style.filter="progid:DXImageTransform.Microsoft."+msSSTrans[iSSEffectType]; div_Images.filters.item(0).Apply(); div_Image.src = msImgList[iID][miSSCount[iID]]; iTop=parseInt((div_Main.clientHeight-miImgH[iID][miSSCount[iID]])/2); div_Image.style.paddingTop=iTop+'px'; div_Image.style.paddingLeft=parseInt((div_Main.clientWidth-miImgW[iID][miSSCount[iID]])/2)+'px'; }
else if(iStep != 0 && miSSEffect[iID][miSSCount[iID]] != 0) {
div_ImageBack.src = msImgList[iID][miSSCount[iID]]; iTop=parseInt((div_Main.clientHeight-miImgH[iID][miSSCount[iID]])/2); div_ImageBack.style.top=iTop+'px'; div_ImageBack.style.left=parseInt((div_Main.clientWidth-miImgW[iID][miSSCount[iID]])/2)+'px'; clearInterval(moSSTimeImg[iID]); moSSTimeImg[iID]=setInterval("imSSFade("+iID+")", 10); }
else {
div_Image.style.visible = 'hidden'; div_Image.src = msImgList[iID][miSSCount[iID]]; iTop=parseInt((div_Main.clientHeight-miImgH[iID][miSSCount[iID]])/2); div_Image.style.paddingTop=iTop+'px'; div_Image.style.paddingLeft=parseInt((div_Main.clientWidth-miImgW[iID][miSSCount[iID]])/2)+'px'; div_Image.style.visible = 'visible'; }
if(msSSDescr[iID][miSSCount[iID]] != '') {
div_DescrText.innerHTML = msSSDescr[iID][miSSCount[iID]]; div_Descr.style.display = ''; div_DescrBG.style.height = div_DescrText.clientHeight + 'px'; div_Descr.style.height = div_DescrText.clientHeight + 'px'; }
else
div_Descr.style.display = 'none'; if (imEffectEnabled) div_Images.filters.item(0).Play(); if(msSSLink[iID][miSSCount[iID]] != "#")
div_Image.style.cursor = 'pointer'; else
div_Image.style.cursor = 'default'; iNext = miSSCount[iID]+1
if (iNext <= iLast) {
oNextImg = new Image(); oNextImg.src = msImgList[iID][iNext]; }}
iLast = msImgList[iID].length-1; if(moSSTransTimer[iID] != null) {
clearTimeout(moSSTransTimer[iID]); if(div_SSBtns) {
div_SSBtnsImgs = div_SSBtns.getElementsByTagName('img'); for(i = 0; i < div_SSBtnsImgs.length; i++)
if(div_SSBtnsImgs[i].className == 'imssBtn')
div_SSBtnsImgs[i].style.cursor = 'pointer'; }}
oImg = new Image(); iNext = miSSCount[iID]+iStep; if (iNext == iLast + 1) iNext = 1; if (iNext == 0) iNext = iLast; if (!isIE9) {
oImg.src = msImgList[iID][iNext]; if(oImg.complete) {
  transition(); }
else {
moSSTransTimer[iID] = setTimeout('imDoTrans(' + iID + ',' + iStep + ')',10); if(div_SSBtns) {
div_SSBtnsImgs = div_SSBtns.getElementsByTagName('img'); for(i = 0; i < div_SSBtnsImgs.length; i++)
if(div_SSBtnsImgs[i].className == 'imssBtn')
div_SSBtnsImgs[i].style.cursor = 'wait'; }}
} else {
oImg.onload = transition; oImg.src = msImgList[iID][iNext]; }}
function imLink(iID){
if(msSSLink[iID][miSSCount[iID]] != "#")
location = msSSLink[iID][miSSCount[iID]]; }
function imDoAuto(iID) {
imDoTrans(iID,1); iAutoDelay=miSSDelay[iID][miSSCount[iID]]; moSSTime[iID]=setTimeout("imDoAuto("+iID+")", iAutoDelay); }
function imSSPlay(iID,Auto,iBtnType) {
if (Auto == 1) {
imDoTrans(iID,0); miSSCount[iID]=1; iAutoDelay=miSSDelay[iID][miSSCount[iID]]; moSSTime[iID]=setTimeout("imDoAuto("+iID+")", iAutoDelay); }
else {
cmd_Auto = imGetLayer('imssPlay_' + iID); if (cmd_Auto.alt == 'Pause') {
cmd_Auto.alt='Play'; cmd_Auto.src='res/ss_play'+iBtnType+'.gif'; clearTimeout(moSSTime[iID]); }
else {
cmd_Auto.alt='Pause'; cmd_Auto.src='res/ss_pause'+iBtnType+'.gif'; imDoTrans(iID, 1); iAutoDelay=miSSDelay[iID][miSSCount[iID]]; moSSTime[iID]=setTimeout("imDoAuto("+iID+")", iAutoDelay); }}
}
var iMMCurPos=0; var iMMEnd = 0; var iMMEndDisplace = 0; var oMMTime = null; var imMMVel=0; var iMMHeaderSize = 0; var iMMFooterSize = 0; var iMMTimerInt = 0; function imGetOffset(sName) {return imGetLayer(sName).offsetHeight ?
imGetLayer(sName).offsetHeight :
imGetLayer(sName).style.pixelHeight ?
imGetLayer(sName).style.pixelHeight : 0; }
function imMMScrollMenu(){
if (document.documentElement && document.documentElement.scrollTop)
iMMEnd = document.documentElement.scrollTop > iMMHeaderSize ?
document.documentElement.scrollTop - iMMHeaderSize :
0; else if (document.body && document.body.scrollTop)
iMMEnd = document.body.scrollTop > iMMHeaderSize ?
document.body.scrollTop - iMMHeaderSize :
0; else
iMMEnd = 0; if(iMMCurPos > iMMEnd)
iMMEndDisplace = -(imMMVel-1);//up
else if (iMMCurPos < iMMEnd)
iMMEndDisplace = (imMMVel-1);//down
iMMCurPos += ((iMMEnd - iMMCurPos + iMMEndDisplace)/imMMVel); iMMCurPos = parseInt(iMMCurPos); imGetLayer("imMnMn").style.paddingTop = iMMCurPos + 'px'; if (iMMCurPos == iMMEnd){
clearTimeout(oMMTime); oMMTime = null; }
else{
clearTimeout(oMMTime); oMMTime = setTimeout("imMMScrollMenu()", iMMTimerInt); }}
function imMMMenu(){
if(!oMMTime)
oMMTime = setTimeout("imMMScrollMenu()", iMMTimerInt); }
function imMMInit(iMMVel){
iMMHeaderSize = imGetLayer("imMenuMain").offsetTop; iMMFooterSize = imGetLayer("imFooter").offsetTop; imMMVel = iMMVel; iTimerInt = 5; iMMCurPos = 0; imGetLayer("imMnMn").style.paddingTop = iMMCurPos + 'px'; window.onscroll = imMMMenu; }
var imShowBoxTimer = null; var imShowBoxBGFadeTimer = null; var imShowBoxStep = 0; var imShowBoxBGOpacity = 0; var imShowBoxOpacity = 0; var imShowBoxContentOpacity = 0; var imShowBoxHeight = 200; var imShowBoxDimensionsStep = 0; var imShowBoxDescriptionDimensionsStep = 0; var imShowBoxContentHTML; var imShowBoxReady = 1; var imShowBoxEffect = 'f'; function IMShowBoxImagePreloader(src) {
this.src = src; var imgPreloader = new Image; imgPreloader.imImgID = this.id; imgPreloader.onload = function() {
imShowBoxReady = 1; }; imgPreloader.src = src; }; function imShowBox(content,height,width,description,type,effect) {
if (!imPopupEffect && effect != 'f') effect = 'f'; var imsbbg = imGetLayer('imShowBoxBG'); var imsbc = imGetLayer('imShowBoxContainer'); var imsb = imGetLayer('imShowBox'); var top = 50; switch(type) {
case 'IMG':
imShowBoxContentHTML = "<img id=\"imShowBoxImage\" src=\"" + content + "\" width=\"" + width + "\" height=\"" + height + "\" />"; imShowBoxReady = 0; new IMShowBoxImagePreloader(content); break; case 'SWF':
imShowBoxContentHTML = "<embed src=\"" + content + "\" type=\"application/x-shockwave-flash\" width=\""+width+"\" height=\""+height+"\" wmode=\"opaque\" menu=\"false\" quality=\"high\"></embed>"; break; case 'VIDEO':
imShowBoxContentHTML = "<embed src=\"" + content + "\" width=\""+width+"\" height=\""+height+"\" autostart=\"true\"></embed>"; break; case 'IFRAME':
imShowBoxContentHTML = "<iframe src=\"" + content + "\" width=\"" + width + "\" height=\"" + height + "\" frameborder=\"0\" marginwidth=\"0\" marginheight=\"0\"></iframe>"; break; case 'CODE':
imShowBoxContentHTML = content; break; }
imShowBoxContentHTML = "<div id=\"imShowBoxContent\">" + imShowBoxContentHTML + "</div><div id=\"imShowBoxDescription\">" + description + "</div>"; imsbbg.style.display = ''; imShowBoxBGFadeTimer = setInterval('imShowBoxBGFade(1)',2); if ((document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop))
top += (document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ); imShowBoxEffect = effect; if(effect == 't') {
imsbc.style.top = -(imsb.style.height.substr(0,imsb.style.height.length-2)+30) + 'px'; imsb.style.opacity = 1; imsb.style.filter = 'alpha(opacity=100)'; imsbc.style.display = ''; imShowBoxTimer = setInterval('imShowBoxTraslate(' + top + ',' + width + ',' + height + ',1)',30); }
else {
imsbc.style.top = top + 'px'; imsb.style.opacity = 0; imsb.style.filter = 'alpha(opacity=0)'; imsbc.style.display = ''; imShowBoxTimer = setInterval('imShowBoxFade(' + width + ',' + height + ',1)',30); }}
function imShowBoxHide() {
if(imShowBoxTimer != null)
clearInterval(imShowBoxTimer); var imsbc = imGetLayer('imShowBoxContent'); var top = 50; if ((document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop))
top += (document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ); if(imShowBoxEffect == 't')
imShowBoxTimer = setInterval('imShowBoxTraslate(' + top + ',0,0,-1)',30); else
imShowBoxTimer = setInterval('imShowBoxFade(0,0,-1)',30); imShowBoxContentOpacity = 0; if(imShowBoxBGFadeTimer != null)
clearInterval(imShowBoxBGFadeTimer); imShowBoxBGFadeTimer = setInterval('imShowBoxBGFade(-1)',2); }
function imShowBoxTraslate(top,width,height,direction) {
var imsbc = imGetLayer('imShowBoxContainer'); var imsb = imGetLayer('imShowBox'); var imsbct = imGetLayer('imShowBoxContent'); var pos = parseInt(imsbc.style.top.substr(0,imsbc.style.top.length-2)); if(imShowBoxStep < 5)
imsbc.style.top = top-(imShowBoxHeight*2-imShowBoxHeight*imShowBoxStep/10)*Math.cos(imShowBoxStep/10*Math.PI) + 'px'; else
imsbc.style.top = top-15*Math.cos(imShowBoxStep/10*Math.PI) + 'px'; if(direction == 1) {
if(imShowBoxStep == 15) {
clearInterval(imShowBoxTimer); imShowBoxTimer = setInterval('imShowBoxDimensions(' + width + ',' + height + ')',10); }
else
if(imShowBoxStep < 5)
imShowBoxStep++; else
imShowBoxStep+=2; }
else {
if(imShowBoxStep == 0) {
var imsbct = imGetLayer('imShowBoxContent'); clearInterval(imShowBoxTimer); imsbc.style.display = 'none'; if(imsbct) {
imsbct.style.opacity = 0; imsbct.style.filter = 'alpha(opacity=0)'; }
imsb.innerHTML = ''; }
else
if(imShowBoxStep < 5)
imShowBoxStep--; else
imShowBoxStep-=2; }}
function imShowBoxBGFade(direction) {
var imsbbg = imGetLayer('imShowBoxBG'); imShowBoxBGOpacity+=direction; imsbbg.style.opacity = imShowBoxBGOpacity/5; imsbbg.style.filter = 'alpha(opacity=' + imShowBoxBGOpacity/0.05 + ')'; if(imShowBoxBGOpacity == 4 && direction == 1)
clearInterval(imShowBoxBGFadeTimer); if(imShowBoxBGOpacity == 0 && direction == -1) {
clearInterval(imShowBoxBGFadeTimer); imsbbg.style.display = 'none'; }}
function imShowBoxFade(width,height,direction) {
var imsbc = imGetLayer('imShowBoxContainer'); var imsb = imGetLayer('imShowBox'); var imsbct = imGetLayer('imShowBoxContent'); if(imShowBoxOpacity == 0 && direction == 1) {
imShowBoxHeight = height; imsb.style.height = height + 'px'; imShowBoxWidth = width; imsb.style.width = width + 'px'; }
imShowBoxOpacity+=direction; imsb.style.opacity = imShowBoxOpacity/10; imsb.style.filter = 'alpha(opacity=' + imShowBoxOpacity/0.1 + ')'; if(imShowBoxOpacity == 10 && direction == 1) {
clearInterval(imShowBoxTimer); imShowBoxSetContent(); }
if(imShowBoxOpacity == 0 && direction == -1) {
clearInterval(imShowBoxTimer); imsbc.style.display = 'none'; if(imsbct) {
imsbct.style.opacity = 0; imsbct.style.filter = 'alpha(opacity=0)'; }
imsb.innerHTML = ''; }}
function imShowBoxContentFade() {
if(imShowBoxReady == 1) {
var imsbc = imGetLayer('imShowBoxContent'); imShowBoxContentOpacity+=1; imsbc.style.opacity = imShowBoxContentOpacity/10; imsbc.style.filter = 'alpha(opacity=' + imShowBoxContentOpacity/0.1 + ')'; if(imShowBoxContentOpacity == 10) {
clearInterval(imShowBoxContentFadeTimer); var imsbd = imGetLayer('imShowBoxDescription'); if(imsbd.innerHTML != '')
imShowBoxTimer = setInterval('imShowBoxDescriptionDimensions(' + (imShowBoxHeight+imsbd.offsetHeight) + ')',5); }}
}
function imShowBoxDimensions(width,height) {
var imsb = imGetLayer('imShowBox'); if(imShowBoxDimensionsStep < 20) {
if(height != imShowBoxHeight) {
imShowBoxHeight += (height-imShowBoxHeight)/(20-imShowBoxDimensionsStep); imsb.style.height = imShowBoxHeight + 'px'; imShowBoxDimensionsStep++; }
else
imShowBoxDimensionsStep = 20; }
else if(imShowBoxDimensionsStep < 40) {
var imsbw = parseInt(imsb.style.width.substr(0,imsb.style.width.length-2)); if(imsbw != width) {
imsbw += (width-imsbw)/(40-imShowBoxDimensionsStep); imsb.style.width = imsbw + 'px'; imShowBoxDimensionsStep++; }
else
imShowBoxDimensionsStep = 40; }
else {
clearInterval(imShowBoxTimer); imShowBoxSetContent(); imShowBoxDimensionsStep = 0; }}
function imShowBoxDescriptionDimensions(height) {
var imsb = imGetLayer('imShowBox'); if(imShowBoxDescriptionDimensionsStep < 10) {
imShowBoxHeight += (height-imShowBoxHeight)/(10-imShowBoxDescriptionDimensionsStep); imsb.style.height = imShowBoxHeight + 'px'; imShowBoxDescriptionDimensionsStep++; }
else {
clearInterval(imShowBoxTimer); imShowBoxDescriptionDimensionsStep = 0; }}
function imShowBoxSetContent() {
var imsb = imGetLayer('imShowBox'); imsb.innerHTML = imShowBoxContentHTML; imShowBoxContentFadeTimer = setInterval('imShowBoxContentFade()',20); }
var moFGTime = null; var moFGTimeDescr = new Array(); var moFGTimeImg = new Array(); var moFGTimeNextImg = new Array(); var moFGNextImg = new Array(); var mFGMoving = new Array(); function imFGClickLR(iFGIndex,iFGBkSize,iFGEndBlock,iFGMaxBlock,iFGSpeed,iFGDir){
var oFGObj = imGetLayer("imFGImgList_" + iFGIndex); var imiLeft = parseInt(oFGObj.style.left); iFGEndBlock = iFGEndBlock <= iFGMaxBlock ? iFGEndBlock < 0 ? 0 : iFGEndBlock : iFGMaxBlock; if(Math.abs(imiLeft) == iFGEndBlock*iFGBkSize){
mFGMoving[iFGIndex] = null; return; }
if(mFGMoving[iFGIndex] && mFGMoving[iFGIndex] != iFGDir)
return; else
mFGMoving[iFGIndex] = iFGDir; if(Math.abs(imiLeft) < iFGEndBlock*iFGBkSize && iFGDir==1){
if(Math.abs(imiLeft - iFGSpeed) > iFGEndBlock*iFGBkSize )
iFGSpeed = imiLeft+iFGEndBlock*iFGBkSize; oFGObj.style.left = imiLeft - iFGSpeed + "px"; setTimeout("imFGClickLR(" + iFGIndex + "," + iFGBkSize + "," + iFGEndBlock + "," + iFGMaxBlock + "," + iFGSpeed + "," + iFGDir + ")",40); }
else if(Math.abs(imiLeft) > iFGEndBlock*iFGBkSize && imiLeft <= 0 && iFGDir==2){
if(Math.abs(imiLeft + iFGSpeed) < iFGEndBlock*iFGBkSize || (imiLeft + iFGSpeed) > iFGEndBlock*iFGBkSize)
iFGSpeed = Math.abs(imiLeft)-iFGEndBlock*iFGBkSize; oFGObj.style.left = imiLeft + iFGSpeed + "px"; setTimeout("imFGClickLR(" + iFGIndex + "," + iFGBkSize + "," + iFGEndBlock + "," + iFGMaxBlock + "," + iFGSpeed + "," + iFGDir + ")",40); }}
function imFGClickUD(iFGIndex,iFGBkSize,iFGEndBlock,iFGMaxBlock,iFGSpeed,iFGDir){
var oFGObj = imGetLayer("imFGImgList_" + iFGIndex); var imiTop = parseInt(oFGObj.style.top); iFGEndBlock = iFGEndBlock <= iFGMaxBlock ? iFGEndBlock < 0 ? 0 : iFGEndBlock : iFGMaxBlock; if(Math.abs(imiTop) == iFGEndBlock*iFGBkSize){
mFGMoving[iFGIndex] = null; return; }
if(mFGMoving[iFGIndex] && mFGMoving[iFGIndex] != iFGDir)
return; else
mFGMoving[iFGIndex] = iFGDir; if(Math.abs(imiTop) < iFGEndBlock*iFGBkSize && iFGDir==2){
if(Math.abs(imiTop - iFGSpeed) > iFGEndBlock*iFGBkSize )
iFGSpeed = parseInt((imiTop+iFGEndBlock*iFGBkSize)); oFGObj.style.top = imiTop - iFGSpeed + "px"; setTimeout("imFGClickUD(" + iFGIndex + "," + iFGBkSize + "," + iFGEndBlock + "," + iFGMaxBlock + "," + iFGSpeed + "," + iFGDir + ")",40); }
else if(Math.abs(imiTop) > iFGEndBlock*iFGBkSize && imiTop <= 0 && iFGDir==1){
if(Math.abs(imiTop + iFGSpeed) < iFGEndBlock*iFGBkSize || (imiTop + iFGSpeed) > iFGEndBlock*iFGBkSize)
iFGSpeed = parseInt((Math.abs(imiTop)-iFGEndBlock*iFGBkSize)); oFGObj.style.top = imiTop + iFGSpeed + "px"; setTimeout("imFGClickUD(" + iFGIndex + "," + iFGBkSize + "," + iFGEndBlock + "," + iFGMaxBlock + "," + iFGSpeed + "," + iFGDir + ")",40); }}
function imFGMove(iFGIndex,iFGSpeed,iFGType,iFGCmd){
clearTimeout(moFGTime); if(iFGType < 1 || iFGType > 4)
 return; var imDataObj = imGetLayer("imFGImgList_" + iFGIndex); var imDataCont = imGetLayer("imFGImgCont_" + iFGIndex); var imiLeft = parseInt(imDataObj.style.left); var imiTop = parseInt(imDataObj.style.top); var imiSize = imGetLayer("imFGItem_" + iFGIndex + "_" + 1 ).offsetHeight; var imiTWBlock = parseInt(imDataObj.offsetWidth/imiSize); var imiTHBlock = parseInt(imDataObj.offsetHeight/imiSize); switch(iFGType){
  //move right
case 1:{
  if (imiLeft - iFGSpeed >= imDataCont.offsetWidth - imDataObj.offsetWidth)
       switch(iFGCmd){
case 0:
if(mFGMoving[iFGIndex])
return;   imDataObj.style.left = imiLeft - iFGSpeed + "px";   break;   //move 1 image
  case 1:
imFGClickLR(iFGIndex,imiSize,parseInt(Math.abs(imiLeft/imiSize)+1),
imiTWBlock-parseInt(imDataCont.offsetWidth/imiSize),
iFGSpeed,1); return;   default:
imFGClickLR(iFGIndex,imiSize,
parseInt(Math.abs(imiLeft/imiSize)+parseInt(imDataCont.offsetWidth/imiSize)),
imiTWBlock-parseInt(imDataCont.offsetWidth/imiSize),
iFGSpeed,
1); return; }
break; }
case 2 :{
if (imiLeft + iFGSpeed < 0)
  switch(iFGCmd){
    //continuous movement
case 0:
if(mFGMoving[iFGIndex])
return;       imDataObj.style.left = imiLeft + iFGSpeed + "px";       break;     //move unitl next image
  case 1 :
imFGClickLR(iFGIndex,imiSize,parseInt(Math.abs(imiLeft/imiSize)),
imiTWBlock-parseInt(imDataCont.offsetWidth/imiSize),
iFGSpeed,2); return; default:
imFGClickLR(iFGIndex,imiSize,
parseInt(Math.abs(imiLeft/imiSize)-parseInt(imDataCont.offsetWidth/imiSize)),
imiTWBlock-parseInt(imDataCont.offsetWidth/imiSize),
iFGSpeed,
2); return; }
else
imDataObj.style.left = 0;   break; }
case 3 :{
if (imiTop + iFGSpeed < 0)
switch(iFGCmd){
        //continuous movement
        case 0 :
          if(mFGMoving[iFGIndex])
return; imDataObj.style.top = imiTop + iFGSpeed + "px"; break; case 1 :
imFGClickUD(iFGIndex,imiSize,parseInt(Math.abs(imiTop/imiSize)),
imiTHBlock-parseInt(imDataCont.offsetHeight/imiSize),
iFGSpeed,1); return; default :
imFGClickUD(iFGIndex,imiSize,
parseInt(Math.abs(imiTop/imiSize)-parseInt(imDataCont.offsetHeight/imiSize)),
imiTHBlock-parseInt(imDataCont.offsetHeight/imiSize),
iFGSpeed,
1);       return; }
else{
  imDataObj.style.top = 0;   return; }
break; }
case 4 :{
if (imiTop - iFGSpeed >= imDataCont.offsetHeight - imDataObj.offsetHeight)
switch(iFGCmd){
      //continuous movement
case 0 :
if(mFGMoving[iFGIndex])
return; imDataObj.style.top = imiTop - iFGSpeed + "px"; break; case 1 :
imFGClickUD(iFGIndex,imiSize,parseInt(Math.abs(imiTop/imiSize))+1,
imiTHBlock-parseInt(imDataCont.offsetHeight/imiSize),
iFGSpeed,2); return; default:
imFGClickUD(iFGIndex,imiSize,
parseInt(Math.abs(imiTop/imiSize)+parseInt(imDataCont.offsetHeight/imiSize))+1,
imiTHBlock-parseInt(imDataCont.offsetHeight/imiSize),
iFGSpeed,
2);     return; }
  }
 }
moFGTime = setTimeout("imFGMove(" + iFGIndex + "," + iFGSpeed + "," + iFGType + "," + iFGCmd + ")", 50); }
function imFGFade(iID) {
var div_Image=imGetLayer("imFGImage_"+iID); var div_ImageBack=imGetLayer("imFGImage_"+iID+"_back"); if(div_Image.style.opacity > 0.025) {
div_Image.style.opacity -= 0.025; div_ImageBack.style.opacity = 1-div_Image.style.opacity; }
else {
clearInterval(moFGTimeImg[iID]); div_Image.src = div_ImageBack.src; div_Image.style.top = div_ImageBack.style.top; div_Image.style.left = div_ImageBack.style.left; div_Image.style.opacity = 1; div_ImageBack.style.opacity = 0; }}
function imFGShow(iIndex,sImageSrc,iImageH,iImageW,sDescr,sLink,iEffect){
moFGTimeNextImg[iIndex] = ''; if(moFGNextImg[iIndex] == undefined || moFGNextImg[iIndex] == null) {
moFGNextImg[iIndex] = new Image(); }
if(moFGNextImg[iIndex].src.substr(moFGNextImg[iIndex].src.lastIndexOf('/')+1) != sImageSrc) {
moFGNextImg[iIndex] = new Image(); moFGNextImg[iIndex].onload = function(){
eval(moFGTimeNextImg[iIndex]); }; moFGTimeNextImg[iIndex] = 'imFGShow(' + iIndex + ',\'' + sImageSrc + '\',' + iImageH + ',' + iImageW + ',\'' + sDescr + '\',\'' + sLink.split('\'').join('\\\'') + '\',' + iEffect + ')'; moFGNextImg[iIndex].src = 'imagebrowser/' + sImageSrc; }
if(moFGTimeNextImg[iIndex] == '') {
var div_FGMain = imGetLayer("imFGMain_" + iIndex); var div_FGImageCont = imGetLayer("imFGImage_" + iIndex + "_cont"); var div_FGImage = imGetLayer("imFGImage_" + iIndex); var div_FGImageBack = imGetLayer("imFGImage_" + iIndex + "_back"); var div_FGDescr = imGetLayer("imFGDescr_" + iIndex); var div_FGDescrText = imGetLayer("imFGDescr_" + iIndex + "_text"); var div_FGDescrBG = imGetLayer("imFGDescr_" + iIndex + "_bg"); if (imEffectEnabled && iEffect != 0) {
if (iEffect == 1) iEffect = Math.floor(Math.random()*73) + 2; div_FGImageCont.style.filter="progid:DXImageTransform.Microsoft."+msSSTrans[iEffect]; div_FGImageCont.filters.item(0).Apply(); }
var iTop = parseInt((div_FGMain.offsetHeight-iImageH)/2); var iLeft = parseInt((div_FGMain.offsetWidth-iImageW)/2); if(sDescr != '') {
div_FGDescrText.innerHTML = sDescr; div_FGDescr.style.display = ''; div_FGDescrBG.style.height = div_FGDescrText.clientHeight + 'px'; div_FGDescr.style.height = (div_FGDescrText.clientHeight) + 'px'; div_FGDescrBG.style.filter = 'alpha(opacity=60)'; }
else {
div_FGDescr.style.display = 'none'; }
if(div_FGImage.style.display == 'none')
div_FGImage.style.display = ''; if(iEffect != 0 && !imEffectEnabled) {
div_FGImageBack.src = 'imagebrowser/' + sImageSrc; div_FGImageBack.style.top = iTop + 'px'; div_FGImageBack.style.left = iLeft + 'px'; div_FGImageBack.style.display = ''; clearInterval(moFGTimeImg[iIndex]); moFGTimeImg[iIndex]=setInterval("imFGFade("+iIndex+")", 10); }
else {
div_FGImage.style.visible = 'hidden'; div_FGImage.src = 'imagebrowser/' + sImageSrc; div_FGImage.style.top = iTop + 'px'; div_FGImage.style.left = iLeft + 'px'; div_FGImage.style.visible = 'visible'; }
if (sLink!="#") {
 div_FGMain.onclick= function onclick(event) {location = sLink};   div_FGMain.style.cursor="pointer"; } else {
    div_FGMain.onclick="";  div_FGMain.style.cursor="default"; }
if (imEffectEnabled && iEffect != 0) div_FGImageCont.filters.item(0).Play(); }}
function imFGDescrSlide(iID,direction) {
var div_Descr=imGetLayer("imFGDescr_" + iID); var pos = parseInt(div_Descr.style.bottom.substr(0,div_Descr.style.bottom.length-2)); if(pos > -div_Descr.clientHeight-10 && direction == 1) {
pos = (pos+(-div_Descr.clientHeight)/5); if(pos >= -div_Descr.clientHeight-10)
div_Descr.style.bottom = pos + 'px'; else
div_Descr.style.bottom = -div_Descr.clientHeight-10 + 'px'; }
else if(pos < 0 && direction == -1) {
pos = (pos-(-div_Descr.clientHeight)/5); if(pos <= 0)
div_Descr.style.bottom = pos + 'px'; else
div_Descr.style.bottom = '0px'; }
else
clearInterval(moFGTimeDescr[iID]); }
function imFGDescrHide(iID) {
clearInterval(moFGTimeDescr[iID]); moFGTimeDescr[iID] = setInterval('imFGDescrSlide(' + iID + ',1)',10); }
function imFGDescrShow(iID) {
clearInterval(moFGTimeDescr[iID]); moFGTimeDescr[iID] = setInterval('imFGDescrSlide(' + iID + ',-1)',10); }
function imMapSwap(oLI) {
if(oLI.className == 'imMap_closed')
oLI.className = 'imMap_open'; else
oLI.className = 'imMap_closed'; }
function imMapExpAll() {
var a = document.getElementsByTagName('li'); for(var i = 0; i < a.length; i++)
if(a[i].className == 'imMap_closed')
a[i].className = 'imMap_open'; }
function imMapCmpAll() {
var a = document.getElementsByTagName('li'); for(var i = 0; i < a.length; i++)
if(a[i].className == 'imMap_open')
a[i].className = 'imMap_closed'; }
function imSwapImg(oDiv, sImgName) {
if (sImgName != "")
oDiv.style.backgroundImage = "url(" + sImgName + ")"; else
oDiv.style.backgroundImage = ""; }
window.onload = function() {
eval(imLoadList); }

