<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html>

<head>
<title>Formular ausw&auml;hlen</title>
<link rel="stylesheet" type="text/css" href="meinesuche.css">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="Content-Language" content="de">
<meta name="robots" content="noindex,nofollow">
<meta name="Language" content="de">
</head>

<body>


<?php

include ("editsettings.php");

//------------------------------------------ HTML Titelzeile ---------------------------

print "<div class=\"headline\"><h1>Formular ausw&auml;hlen</h1></div>\n\n"; 
print "<div align=\"center\">\n\n";


//--------------------------------- Abfrage von Cookie und Session ---------------------

if(isset($_COOKIE["suchmyHeimtiere"]) and $_COOKIE["suchmyHeimtiere"] == "suchmarie" and isset($_SESSION["Username"]) and $_SESSION["Username"] == $pwusern) {

print "<a href=\"editnavi.php\" class=\"bgoldeinf\">Navigation</a> | ".
      "<a href=\"editmeiste.php\" class=\"bgoldeinf\">H&auml;ufigste Suchanfragen</a> | ".
	  "<a href=\"editletzte.php\" class=\"bgoldeinf\">Letzte Suchanfragen</a> | ".
	  "<a href=\"editsuche.php\" class=\"bgoldeinf\">Zum Editierbereich</a> | ".
	  "<a href=\"editformfeld.php\" class=\"bgoldeinf\">Suchfeld ausw&auml;hlen</a> | ".
	  "<a href=\"editaus.php\" class=\"bgoldeinf\">Ausloggen</a><br>\n<br>\n\n"; 
	  
print "<div class=\"ausgeben2\" align=\"center\">\n\n";	  

	  
print "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"1200\">\n".
      "<tr><td width=\"1200\">\n".
	  "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"800\">\n".
      "<tr>\n"."<td width=\"800\">\n".
      "<p style=\"font-family: Times New Roman; font-weight: normal; font-style:italic; font-size: 14pt; color: #AB8205; text-align: left\">\n".
      "<br>&nbsp; <br>Suchfeld zur Einbindung in HTML-Seiten</p>\n".  
	  "<p style=\"text-align: justify\">Um die Suchfunktion des Scripts auf allen Seiten Ihrer \n".
	  "Homepage <i>(Websites)</i> nutzen zu können, benötigen Sie ein kleines Formular als Suchfeld. Für die \n".
	  "Einbindung so eines kleinen Suchfeldes <i>(Formular)</i> in allen Seiten Ihrer Website stehen \n".
	  "Ihnen verschiedene Möglichkeiten offen. Drei von der Einbindung unterschiedliche Varianten möchten \n".
	  "wir Ihnen nachfolgen vorstellen, wobei die erste Variante die einfachste ist.<br><br>\n".
	  "Gleich welche der vorgestellten Varianten Sie für Ihre Suche benutzen möchten, bei allen drei Varianten \n".
	  "müssen Sie an Stelle des rot markierten Abschnitts im HTML-Code Ihre Domain eintragen. Eine andere Möglichkeit \n".
	  "besteht in der Verwendung von relativen Pfadangaben, diese müssten jedoch angepasst werden, wenn die \n".
	  "Seiten auf unterschiedlichen Ebenen liegen. Je nach Ebene würden sich daraus folgende relative \n".
	  "Pfadangaben ergeben:<br><br>\n".
	  "suche.php, ../suche.php und ../../suche.php<br><br>\n".
	  "Einfache zu managen sind hingegen absolute Pfadangaben, wie die in den nachfolgenden Beispielen \n".
	  "verwendeten. Wenn Sie eine dieser Varianten verwenden möchten, so kopieren Sie den jeweiligen \n".
	  "HTML-Code und fügen diesen an geeigneter Stelle in den Quelltext Ihrer Seiten ein. Alternativ \n".
	  "können Sie auch ein eigenes Formular verwenden.<br>\n".
	  "Die angezeigte Breite des Formulars lässt sich mit dem Wert bei size=&quot;14&quot; nach Bedarf ändern. \n".
	  "Weiterhin können der Border und andere Formatierungen innerhalb von style=\"...\" angepasst werden.<br>\n".
	  "Zur Verfügung stehen zwei Images, die bei Bedarf auch gegen eigen Buttons ausgetauscht werden können. Der \n".
	  "blau markierte Quelltext ist entsprechend dem gewählten Button zu ändern.<br><br>&nbsp;\n".
      "<font color=\"#0000ff\">suche.gif</font> &nbsp; <img src=\"../suchmy/suche.gif\" alt=\"Suche\"> &nbsp; \n".
	  "<font color=\"#0000ff\">formsuche.gif</font> &nbsp; <img src=\"../suchmy/formsuche.gif\" alt=\"Suche\">\n".
	  "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n". 
	  "&nbsp;<br><strong>Kleines Formular mit Button</strong><br><br>\n".
	  "Bei dieser Variante handelt es sich um ein einfaches HTML-Formular ohne Vorbelegung des Eingabefeldes mit \n".
	  "einem Text. Der Vorteil besteht darin, dass dieses Suchfeld immer angezeigt wird, gleich ob JavaScript im \n".
	  "Browser des Benutzers deaktiviert ist oder nicht.<br>&nbsp;</td>\n".  
	  "</tr></table>\n".  
      "</td></tr>\n".
      "<tr>\n".
	  "<td width=\"1200\" style=\"padding-bottom: 10px\">\n".	  
	  "<form name=\"formsuche1\" action=\"../suche.php\" method=\"get\" accept-charset=\"iso-8859-1\" style=\"margin-bottom: 5px; margin-bottom: 5px\">\n".
	  "<input type=\"hidden\" name=\"auswahl\" value=\"1\"><p style=\"margin-top: 2px; margin-bottom: 2px\">\n".
	  "<input type=\"text\" name=\"meinesuche\" value=\"\" size=\"14\" maxlength=\"30\" style=\"border: solid 1px #cccccc; vertical-align: bottom\">\n".
	  "<input type=\"image\" src=\"../suchmy/formsuche.gif\" alt=\"Suche\" style=\"vertical-align: bottom; margin-left: 0px\">\n".
	  "</form>\n</td>\n".  
      "</tr>\n".	  	  
      "<tr>\n".	  
	  "<td width=\"1200\" bgcolor=\"#ffffff\" style=\"border: 1px solid #cccccc\">\n".
	  "&lt;form name=&quot;formsuche&quot; action=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suche.php&quot; method=&quot;get&quot; accept-charset=&quot;iso-8859-1&quot; style=&quot;margin-bottom: 5px; margin-bottom: 5px&quot;&gt;<br>\n".
      "&lt;input type=&quot;hidden&quot; name=&quot;auswahl&quot; value=&quot;1&quot;&gt;&lt;p style=&quot;margin-top: 2px; margin-bottom: 2px&quot;&gt;<br>\n".
      "&lt;input type=&quot;text&quot; name=&quot;meinesuche&quot; value=&quot;&quot; size=&quot;14&quot; maxlength=&quot;30&quot; style=&quot;border: solid 1px #cccccc; vertical-align: bottom&quot;&gt;<br>\n".
      "&lt;input type=&quot;image&quot; src=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suchmy/formsuche.gif&quot; alt=&quot;Suche&quot; style=&quot;vertical-align: bottom; margin-left: 0px&quot;&gt;<br>\n".
      "&lt;/form&gt; </td>\n".
      "</tr>\n".
      "</table>\n";  
	  
print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";
	  
print "<table border=\"0\" width=\"1200\" cellspacing=\"0\" cellpadding=\"0\">\n".
      "<tr><td width=\"1200\">\n".
	  "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"800\">\n".
      "<tr>\n"."<td width=\"800\" style=\"padding-top: 22px\"><p style=\"text-align: justify\">\n".
	  "<strong>Formular mit Vorbelegung des Input-Feldes</strong><br><br>\n".
	  "Mit Hilfe von JavaScript lässt sich das Input-Feld eines Formulars vorbelegen, wobei die Schrift formatiert \n".
	  "werden kann. Einziger Nachteil, wurde im Browser des Nutzers JavaScript deaktiviert, ändert sich die \n".
	  "Formatierung der Schrift auch bei einer Eingabe nicht und im verwendeten Beispiel würde auch die Eingabe \n".
	  "grau und kursiv erscheinen.<br>&nbsp;</td>\n".  
	  "</tr></table>\n".  
      "</td></tr>\n".
      "<tr>\n".
	  "<td width=\"1200\" style=\"padding-bottom: 10px\">\n".
	  "<form name=\"formsuche2\" action=\"../suche.php\" method=\"get\" accept-charset=\"iso-8859-1\" style=\"margin-bottom: 5px; margin-bottom: 5px\">\n". 
      "<input type=\"hidden\" name=\"auswahl\" value=\"1\"><p style=\"margin-top: 2px; margin-bottom: 2px\">\n".
      "<input type=\"text\" name=\"meinesuche\" value=\"Suchen...\" size=\"14\" maxlength=\"30\" style=\"border: solid 1px #cccccc; color:#989898; font-style:italic; vertical-align: bottom\"\n".
      "onblur=\"if(this.value == '') {this.value='Suchen...'; this.style.color='#989898'; this.style.fontStyle='italic'}\"\n". 
      "onfocus=\"if(this.value == 'Suchen...') {this.value=''; this.style.color='#000000'; this.style.fontStyle='normal'}\">\n". 
      "<input type=\"image\" src=\"../suchmy/formsuche.gif\" alt=\"Suche\" style=\"vertical-align: bottom; margin-left: 0px\">\n".
	  "</form>\n</td>\n".  
      "</tr>\n".	  
      "<tr>\n".
	  "<td width=\"1200\" bgcolor=\"#ffffff\" style=\"border: 1px solid #cccccc\">\n".
	  "&lt;form name=&quot;formsuche&quot; action=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suche.php&quot; method=&quot;get&quot; accept-charset=&quot;iso-8859-1&quot; style=&quot;margin-bottom: 5px; margin-bottom: 5px&quot;&gt; <br>\n".
      "&lt;input type=&quot;hidden&quot; name=&quot;auswahl&quot; value=&quot;1&quot;&gt;&lt;p style=&quot;margin-top: 2px; margin-bottom: 2px&quot;&gt;<br>\n".
      "&lt;input type=&quot;text&quot; name=&quot;meinesuche&quot; value=&quot;Suchen...&quot; size=&quot;14&quot; maxlength=&quot;30&quot; style=&quot;border: solid 1px #cccccc; color:#989898; font-style:italic; vertical-align: bottom&quot; <br>\n".
      "onblur=&quot;if(this.value == '') {this.value='Suchen...'; this.style.color='#989898'; this.style.fontStyle='italic'}&quot; <br>\n".
      "onfocus=&quot;if(this.value == 'Suchen...') {this.value=''; this.style.color='#000000'; this.style.fontStyle='normal'}&quot;&gt; <br>\n".
      "&lt;input type=&quot;image&quot; src=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suchmy/formsuche.gif&quot; alt=&quot;Suche&quot; style=&quot;vertical-align: bottom; margin-left: 0px&quot;&gt;<br>\n".
      "&lt;/form&gt; </td>\n".
      "</tr>\n".
      "</table>\n";	  
	  
print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";
	  
print "<table border=\"0\" width=\"1200\" cellspacing=\"0\" cellpadding=\"0\">\n".
      "<tr><td width=\"1200\">\n".
	  "<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"800\">\n".
      "<tr>\n"."<td width=\"800\" style=\"padding-top: 22px\"><p style=\"text-align: justify\">\n".
	  "<strong>Einbindung des Formulars per JavaScript</strong><br><br>\n".
	  "Die Einbindung eines Formulars per JavaScript hat den Vorteil, dass der einzubindende Code recht kurz \n".
	  "ausfällt und den Quelltext einer HTML-Seite nicht unnötig aufbläht. Der Nachteil bei der Einbindung mit \n".
	  "Hilfe von JavaScript besteht darin, dass, wie im Beispiel ersichtlich, ein zusätzlicher Link in einem \n".
	  "NoScript-Bereich gesetzt werden muss, damit die Suche auch dann erreichbar ist, wenn im Browser des \n".
	  "Benutzers kein JavaScript aktiviert ist.<br>&nbsp;</td>\n".  
	  "</tr></table>\n".  
      "</td></tr>\n".
      "<tr>\n".
	  "<td width=\"1200\" style=\"padding-bottom: 10px\">\n".
	  "<script type=\"text/javascript\">\n".
	  "var dieseDomain = \"".htmlentities($_SERVER['HTTP_HOST'], ENT_QUOTES)."\";\n".
	  "</script><script type=\"text/javascript\" src=\"formsuche.js\"></script>\n".
      "<noscript><a href=\"".htmlentities($_SERVER['HTTP_HOST'], ENT_QUOTES)."/suche.php\">- Suchen -</a></noscript></td>\n".  
      "</tr>\n".	  
      "<tr>\n".	  
      "<td width=\"1200\" bgcolor=\"#ffffff\" style=\"border: 1px solid #cccccc\">\n".
	  "&lt;script type=&quot;text/javascript&quot;&gt;<br>\n".
      "var dieseDomain = &quot;<font color=\"#FF0000\">www.Ihre-Domain.de</font>&quot;;<br>\n".
      "&lt;/script&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suchmy/formsuche.js&quot;&gt;&lt;/script&gt;<br>\n".
      "&lt;noscript&gt;&lt;a href=&quot;http://<font color=\"#FF0000\">www.Ihre-Domain.de</font>/suche.php&quot;&gt;- Suchen -&lt;/a&gt;&lt;/noscript&gt;</td>\n".
      "</tr>\n".
      "</table>\n";	  
	  

print "\n\n<p>&nbsp; </p>\n</div>\n";

}else{

print "Sie haben keine Berechtigung!\n";
}
	  
?>


</div>
</body>
</html>
