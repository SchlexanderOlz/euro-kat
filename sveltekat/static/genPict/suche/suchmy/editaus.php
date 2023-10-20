<?php
session_start();
session_destroy();	
setcookie("suchmyHeimtiere", "suchmarie", time() - 7200, "/suchmy/");
header("HTTP/1.1 301 Moved Permanently"); 
header("Location: editeinwahl.php"); 	

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<title>Editsuche: Ausloggen</title>
<link rel="stylesheet" type="text/css" href="meinesuche.css">
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<meta http-equiv="Content-Style-Type" content="text/css">
<meta http-equiv="Content-Language" content="de">
<meta name="robots" content="noindex,nofollow">
<meta name="Language" content="de">
</head>

<body>


<?php

//------------------------------------------ HTML Titelzeile ---------------------------

print "<div class=\"headline\"><h1>Editsuche: Ausloggen</h1></div>\n\n"; 
print "<div align=\"center\">\n<div class=\"ausgeben\" align=\"center\">\n\n";


//------------------------------------------ Nur ein Hinweis und Link ------------------

print "<a href=\"editeinwahl.php\">Noch ein Versuch?</a>\n";



print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";

	  
?>




<p>&nbsp; </p>
</div></div>
</body>
</html>
