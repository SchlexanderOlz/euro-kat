<?php

@$lastvisits = fopen("suchmy/visits.txt","r") or die ("Fehler beim Einlesen von Lastvisits!");


while(!feof($lastvisits)) {

     $allvisits = fgets($lastvisits, 500); 
  
     parse_str($allvisits); 
	 
	 $tageszeit[] = $tag." |o| ".substr($uhrzeit, 0, 5)." |o| ".$gesucht;
	 
unset($gesucht);	 
} 
fclose($lastvisits);


$reversezeit = array_reverse($tageszeit); 
$alpakaletzte = count($tageszeit);

if($alpakaletzte > $zeigeanwv){$Anzahlletzte = $zeigeanwv;
       }
  else {$Anzahlletzte = $alpakaletzte;
       }


print "\n\t<table border=\"0\" width=\"100%\" cellpadding=\"3\" style=\"margin-top: 5px; margin-bottom: 20px;\">\n".
      "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($dasDatum, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($dieseZeit, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Sbegriffe, ENT_QUOTES)."</span></td>\n".
	  "\t</tr>\n";

for ($startlast = 0; $startlast < $Anzahlletzte; $startlast++){

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
	
?>


