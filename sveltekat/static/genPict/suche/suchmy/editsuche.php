<?php session_start(); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<title>Editsuche: Dateien, Ordner und Stopworte</title>
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

print "<div class=\"headline\"><h1>Editsuche: Dateien, Ordner und Stopworte</h1></div>\n\n"; 
print "<div align=\"center\">\n\n";


//--------------------------------- Abfrage von Cookie und Session ---------------------

if(isset($_COOKIE["suchmyHeimtiere"]) and $_COOKIE["suchmyHeimtiere"] == "suchmarie" and isset($_SESSION["Username"]) and $_SESSION["Username"] == $pwusern) {

print "<a href=\"editnavi.php\" class=\"bgoldeinf\">Navigation</a> | ".
      "<a href=\"editmeiste.php\" class=\"bgoldeinf\">H&auml;ufigste Suchanfragen</a> | ".
	  "<a href=\"editletzte.php\" class=\"bgoldeinf\">Letzte Suchanfragen</a> | ".
	  "<a href=\"editsuche.php\" class=\"bgoldeinf\">Zum Editierbereich</a> | ".
	  "<a href=\"editformfeld.php\" class=\"bgoldeinf\">Suchfeld ausw&auml;hlen</a> | ".
	  "<a href=\"editaus.php\" class=\"bgoldeinf\">Ausloggen</a><br>\n<br>\n\n"; 
	  
print "<div class=\"ausgeben\" align=\"left\">\n\n";

	  
//--------------------------- gesperrte Seiten------------------------------------------

$datei1 = "gsseiten.txt";
	  
if($_POST["gesseite"]){$gespseite = $_POST["gesseite"];

    $gespseite = preg_replace("/[^a-zA-ZäöüÄÖÜß0-9_\.\-\s]/", " ", $gespseite);

    $teile1 = explode("\n", $gespseite);
    $teile1 = array_unique($teile1);
	sort($teile1);

    foreach($teile1 as $teileauf1){$teileauf1 = trim($teileauf1);
	
	if (empty($teileauf1)){echo "!!!-".$teileauf1; $teileauf1 = false;}
	
	    else {$fuegezusammen1 .= $teileauf1."\n";}}  
		
		$fuegezusammen1 = preg_replace("/$\s/", "", $fuegezusammen1);
		
	
$schreibe1 = fopen($datei1,"w") or die ("Ein Fehler trat beim Schreiben von gsseiten.txt  auf!");
fputs($schreibe1, $fuegezusammen1);
fclose($schreibe1);	

}
  
//-------	

if (file_exists($datei1)){  

$daten1 = file($datei1);
$stand1 = count($daten1);

$oeffne1 = fopen($datei1,'r') or die ("Ein Fehler trat beim Einlesen von gsseiten.txt auf!");;
$einlesen1 = true;

while($einlesen1){$einlesen1 = fgets($oeffne1, 200);

      $eingelesen1 .= $einlesen1;

}fclose($oeffne1); 

 } else {echo "Die Datei gsseiten.txt ließ sich nicht oeffnen oder wird erst angelegt.<br><br>\n";}


//------

print "Nachfolgend gesperrte Seiten:<br><br>".
	  "Aktuell sind ".$stand1." in der Liste enthalten."; 


print "<form name=\"eintragseiten\" method=\"post\" action=\"editsuche.php\" accept-charset=\"iso-8859-1\">".
      "<textarea name=\"gesseite\" cols=\"42\" rows=\"10\">".$eingelesen1."</textarea><br><br>".
      "<input type=\"submit\" value=\"Eintragen\">".
      "</form>";
  

print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";


//----------------------------- gesperrte Ordner ----------------------------------------

$datei2 = "gsordner.txt";

	  
if($_POST["gesordner"]){$gespordner = $_POST["gesordner"];

    $gespordner = preg_replace("/[^a-zA-ZäöüÄÖÜß0-9_\.\-\s\/]/", " ", $gespordner);

    $teile2 = explode("\n", $gespordner);
    $teile2 = array_unique($teile2);
	sort($teile2);  

    foreach($teile2 as $teileauf2){$teileauf2 = trim($teileauf2);
	
	if (empty($teileauf2)){echo "!!!-".$teileauf2; $teileauf2 = false;}
	
	    else {$fuegezusammen2 .= $teileauf2."\n";}}  
		
		$fuegezusammen2 = preg_replace("/$\s/", "", $fuegezusammen2);
		
	
$schreibe2 = fopen($datei2,"w") or die ("Ein Fehler trat beim Schreiben von gsordner.txt auf!");
fputs($schreibe2, $fuegezusammen2);
fclose($schreibe2);	

}
  
//-------	
if (file_exists($datei2)){

$daten2 = file($datei2);
$stand2 = count($daten2);

$oeffne2 = fopen($datei2,"r") or die ("Ein Fehler trat beim Einlesen von gsordner.txt auf!");
$einlesen2 = true;

while($einlesen2){$einlesen2 = fgets($oeffne2, 200);

      $eingelesen2 .= $einlesen2;

}fclose($oeffne2); 

 } else {echo "Die Datei gsordner.txt ließ sich nicht oeffnen oder wird erst angelegt.<br><br>\n";}
//------

print "Gesperrte Ordner:<br><br>".
	  "Aktuell sind ".$stand2." in der Liste enthalten."; 


print "<form name=\"eintragordner\" method=\"post\" action=\"editsuche.php\" accept-charset=\"iso-8859-1\">".
      "<textarea name=\"gesordner\" cols=\"42\" rows=\"10\">".$eingelesen2."</textarea><br><br>".
      "<input type=\"submit\" value=\"Eintragen\">".
      "</form>";
  

print "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">\n";


//------------------- Liste mit Stopworten ----------------------------------------------


$datei3 = "stopworte.txt";
	  
if($_POST["stopworte"]){$stopwort = $_POST["stopworte"];

    $stopwort = preg_replace("/[^a-zA-ZäöüÄÖÜß0-9\.\s]/", " ", $stopwort);

    $teile3 = explode("\n", $stopwort);
    $teile3 = array_unique($teile3);
	sort($teile3);

    foreach($teile3 as $teileauf3){$teileauf3 = trim($teileauf3);
	
	if (empty($teileauf3)){echo "!!!-".$teileauf3; $teileauf3 = false;}
	
	    else {$fuegezusammen3 .= $teileauf3."\n";}}  
		
		$fuegezusammen3 = preg_replace("/$\s/", "", $fuegezusammen3);
		
	
$schreibe3 = fopen($datei3,"w") or die ("Ein Fehler trat beim Schreiben von Stopworten auf!");
fputs($schreibe3, $fuegezusammen3);
fclose($schreibe3);	

}
  
//-------	
$daten3 = file($datei3);
$stand3 = count($daten3);

$oeffne3 = fopen($datei3,"r") or die ("Ein Fehler trat beim Einlesen von Stopworten auf!");;
$einlesen3 = true;

while($einlesen3){$einlesen3 = fgets($oeffne3, 100);

      $eingelesen3 .= $einlesen3;

}fclose($oeffne3); 


//------

print "Nachfolgend sehen Sie eine Liste mit bisher gespeicherten Stopwörtern, die bei der normalen Suche nicht mit \n".
      "berücksichtigt werden. Sie können diese Liste editieren, in dem Sie einzelne Wörter hinzufügen oder aus der Liste löschen.\n".
	  "Diese Liste hat auf die Suchoption \"Genauer Wortlaut\" keinen Einfluss.<br><br>\n".
	  "Aktuell sind ".$stand3." in der Liste enthalten.\n"; 


print "<form name=\"eintragung\" method=\"post\" action=\"editsuche.php\" accept-charset=\"iso-8859-1\">".
      "<textarea name=\"stopworte\" cols=\"28\" rows=\"18\">".$eingelesen3."</textarea><br><br>".
      "<input type=\"submit\" value=\"Eintragen\">".
      "</form>";
  
print "\n\n<p>&nbsp; </p>\n</div>\n";
  
}else{

print "Sie haben keine Berechtigung!\n";
}

	  
?>

</div>
</body>
</html>
