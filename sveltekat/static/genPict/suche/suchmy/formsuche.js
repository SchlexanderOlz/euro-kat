document.write(
	'<form name="formsuche" action="http://' +
		dieseDomain +
		'/suche.php" method="get" accept-charset="iso-8859-1" style="margin-bottom: 5px; margin-bottom: 5px">'
);
document.write(
	'<input type="hidden" name="auswahl" value="1"><p style="margin-top: 2px; margin-bottom: 2px">'
);
document.write(
	'<input type="text" name="meinesuche" value="Suchen..." size="14" maxlength="30" style="border: solid 1px #cccccc; color:#989898; font-style:italic; vertical-align: bottom" onblur="if(this.value == \'\') {this.value=\'Suchen...\'; this.style.color=\'#989898\'; this.style.fontStyle=\'italic\'}" onfocus="if(this.value == \'Suchen...\') {this.value=\'\'; this.style.color=\'#000000\'; this.style.fontStyle=\'normal\'}">'
);
document.write(
	'<input type="image" src="http://' +
		dieseDomain +
		'/suchmy/formsuche.gif" alt="Meine Suche" style="vertical-align: bottom; margin-left: 5px"></form>'
);
