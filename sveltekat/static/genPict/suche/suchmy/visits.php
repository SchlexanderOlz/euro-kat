<?php

/*------------------------------------------------------------------------------------------------- 
 Eintragung nur fuer die Statistik, wobei die Hoechtzahl der Eintraege sich auf den bei merle >= 
 definierten Wert begrenzt.
 --------------------------------------------------------------------------------------------------
*/

$eintrag1 = date("d.m.Y");
$eintrag2 = date("H:i:s");
$vonwoher = gethostbyaddr($_SERVER["REMOTE_ADDR"]);
$merlin   = "suchmy/visits.txt";


@$oeffnevisits = file($merlin)  or die ("Fehler bei Merlins Visits");

$merle = count($oeffnevisits); 


if ($merle >= 1000) {$merlestart = 1;}  
	
	          else {$merlestart = 0;}

for ($startmerle = $merlestart; $startmerle < $merle; $startmerle++){

     $altevisits.= $oeffnevisits[$startmerle];
    }

$meinstring = "tag=".$eintrag1."&uhrzeit=".$eintrag2."&gesucht=".$meinesuche."&adresse=".$vonwoher;

$meinstring = preg_replace("/[^a-zA-ZäöüÄÖÜß0-9_\.:\-\&\=]/", "+", $meinstring);

$meinstring = $meinstring."\n"; 

@file_put_contents($merlin,$altevisits.$meinstring) or die ("Fehler bei neue Visits!");

?>