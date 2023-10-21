<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<title>Die letzten Suchanfragen</title>
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

print "<div class=\"headline\"><h1>Die letzten Suchanfragen</h1></div>\n\n"; 
print "<div align=\"center\">\n\n";


//--------------------------------- Abfrage von Cookie und Session ---------------------

if(isset($_COOKIE["suchmyHeimtiere"]) and $_COOKIE["suchmyHeimtiere"] == "suchmarie" and isset($_SESSION["Username"]) and $_SESSION["Username"] == $pwusern) {

print "<a href=\"editnavi.php\" class=\"bgoldeinf\">Navigation</a> | ".
      "<a href=\"editmeiste.php\" class=\"bgoldeinf\">H&auml;ufigste Suchanfragen</a> | ".
	  "<a href=\"editletzte.php\" class=\"bgoldeinf\">Letzte Suchanfragen</a> | ".
	  "<a href=\"editsuche.php\" class=\"bgoldeinf\">Zum Editierbereich</a> | ".
	  "<a href=\"editformfeld.php\" class=\"bgoldeinf\">Suchfeld ausw&auml;hlen</a> | ".
	  "<a href=\"editaus.php\" class=\"bgoldeinf\">Ausloggen</a><br>\n<br>\n\n"; 
	  
print "<div class=\"ausgeben\" align=\"center\">\n\n";	  


@$lastvisits = fopen("visits.txt","r") or die ("Fehler beim Einlesen von Lastvisits!");


while(!feof($lastvisits)) {

     $allvisits = fgets($lastvisits, 500); 
  
     parse_str($allvisits); 
	 
	 $tageszeit[] = $tag." |o| ".substr($uhrzeit, 0, 5)." |o| ".$gesucht;
	 
unset($gesucht);	 
} 
fclose($lastvisits);


$reversezeit  = array_reverse($tageszeit); 
$alpakaletzte = count($tageszeit);

if($alpakaletzte > $zeigeanad){$Anzahlletzteedit = $zeigeanad;
       }
  else {$Anzahlletzteedit = $alpakaletzte;
       }
	   

print "\n\t<table border=\"0\" width=\"100%\" cellpadding=\"3\" style=\"margin-top: 5px; margin-bottom: 20px;\">\n".
      "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($dasDatum, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($dieseZeit, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Sbegriffe, ENT_QUOTES)."</span></td>\n".
	  "\t</tr>\n";

for ($startlast = 0; $startlast < $Anzahlletzteedit; $startlast++){

       $teiletage = explode("|o|", $reversezeit[$startlast]);

	   if ($startlast % 2 != 0) {$bgcolor = $LVbgcolor1;} else {$bgcolor = $LVbgcolor2;}
	   
	   if (strlen($teiletage[2]) < 3) {$leereworte = "<span class=\"grau-url\"><em>".htmlentities($leerEingabe, ENT_QUOTES)."</em></span>";}

print "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($teiletage[0], ENT_QUOTES)."</td>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($teiletage[1], ENT_QUOTES)."</td>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($teiletage[2], ENT_QUOTES).$leereworte."</td>\n".
      "\t</tr>\n";  
	  
unset($leereworte); 
    }
	
print "\t</table>\n\n";	
print "\n\n<p>&nbsp; </p>\n</div>\n";	

}
else{

print "Sie haben keine Berechtigung!\n\n";
}

  
?>


</div>
</body>
</html>
