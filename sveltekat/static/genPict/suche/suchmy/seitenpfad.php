<?php  
/*-------------------------------------------------------------------------------------------------
 Im nachfolgenden Array entsprechend dem Muster alle Endungen von Dateien eintragen, die bei der 
 Suche nicht zu beruecksichtigen sind. Die Eintragung hat auf das Ergebis keinen Einfluss, verkuerzt 
 jedoch die Ladezeiten zum Teil erheblich. Der Zusatz e_ ist erforderlich, um Ordner (ohne Endung) 
 einen Wert fuer die nicht vorhandene Endung in der zugehoerigen Funktion zu geben, der groesser 
 Null ist. Die Eintragungen sind mit einem Komma abzuschliessen, nur beim letzten Eintrag entfaellt 
 das Komma.
 --------------------------------------------------------------------------------------------------
*/
$endungen = array(

"e_htaccess",
"e_css", 
"e_jpg", 
"e_gif",  
"e_png",
"e_xml",
"e_pdf",
"e_txt",
"e_dat",
"e_js",
"e_CSS", 
"e_JPG", 
"e_GIF",  
"e_PNG",
"e_XML",
"e_PDF",
"e_TXT",
"e_DAT",
"e_JS");


/*--- Hier werden die gesperrten Seiten eingelesen ---*/

$meinegsseiten = fopen("suchmy/gsseiten.txt", "r"); 

while (!feof($meinegsseiten)) {
    
	$meineseiten = fgets($meinegsseiten, 200);
	
	$meineseiten = preg_replace("/\s/", "", $meineseiten);	
    $filearray[] = $meineseiten;
} 
fclose ($meinegsseiten); 
 

/*--- Hier werden die gesperrten Ordner eingelesen ---*/


$meinegsordner = fopen("suchmy/gsordner.txt", "r"); 

while (!feof($meinegsordner)) {
    
	$meineordner = fgets($meinegsordner, 200);
	
	$meineordner = preg_replace("/\s/", "", $meineordner);	
    $pfadarray[] = "./".$meineordner;
} 
fclose ($meinegsordner); 

?>