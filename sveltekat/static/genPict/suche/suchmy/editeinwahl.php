<?php

include ("editsettings.php");

$ersteswort  = $_POST["Username"];
$zweiteswort = $_POST["Userkennung"];

if($ersteswort == $pwusern and $zweiteswort == $pwunten){

session_start();

$_SESSION["Username"] = $ersteswort;
	
setcookie("suchmyHeimtiere", "suchmarie", time() + 7200, "/suchmy/");
header("HTTP/1.1 301 Moved Permanently"); 
header("Location: editnavi.php"); 	
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<title>Adminbereich: Einwahl</title>
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

print "<div class=\"headline\"><h1>Adminbereich: Einwahl</h1></div>\n\n"; 
print "<div align=\"center\">\n<div class=\"ausgeben\" align=\"center\">\n\n";



print "<form action=\"editeinwahl.php\" method=\"post\" accept-charset=\"iso-8859-1\">\n".
      "<br>Username: <br><input type=\"text\" name=\"Username\" size=\"22\"><br>\n".
	  "<br>Userpasswort: <br><input type=\"password\" name=\"Userkennung\" size=\"22\"><br>\n".
	  "<br><input type=\"Submit\" value=\"Senden\"><br>\n".
	  "</form>\n\n";

print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";

	  
?>




<p>&nbsp; </p>
</div></div>
</body>
</html>
