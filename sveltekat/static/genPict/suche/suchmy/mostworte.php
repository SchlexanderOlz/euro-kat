<?php

@$mostworte = fopen("suchmy/visits.txt","r") or die ("Fehler beim Einlesen von Mostworte!");


while(!feof($mostworte)) {

     $alleworte = fgets($mostworte, 1000); 
  
     parse_str($alleworte); 
	 
	 $gesuchtAr[] = $gesucht;
} 
fclose($mostworte);


@$zmost = array_count_values($gesuchtAr);
$alpaka = count($gesuchtAr);
@arsort($zmost);


if($alpaka > $zeigeanwv){$Anzahlmeiste = $zeigeanwv;
       }
  else {$Anzahlmeiste = $alpaka;
       }


$startmost = 0;

if($alpaka > 0){ 

print "\n\t<table border=\"0\" width=\"100%\" cellpadding=\"3\" style=\"margin-top: 5px; margin-bottom: 20px;\">\n".
      "\t<tr>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Suchende, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Suchbepra, ENT_QUOTES)."</span></td>\n".
      "\t<td bgcolor=\"#".htmlentities($diefelder)."\" style=\"border: ".htmlentities($bordermass)."px solid #".htmlentities($derBorder)."\" align=\"center\"><span class=\"feldnamen\">".htmlentities($Prozente, ENT_QUOTES)."</span></td>\n".
	  "\t</tr>\n";

   while (list($sworte, $mostz) = each($zmost))if($startmost < $Anzahlmeiste){$startmost++; 

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
	   
?>