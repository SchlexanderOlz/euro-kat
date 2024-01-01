function addScrollers() {
	// code each scroller as follows:
	// startScroll('id of scroller div','content of scroller');
	startScroll(
		'myscroller',
		'<p><a href="http://javascript.about.com/">Focus on JavaScript</a> has JavaScript tutorials, help pages, and lots of <b>free scripts</b>.</p><p><a href="http://www.felgall.com/">Ask Felgall</a> for help with anything to do with computers.</p><p><a href="http://about.com/">About.com</a> - the ultimate guide directed information resource on the web.</p>'
	);
	startScroll('twoscroll', '<p>Yet another scroller!</p>');
}

var speed = 15; // scroll speed (bigger = faster)
var dR = false; // reverse direction

// Vertical Scroller Javascript
// copyright 24th September 2005, by Stephen Chapman
// permission to use this Javascript on your web page is granted
// provided that all of the code below (as well as these
// comments) is used without any alteration
var step = 2;
function objWidth(obj) {
	if (obj.offsetWidth) return obj.offsetWidth;
	if (obj.clip) return obj.clip.width;
	return 0;
}
function objHeight(obj) {
	if (obj.offsetHeight) return obj.offsetHeight;
	if (obj.clip) return obj.clip.height;
	return 0;
}
function scrF(i, sH, eH) {
	var x = parseInt(i.top) + (dR ? step : -step);
	if (dR && x > sH) x = -eH;
	else if (x < 2 - eH) x = sH;
	i.top = x + 'px';
}
function startScroll(sN, txt) {
	var scr = document.getElementById(sN);
	var sW = objWidth(scr) - 6;
	var sH = objHeight(scr);
	scr.innerHTML =
		'<div id="' +
		sN +
		'in" style="position:absolute; left:3px; width:' +
		sW +
		';">' +
		txt +
		'</div>';
	var sTxt = document.getElementById(sN + 'in');
	var eH = objHeight(sTxt);
	sTxt.style.top = (dR ? -eH : sH) + 'px';
	sTxt.style.clip = 'rect(0,' + sW + 'px,' + eH + 'px,0)';
	setInterval(function () {
		scrF(sTxt.style, sH, eH);
	}, 1000 / speed);
}
window.onload = addScrollers;
