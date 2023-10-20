<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<head>
<title>Edit- und Adminbereich: Navigation</title>
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

print "<div class=\"headline\"><h1>Edit- und Adminbereich: Navigation</h1></div>\n\n"; 
print "<div align=\"center\">\n<div class=\"ausgeben\" align=\"center\">\n\n";


//--------------------------------- Abfrage von Cookie und Session ---------------------

if(isset($_COOKIE["suchmyHeimtiere"]) and $_COOKIE["suchmyHeimtiere"] == "suchmarie" and isset($_SESSION["Username"]) and $_SESSION["Username"] == $pwusern) {

print "<a href=\"editaus.php\" class=\"braungold\">Ausloggen</a><br>\n<br>\n".
      "Zu den letzten Suchanfragen:<br>\n<br><a href=\"editletzte.php\" class=\"braungold\">- Letzte Suchanfragen</a> -<br>\n<br>&nbsp;<br>\n".
	  "Zu den h&auml;ufigsten Suchanfragen:<br>\n<br><a href=\"editmeiste.php\" class=\"braungold\">- H&auml;ufigste Suchanfragen</a> -<br>\n<br>&nbsp;<br>\n".
	  "Gesperrte Worte, Seiten und Ordner:<br>\n<br><a href=\"editsuche.php\" class=\"braungold\">- Zum Editierbereich</a> -<br>\n<br>&nbsp;<br>\n".	  
	  "Formular für Seiten ausw&auml;hlen: <br>\n<br><a href=\"editformfeld.php\" class=\"braungold\">- Suchfeld ausw&auml;hlen -</a><br>\n<br>\n";

}else{

print "Sie haben keine Berechtigung!\n";
}

print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";

	  
?>




<p>&nbsp; </p>
</div></div>
</body>
</html>
