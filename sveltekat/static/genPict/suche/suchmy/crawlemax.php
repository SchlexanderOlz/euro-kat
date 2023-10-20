<?php  


if (function_exists("date_default_timezone_set")){date_default_timezone_set("Europe/Berlin");}

include ("suchmy/editsettings.php");

$Seitennum = 1;
$countlink = $countwert; 
$startvar1 = 0;

/*-------------------------------------------------------------------------------------------------
 Kleine Zugriffskontrolle um automatisierte Suchanfragen einzuschraenken. Zuerst werden die 
 bisherigen Eintraege aus der Kontrolldatei eingelesen und ein neur Eintrag wird hinzugefuegt.
 --------------------------------------------------------------------------------------------------
*/

$ip_von = $_SERVER["REMOTE_ADDR"];
$controldatei = "suchmy/visitscontrol.txt";
$speichertime = time();
$controlzeit  = $speichertime -3600;


@$fuercontrol = fopen($controldatei,"r") or die ("Fehler bei alter Visitcontrol!");


while(!feof($fuercontrol)) {

     $eintraege = fgets($fuercontrol, 100); 
	 
     $eintraege = preg_replace("/[^a-zA-Z0-9_\.:\-\&\=]/", "+", $eintraege);	 

     parse_str($eintraege);
	 
 
     if($proStunde > $controlzeit){

        $gesamt_stunde[] = $ipad;
   
        $alterstring .= trim("proStunde=".$proStunde."&ipad=".$ipad)."\n";

unset($proStunde);
unset($ipad); 
   }
} 
fclose($fuercontrol);


$neuerstring = trim("proStunde=".$speichertime."&ipad=".$ip_von)."\n";

@file_put_contents($controldatei,$alterstring.$neuerstring) or die ("Fehler bei neuer Visitcontrol!");


@$zaehlips = array_count_values($gesamt_stunde);
$gstunden = count($gesamt_stunde); 


/*-------------------------------------------------------------------------------------------------
 Erst wenn mehr Zugriffe als vorgewaehlt in einem kurzen Zeitraum erfolgten, wird dieser Teil der 
 Zugriffskontrolle aktiv und gegebenenfalls fuer eine einzelne IP der Zugriff voruebergehend
 gesperrt.
 --------------------------------------------------------------------------------------------------
*/

if($gstunden >= 60){

		foreach ($zaehlips as $checkips => $sperrwert) {

		if($sperrwert >= 60) {$ipArray[] = trim($checkips);}		 
		} 
		}	
				
        $Anzahl = count($ipArray); 
    		
		    if($Anzahl >= 1) {
		
		        if (in_array($ip_von, $ipArray)) {$varcontrol = "off";
				   }
				   else {$varcontrol = "on"; 
				   
				   }} else {$varcontrol = "on";}     

if($varcontrol == "on"){


// --- Bringt mehr und bessere Resultate als die Verwendung der Funktion utf8_decode --------------

function UmlautINS($umlautINS){

	$sucheuml = array('Ã„','Ã¤','Ã–','Ã¶','Ãœ','Ã¼','ÃŸ',"&Auml;","&auml;","&Ouml;","&ouml;","&Uuml;","&uuml;","&szlig;");    
	$ersetzel = array('Ä','ä','Ö','ö','Ü','ü','ß','Ä','ä','Ö','ö','Ü','ü','ß');
	$guteuml  = str_replace($sucheuml,$ersetzel,$umlautINS);

	return $guteuml;
	}
  
function prgEING($meineuml){

	$eingg = array("Ä","ä","Ö","ö","Ü","ü","ß");
	$ausgg = array("C384","C3A4","C396","C3B6","C39C","C3BC","C39F");
	$umlgg = str_replace($eingg,$ausgg,$meineuml);

	return $umlgg; 
	}

function prgAUSG($meineuml){

	$eingg = array("C384","C3A4","C396","C3B6","C39C","C3BC","C39F");
	$ausgg = array("Ä","ä","Ö","ö","Ü","ü","ß");
	$umlgg = str_replace($eingg,$ausgg,$meineuml);

	return $umlgg; 
	}  
  

// --- Weitere Funktionen und einige Checks -------------------------------------------------------

function formfeld($meinesuche,$auswahl,$maxlength,$normal,$genauer,$mybutton){

if ($auswahl == 1){$markierung1 = "checked=\"checked\"";}
if ($auswahl == 2){$markierung2 = "checked=\"checked\"";}

$MyForm = "<form name=\"suchen\" action=\"".basename("suche.php")."\" method=\"get\" accept-charset=\"iso-8859-1\" style=\"margin-bottom: 10px\">\n".
          "<input type=\"text\" name=\"meinesuche\" value=\"".htmlentities($meinesuche, ENT_QUOTES)."\" maxlength=\"".htmlentities($maxlength, ENT_QUOTES)."\" size=\"32\">\n".
		  "<input type=\"submit\" value=\"".htmlentities($mybutton, ENT_QUOTES)."\" style=\"margin-left: 12px\"><br>\n".
		  "<input type=\"radio\" name=\"auswahl\" value=\"1\" ".$markierung1.">".htmlentities($normal, ENT_QUOTES)."\n".
		  "<input type=\"radio\" name=\"auswahl\" value=\"2\" ".$markierung2."><span style=\"margin-right: 25px\">".htmlentities($genauer, ENT_QUOTES)."</span>\n".
		  "</form>\n\n";

return $MyForm;
}

$checkout = "RGVyIExpbmsgb2RlciBkYXMgTG9nbyB3dXJkZSBlbnRmZXJudCBvZGVyIGJl".
            "c2No5GRpZ3QuPGJyPldpciBiaXR0ZW4gdW0gS29ycmVrdHVyLjxicj48YnI+";
			
$checkin1 = "PGRpdiBhbGlnbj0iY2VudGVyIj4KPGRpdiBjbGFzcz0iZm9ybXN1Y2hlIiBh".
            "bGlnbj0iY2VudGVyIj4KCg==";	

$checkin2 = "PGEgaHJlZj0iaHR0cDovL3d3dy5oZWltLXVuZC1oYXVzdGllcmUuZGUvdG9v".
            "bHMvdG9vbHMtdW5kLXNjcmlwdHMuaHRtIiB0YXJnZXQ9Il9ibGFuayI+PGlt".
			"ZyBzcmM9InN1Y2hteS9zdWNobXkuZ2lmIiBhbHQ9IlRvb2xzIGb8ciBXZWJt".
			"YXN0ZXIiIAp3aWR0aD0iMzEiIGhlaWdodD0iMjIiIGJvcmRlcj0iMCIgc3R5".
			"bGU9ImZsb2F0OiBsZWZ0OyBtYXJnaW46IDJweCAwcHggMHB4IDMwcHgiPjwv".
			"YT4KCg==";

$checkend = "PC9kaXY+PC9kaXY+Cg==";


function Checkbase($checkin){$caution = base64_decode($checkin);

return $caution;
}
$vorcheck = $checkin2;
	
	
// --- Der Briefkasten fuer die Werte von den Links zur naechsten Seite. --------------------------

if ($_GET["startwert"] and $_GET["countwert"]){ 

	$startvar1 = $_GET["startwert"];
	$countwert = $_GET["countwert"];
	$Seitennum = $_GET["seite"];
		
		$startvar1    = preg_replace("/[^0-9]/", "", $startvar1);	
		$countwert    = preg_replace("/[^0-9]/", "", $countwert);		
		$Seitennum    = preg_replace("/[^0-9]/", "", $Seitennum);		
}

// --- Der Briefkasten fuer die Suchanfragen. ----------------------------------------------------

if ($_GET["meinesuche"] and $_GET["auswahl"]){$postistda = "on";

        $meinesuche = $_GET["meinesuche"];
		$auswahl    = $_GET["auswahl"];
  		 
 		if(preg_match("/[<>\(\)\[\]\{\}\/\/]/", $meinesuche)){$ungueltige = "on";} 	
			
	    $meinesuche = substr($meinesuche, 0, $maxlength);	
		
		$meinesuche = preg_replace("/[^a-zA-ZäöüÄÖÜß0-9\.,:\-\!\?]/", " ", $meinesuche);	
		$auswahl    = preg_replace("/[^0-9]/", "", $auswahl);
		
		$meinesuche = prgEING($meinesuche);
			
		preg_match_all("/(\w{1,20}(,{0,1}\s{1,2}\w{2,20}|\.{1,3}\w{2,20}))|(\w{3,20}(,{0,1}\s{0,2}\.{0,3}))/", $meinesuche, $Treffer);		


// --- Kurze Treffer mit + verbinden. -------------------------------------------------------------

$susisum = count($Treffer[0]);

 for($durchlauf = 0; $durchlauf < $susisum; $durchlauf++){
 
 		if(strlen($Treffer[0][$durchlauf]) <= 4) {		           

			$Treffer[0][$durchlauf] = preg_replace("/\s/", "+", $Treffer[0][$durchlauf]);			
			$Treffer[0][$durchlauf] = trim($Treffer[0][$durchlauf]);		
                }
            else{$Treffer[0][$durchlauf] = trim($Treffer[0][$durchlauf]);
		        }
}
     		$meinesuche  =     $Treffer[0][0];
			$meinesuche .= " ".$Treffer[0][1];
			$meinesuche .= " ".$Treffer[0][2];			 
			$meinesuche .= " ".$Treffer[0][3];			
			$meinesuche .= " ".$Treffer[0][4];
			$meinesuche .= " ".$Treffer[0][5]; 
			 
			$meinesuche = trim($meinesuche);			
		   } 
      else {$meinesuche = $vorWort;
	        $auswahl    = $Vorwahl;}
			
		   $meinesuche = prgAUSG($meinesuche);	
			
/*-------------------------------------------------------------------------------------------------
 Die var $meinesuche ist ab hier bei kurzen Angaben mit + verknuepft. Und weiterhin, zaehle 
 mindestens 3 Zeichen mit oder ohne Leerraum und verwende für nachfolgende if-Anweisung.
 --------------------------------------------------------------------------------------------------
*/

$wieviel = strlen($meinesuche);

if($wieviel >= 3) {  

if ($auswahl == 1){

$stopwoerter = fopen("suchmy/stopworte.txt", "r"); 

while (!feof($stopwoerter)) {
    
	$meineworte = fgets($stopwoerter, 100);
	
	$meineworte = preg_replace("/\s/", "", $meineworte);	
    $StopArray[] = $meineworte;
} 
fclose ($stopwoerter); 


//--- Bei der normalen Suche werden die gesuchten mit der Stopwortliste verglichen. ---------------

		$ausgesucht = explode(" ", $meinesuche); 			
		$ausgesucht = preg_replace("/[+]/", " ", $ausgesucht); 	
					
		
		foreach ($ausgesucht as $ingesucht) {		
		
				if(empty($ingesucht)) {$ingesucht = false;}
				   
				   if(in_array(strtolower($ingesucht), $StopArray)) {$ingesucht = false;}
				   
				   else {$gesucht[] = trim($ingesucht);}
					   
}	   

/*-------------------------------------------------------------------------------------------------
 Verwende Anzahl der Zeichen und Anzahlwerte der Werte für if-Anweisungen. Der Namen der Variablen
 für die Anzahl wird noch einmal geandert, um Ueberschneidungen zu vermeiden.
 --------------------------------------------------------------------------------------------------
*/		   
	$meineanzahl  = $gesucht[0];
	$meineanzahl .= $gesucht[1];
	$meineanzahl .= $gesucht[2];			 
	$meineanzahl .= $gesucht[3];			
	$meineanzahl .= $gesucht[4];
	$meineanzahl .= $gesucht[5];

$anzahlwerte = strlen($meineanzahl);		   
$anzahl = count($gesucht);
$sicher = $anzahl;


// --- Bei mehr als 2 Suchbegriffen erfolgt die Suche weiter unten mit der Funktion stripos. ------

if($anzahl == 1) {$muster = "/".$gesucht[0]."/i";}
if($anzahl == 2) {$muster = "/".$gesucht[0]."(.*)".$gesucht[1]."|".$gesucht[1]."(.*)".$gesucht[0]."/i";} 
if($anzahl >= 3) {$muster = false;}   
                                                                                                                          		
}

$meinesuche = preg_replace("/[+]/", " ", $meinesuche);


if ($auswahl == 2){$muster = "/(([^a-zA-Z]{1}|\A)".$meinesuche."([^a-zA-Z]{1}|\Z))/i"; 

		$sicher = strlen($meinesuche);
		$anzahlwerte = $sicher;  
}}

// --- Die Titelzeile wird bei on ausgegeben ------------------------------------------------------

if($headlinean == on){

print "<div class=\"headline\"><h1>".htmlentities($headlinet.$meinesuche, ENT_QUOTES)."</h1></div>\n\n"; 

}
// --- Check fuers Formular -----------------------------------------------------------------------

print Checkbase($checkin1);


if (md5(Checkbase($vorcheck)) === "2118258d9d681c264f57c7d00b35eae1") {
		
    echo Checkbase($checkin2).formfeld($meinesuche,$auswahl,$maxlength,$normal,$genauer,$mybutton); 
         }
    else {echo Checkbase($checkout);
	     }

print Checkbase($checkend);


/*-------------------------------------------------------------------------------------------------
 Zweiter Beginn fuer Durchlauf, hier die Anzahl (Sicher) und die Anzahlwerte nach der Stopliste
 verwendet. Die if endet bei bzw. hinter: Ausgabe je nach Eigenschaft der Eingabe
 --------------------------------------------------------------------------------------------------
*/

if($ungueltige != "on"){

if($sicher >= 1 and $anzahlwerte >=3) { 

function alleDateien($pfad){$meinefiles = array(); 

include ("suchmy/seitenpfad.php");

  $daten=opendir($pfad);
  while (false !== ($file = readdir($daten))) 
  {
    $meine = pathinfo($file);
 	$meine = $meine["extension"];
	$meine = "e_".$meine;
	
    if ($file != "." 
        and $file  != ".." 
        and $file  != in_array($file, $filearray)
		and $pfad  != in_array($pfad, $pfadarray)		
		and $meine != in_array($meine, $endungen) 
        ){
    
        if (is_dir($pfad."/".$file)){

             $alle = alleDateien($pfad."/".$file);
             foreach ($alle as $alles){
		                 
            $meinefiles[] = $alles;}            
           }
      else {
	        $meinefiles[] = $pfad."/".$file;
           }
}}
  closedir($daten);
  return $meinefiles; 
}

$gefunden = alleDateien("."); 

    foreach($gefunden as $verwenden){
   
    $tags = get_meta_tags($verwenden);
    $robots = $tags["robots"];
 
    if ($robots){
   
        if (!stristr($robots, "noindex")){
       

@$datei = fopen($verwenden."","r") or die ("Ein Fehler ist bei Datei fopen aufgetreten!");

    while(!feof($datei)) {$zeile = fgets($datei, 1024);
                     
    $zeile = UmlautINS($zeile); 	
	 
	if (preg_match("/<title>(.*)<\/title>/i", $zeile, $title)){$meintitel = $title[1];}


if ($muster !== false){

	    if (preg_match($muster, $zeile)){
		
		         $bilder1 = stripos($zeile, "src=");
		         $bilder2 = stripos($zeile, "alt="); 
				 $ohnelks = stripos($zeile, "href=");
				 $noscrpt = stripos($zeile, "noscript");
				 $passw23 = stripos($zeile, "passwort");
		
		    if ($bilder1 === false and $bilder2 === false and $ohnelks === false and $noscrpt === false and $passw23 === false){$zeilenzahl++;
		
		         $suchwort[] = $meintitel."|o|".$zeile."|o|".$verwenden;}
}}

/*-------------------------------------------------------------------------------------------------
 Bei mehr als 2 Suchbegriffen wird nicht mehr mit einem regulaeren Ausdruck verglichen, stattdessen
 mit stripos der String durchsucht. 
 --------------------------------------------------------------------------------------------------
*/
else {
		$kontrolle1 = stripos($zeile, $gesucht[0]);
		$kontrolle2 = stripos($zeile, $gesucht[1]);
		$kontrolle3 = stripos($zeile, $gesucht[2]);

	    if ($kontrolle1 !== false and $kontrolle2 !== false and $kontrolle3 !== false){ 

		         $bilder1 = stripos($zeile, "src=");
		         $bilder2 = stripos($zeile, "alt="); 
				 $ohnelks = stripos($zeile, "href=");
				 $noscrpt = stripos($zeile, "noscript");
				 $passw23 = stripos($zeile, "passwort");
		
		    if ($bilder1 === false and $bilder2 === false and $ohnelks === false and $noscrpt === false and $passw23 === false){$zeilenzahl++;
							 
				 $suchwort[] = $meintitel."|o|".$zeile."|o|".$verwenden;}  
				 
// --- Bei mehr als 5.000 Zeilen mit Treffern wird die Schleife abgebrochen. ----------------------

}} if($zeilenzahl > 5000) {break;} 
}}}} fclose($datei); 


// --- Ab hier werden die Ergebnisse bereinigt. ---------------------------------------------------

$fuerSchleife = count($suchwort);

if($fuerSchleife > 0){

	foreach($suchwort as $eingabe){

		$input = explode("|o|", $eingabe);
		
		$suchfolge[0] = "/&amp;/";	  $ersatzfuer[0] = "und";
		$suchfolge[1] = "/&nbsp;/";	  $ersatzfuer[1] = " ";
		$suchfolge[2] = "/&quot;/";	  $ersatzfuer[2] = " ";
	    $suchfolge[3] = "/&;/";		  $ersatzfuer[3] = "und";
     
		
		$input = preg_replace($suchfolge, $ersatzfuer, $input);

			$inputtitel = $input[0];
			$inputtitel = trim($inputtitel);

			$input1 = preg_replace("/<title>/i", "", $input[1]);
			$input1 = preg_replace("/<\/title>/i", "", $input1);  
			$input1 = trim($input1);
			$input1 = strip_tags($input1);

			$input2 = substr($input[2], 2);  
			$input2 = trim($input2); 

	if(preg_match("/[>]/", $input1)){ 
	
	            $derfund = preg_split("/[>]/", $input1); 
                $input1 = $derfund[1];}
				
/*-------------------------------------------------------------------------------------------------
 Oberhalb: Seitenpfad minus 2 bei input2, weiterhin darf der Inputtext nicht gleich != dem 
 Inputtitel sein und der Imputtext muss wenigstens 7 Zeichen haben. Nachfolgend Reinigung von 
 PHP-Resten. 
 --------------------------------------------------------------------------------------------------
*/

	if($input1 != $inputtitel and strlen($input1) > 6) {
	
	if(preg_match("/[;\$\(\)\{\}\=\/\/]|(print(\s{0,8}\"{1}|\s{0,8}\'{1}))|(echo(\s{0,8}\"{1}|\s{0,8}\'{1}))/", $input1) or preg_match("/[;\$]/", $inputtitel)){$input1 = false;} 	
	
	    else{$inputtitel = preg_replace("/[\"\']/", " ", $inputtitel);
		         $input1 = preg_replace("/[\"\']/", " ", $input1);
		
		     $inputall[] = "diese=".$input2."&titelei=".$inputtitel."|o|&anhang=".$input1;}
}}}

// --- Mit Hilfe der nachfolgenden Funktion werden mehrere Werte einer Seite zusammengefuegt. -----

$fuerFunction = count($inputall);

function Sortierung($inputarry) {

$meinarry = array();
$reinarry = array();

	foreach ($inputarry as $inhalt){ 
	
	parse_str($inhalt); 
		
    $anhangzwei .= $anhangeins." ... ";	
	
	if (in_array($diese, $meinarry)) {
	
	            $meinarry[] = $diese; 
                $reinarry[] = "diese_urls=".$diese."&diese_titel=".$titelei."&anhangzwei=".$anhang." ... ".$anhangzwei; 				
				$anhangeins = $anhang;

	            }	
	      else {$meinarry[] = $diese;
	  		    $reinarry[] = "diese_urls=".$diese."&diese_titel=".$titelei."&anhangzwei=".$anhang;				
				$anhangeins = $anhang;
				
				unset($anhangzwei);
			   }
			   
} return $reinarry;
}

/*-------------------------------------------------------------------------------------------------
 Zuerst werden Schluessel und Werte in zwei Array getrennt, danach wieder wieder mit array_combine 
 in einem assoziierten Array vereint und mit einer Funktion nach der Menge der Werte sortiert. 
 --------------------------------------------------------------------------------------------------
*/

if ($fuerFunction > 0) {
  
$inSchleife = (Sortierung($inputall));

	foreach ($inSchleife as $meinInhalt){
	
	    parse_str($meinInhalt);                  

		$inputurls[]  = $diese_urls;
	    $inputtext[]  = $diese_titel.$anhangzwei;	
	}

$vorschleife = array_combine($inputurls, $inputtext);

function Vergleich($alpha, $beta) {

	if (strlen($alpha) == strlen($beta)) {return 0;}
	if (strlen($alpha) < strlen($beta))  {return 1;} else {return-1;}
	   
}       uasort($vorschleife, "Vergleich");        


// --- Die die Schluessel (Pfade) und nach Wertemenge sortierten Werte werden zusammengefuegt. ----

foreach($vorschleife as $einrewinder => $meinrewinder){

        $endschleife[] = $einrewinder."|o|".$meinrewinder;
}}

// --- Ausgabe je nach Eigenschaft der Eingabe. ---------------------------------------------------

print "<div align=\"center\">\n<div class=\"ausgeben\" align=\"left\">\n\n";

}       else {echo "<div align=\"center\">\n<div class=\"ausgeben\" align=\"left\">\n\n";


        if($postistda == "on" and $wieviel < 3) {echo "<p align=\"center\">".$Eingzuwenig."<br><br>";}


}}   else {echo "<div align=\"center\">\n<div class=\"ausgeben\" align=\"center\">\n\n".$WarnungSond."<br><br>";}


/*-------------------------------------------------------------------------------------------------
 Beim ersten Seitenaufruf werden die Tabellen mit den letzten Suchanfragen oder mit den haeufigsten 
 Suchanfragen eingeblendet, oder auch nicht.
 --------------------------------------------------------------------------------------------------
*/

$trefferunten = count($endschleife);

if($zeilenzahl > 0){

echo htmlentities($insgesamt.$trefferin.$trefferunten.$treseiten, ENT_QUOTES)."<br><br>"; 
}

else {if($postistda != "on"){

	if($tablastvisits == on){echo $dieletztens;

		include ("suchmy/lastvisits.php");
	}

	if($tabmostworte == on){echo $diehaeufigs;
			 
		include ("suchmy/mostworte.php");
	}
}}

// --- Titel, Links und Text sortieren und Text auf Laenge mit ganzen Woertern am Ende kuerzen. ---

if($trefferunten > 0){

    for ($lauf = $startvar1; $lauf < $countwert; $lauf++){
	
    if($endschleife[$lauf]){

		$output = explode("|o|", $endschleife[$lauf]);

		$outputlink  = $output[0];
		$outputtitel = $output[1];
		$outputtext  = $output[2];
		$outputtext .= $output[3];
		$outputtext .= $output[4];		

    if (strlen($outputtext) > $textlaenge){		
		$laengevon   = strpos($outputtext, " ", $textlaenge);
        $outputtexte = substr($outputtext, 0, $laengevon);
		
		if($laengevon > 2){$outputtexte = substr($outputtext, 0, $laengevon);}
		
		else {$outputtexte = $outputtext;}}
		else {$outputtexte = $outputtext;}

	
	$endung  = pathinfo($outputlink);
	$endung2 = $endung["extension"];
	$endung3 = str_replace("html","htm",$endung2);

	$suchenach  = array("htm","php","txt");
	$ersetzemit = array("HTML","PHP","TXT");
	$dateityp   = str_replace($suchenach,$ersetzemit,$endung3);
	


if ($auswahl == 1){
	
if ($anzahl >= 1 and $anzahl <= 4){

	if($anzahl == 1){$suchmuster_f = "/".$gesucht[0]."/i";}

	elseif($anzahl == 2){$suchmuster_f = "/".$gesucht[0]."|".$gesucht[1]."/i";}
	elseif($anzahl == 3){$suchmuster_f = "/".$gesucht[0]."|".$gesucht[1]."|".$gesucht[2]."/i";}
	elseif($anzahl == 4){$suchmuster_f = "/".$gesucht[0]."|".$gesucht[1]."|".$gesucht[2]."|".$gesucht[3]."/i";}
	
	else {echo "Ein Fehler bei der Auswahl für preg_match_all trat auf!";}

	preg_match_all($suchmuster_f, $outputtitel, $ersatztitel);
	preg_match_all($suchmuster_f, $outputtexte, $ersetzungen);
 

	$ersatztitel = array_unique($ersatztitel[0]);
	$ersetzungen = array_unique($ersetzungen[0]);
	$titelzahl   = count($ersatztitel);
	$textzahl    = count($ersetzungen);


    for ($tsuchlauf = 0; $tsuchlauf < $titelzahl; $tsuchlauf++){   
	
    $outputtitel  = str_replace($ersatztitel[$tsuchlauf], "<span class=\"treffertitel\">".htmlentities($ersatztitel[$tsuchlauf], ENT_QUOTES)."</span>", $outputtitel);	
}
	
    for ($suchlauf = 0; $suchlauf < $textzahl; $suchlauf++){   
		
    $outputtexte  = str_replace($ersetzungen[$suchlauf], "<span class=\"treffertext\">".htmlentities($ersetzungen[$suchlauf], ENT_QUOTES)."</span>", $outputtexte);
}} 

	else {echo "Ein Fehler bei der Auswahl für preg_match_all trat auf! Die Anzahl ist kleiner 1 oder groesser 4.<br><br>";}

}

if ($auswahl == 2){
			
	preg_match($muster, $outputtitel, $ersatztitel);
	preg_match($muster, $outputtexte, $ersetzungen);

	$outputtitel  = str_ireplace($meinesuche, "<span class=\"treffertitel\">".htmlentities($ersatztitel[0], ENT_QUOTES)."</span>", $outputtitel);
	$outputtexte  = str_ireplace($meinesuche, "<span class=\"treffertext\">".htmlentities($ersetzungen[0], ENT_QUOTES)."</span>", $outputtexte);
					
}


	if (strlen($outputtext) < 48){$kommentar = " ... Kein weiterer Kommentar zum Thema ".$meinesuche;} 

		else {$kommentar = "  ...";}

	if (is_file($outputlink)){
	
		$dateigro  = filesize($outputlink);
        $dateigro2 = $dateigro/1024;	
		
	echo "<p><a class=\"braungold\" href=\"http://".htmlentities($meineDomain, ENT_QUOTES)."/".htmlentities($outputlink, ENT_QUOTES)."\">".$outputtitel."</a><br>".$outputtexte.htmlentities($kommentar, ENT_QUOTES)."<br>\n".
    "<span class=\"grau-url\"><strong>Seite: </strong>... » ".htmlentities($outputlink, ENT_QUOTES)." - Dateityp: ".htmlentities($dateityp, ENT_QUOTES)." - Gr&ouml;&szlig;e: ".htmlentities(round($dateigro2, 2), ENT_QUOTES)." KB<br>\n".
    "<strong>Letzte Aktualisierung:</strong> ".htmlentities(date("d. F Y", filemtime($outputlink)), ENT_QUOTES)." um ".htmlentities(date("H:i", filemtime($outputlink)), ENT_QUOTES)." Uhr</span></p>\n".
	$mitoderohne."\n";
	}
	else {echo "Ein Fehler trat auf!";
	}
}}}

else {if($wieviel >= 3){echo $nochnichts;}}


// --- Ab hier werden die Links zur naechsten Seite aufbereitet. ----------------------------------

if($seitenlinks == on){

	$linkzahl  = $trefferunten / $countlink;
	$linkwerte = $countlink;
	$startvar2 = 0;


if($trefferunten > $countlink) {echo "<p align=\"center\">".htmlentities($weitereErg, ENT_QUOTES)." \n";

    $meinesuche = str_replace(" ","+",$meinesuche);


    for ($luise = 0; $luise < $linkzahl; $luise++){$Seite = $luise +1;

    if($Seitennum != $Seite){

    echo "<a class=\"blaettern\" href=\"".htmlentities("suche.php?seite=".$Seite."&meinesuche=".$meinesuche."&auswahl=".$auswahl."&startwert=".$startvar2."&countwert=".$linkwerte, ENT_QUOTES)."\">".htmlentities($Seite, ENT_QUOTES)." </a>\n";
}
    else {echo htmlentities($Seite, ENT_QUOTES)." \n";}

$startvar2 = $startvar2 + $countlink; 
$linkwerte = $linkwerte + $countlink;
}}} 

include ("suchmy/visits.php");

print "\n</div></div>\n";

}else {echo $vorderIP.$ip_von.$nachderIP;}
?>

