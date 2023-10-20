<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<title>Die h&auml;ufigste Suchanfragen</title>
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

print "<div class=\"headline\"><h1>Die h&auml;ufigste Suchanfragen</h1></div>\n\n"; 
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

@$mostworte = fopen("visits.txt","r") or die ("Fehler beim Einlesen von Mostworte!");


while(!feof($mostworte)) {

     $alleworte = fgets($mostworte, 1000); 
  
     parse_str($alleworte); 
	 
	 $gesuchtAr[] = $gesucht;
} 
fclose($mostworte);


@$zmost = array_count_values($gesuchtAr);
$alpaka = count($gesuchtAr);
@arsort($zmost);


if($alpaka > $zeigeanad){$Anzahlmeisteedit = $zeigeanad;
       }
  else {$Anzahlmeisteedit = $alpaka;
       }


$startmost = 0;

if($alpaka > 0){ 

print "\n\t<table border=\"0\" width=\"100%\" cellpadding=\"3\" style=\"margin-top: 5px; margin-bottom: 20px;\">\n".
      "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Suchende, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Suchbepra, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Prozente, ENT_QUOTES)."</span></td>\n".
	  "\t</tr>\n";

   while (list($sworte, $mostz) = each($zmost))if($startmost < $Anzahlmeisteedit){$startmost++; 

	   if ($startmost % 2 != 0) {$bgcolor = $MWbgcolor1;} else {$bgcolor = $MWbgcolor2;}	
		   
	   if (strlen($sworte) < 2) {$leereworte = "<span class=\"grau-url\"><em>".htmlentities($leerEingabe, ENT_QUOTES)."</em></span>";}

		   $mostp = round($mostz *100/$alpaka, 2);
		   $mostr = sprintf("%05.2f", $mostp);
		   $mostz = sprintf("%02.0f", $mostz); 
	     

print "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($mostz, ENT_QUOTES)."</td>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($sworte, ENT_QUOTES).$leereworte."</td>\n".
      "\t<td bgcolor=\"#".htmlentities($bgcolor)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\">".htmlentities($mostr, ENT_QUOTES)." %</td>\n".
      "\t</tr>\n";
	  
unset($leereworte);         
}} 

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
