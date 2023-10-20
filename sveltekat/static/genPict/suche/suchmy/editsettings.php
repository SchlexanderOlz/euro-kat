<?php  

// ---- Hier die eigene Standard-Domain eintragen. ------------------------------------------------

$meineDomain = "www.hjfhenze.de";

/*-------------------------------------------------------------------------------------------------
 Hier sollten Sie einen sicheren Usernamen und eine Userkennung statt admin als Passwoerter waehlen.
 Zur Erprobung koennen Sie sich jedoch erst einmal mit dem Wort admin einloggen. 
 --------------------------------------------------------------------------------------------------
*/
$pwusern = "admin";
$pwunten = "admin";

/*-------------------------------------------------------------------------------------------------
 Textlaenge in Zeichen der angezeigten Treffer. Die Abrundung erfolgt immer auf ganzen Woertern, 
 wodurch die real angezeigte Textlaenge sich um einige Zeichen erhoeht.
 --------------------------------------------------------------------------------------------------
*/
$textlaenge  = 168;

// ---- Weitere Werte -----------------------------------------------------------------------------

$countwert   =  20;              // --- Anzahl der anzuzeigenden Ergebnisse, zB. 10, 15 oder 20.
$Vorwahl     =   1;              // --- Vorbelegung für Radiobuttons 1 Normal | 2 Genauer Wortlaut
$maxlength   =  58;              // --- Maximale Anzahl der Zeichen (Textlaenge) fuer die Eingabe. 

/*-------------------------------------------------------------------------------------------------
 Mit nachfolgenden Variablen koennen Sie die Titelleiste (headlinean), die Links zur naechsten
 Seite (seitenlinks) sowie die Tabellen fuer die letzten Suchanfragen (tablastvisits) und fuer die 
 haeufigsten Suchanfragen (tabmostworte) mit "on" einblenden oder mit "off" ausblenden.
 --------------------------------------------------------------------------------------------------
*/
$headlinean    = "on";
$seitenlinks   = "on";
$tablastvisits = "on";
$tabmostworte  = "on";  //off


// ---- Border und Farben fuer Tabellen -----------------------------------------------------------

$zeigeanwv  = 12;               // Anzahl der anzuzeigenden Zellen untereinander fuer Ausgabe. 
$zeigeanad  = 50;               // Anzahl der anzuzeigenden Zellen untereinander im Adminbereich.
$bordermass =  1;               // Border in px, hier ohne px eintragen.
$derBorder  = "ffffff";         // Hexadezimalwerte der Farben ohne vorgestellte # Raute eingeben.
$diefelder  = "D7D5B3";         // Farbe fuer Felder der Feldnamen.
$LVbgcolor1 = "F2F1E6";         // Farbe 1 und Farbe 2 jeweils im Wechsel der Zellen.
$LVbgcolor2 = "EAE9D7";
$MWbgcolor1 = "EAE9D7";
$MWbgcolor2 = "F2F1E6";	

/*-------------------------------------------------------------------------------------------------
 Nachfolgender Satz erscheint zusammengesetzt über den Treffern. Leerzeichen sind " offen zu lassen.
 Beispiel: Insgesamt: Es wurden 17 Ergebnisse gefunden.
 --------------------------------------------------------------------------------------------------
*/
$insgesamt = "Insgesamt: ";
$trefferin = " Es wurden ";
$treseiten = " Ergebnisse gefunden.";

// ---- Beschriftung des Formulars. ---------------------------------------------------------------

$normal   = "Normal";	             // RadioButton
$genauer  = "Genauer Wortlaut";      // RadioButton
$mybutton = "Suchen";	             // SendeButton

// ---- Weitere Beschriftungen fuer Tabellen, Hinweise und Warnungen. -----------------------------

$headlinet   = "Sie suchten nach: ";
$dieletztens = "Die letzten Suchanfragen:";
$diehaeufigs = "Die h&auml;ufigsten Suchanfragen:";

$nochnichts  = "Nichts gefunden?<br><br>".
               "Unser Tipp: Beschr&auml;nken Sie die Anzahl der Suchbegriffe, vermeiden Sie die ".
			   "Eingabe von Sonderzeichen und pr&auml;zisieren Sie gegebenenfalls Ihre Suchanfrage.";
			   
$weitereErg  = "Weitere Ergebnisse:";     // Erscheint ueber den Links zur naechsten Seite.
$leerEingabe = "Keine Eingabe erfolgt!";  // Var fuer mostworte.php

$WarnungSond = "Es wurden ung&uuml;ltige Sonderzeichen eingegeben!";
$Eingzuwenig = "Die Anzahl der eingegebenen Zeichen war zu gering!";

$Suchende  = "Suchende";                  // In der Tabelle der haeufigsten Suchbegriffe
$Suchbepra = "Suchbegriffe und Phrasen";
$Prozente  = "Prozent";

$dasDatum  = "Datum";                     // In der Tabelle der letzten Suchanfragen
$dieseZeit = "Uhrzeit";
$Sbegriffe = "Suchbegriffe";

// ---- Wird nur im Fall einer Spam-Attacke ausgegeben. -------------------------------------------

$vorderIP  = "Von der von Ihnen benutzten IP-Adresse "; 
$nachderIP = " kamen innerhalb kurzer Zeit sehr viele, eventuell automatisierte Suchanfragen. Aus ".
             "diesem Grund deaktivieren wir vor&uuml;bergehend die Suchfunktion. Gern k&ouml;nnen ".
			 "Sie diese Seite zu einem sp&auml;teren Zeitpunkt erneut besuchen.";

/*-------------------------------------------------------------------------------------------------
 Als Alternative kann eine Linien zwischen den Treffern eingefeugt werden. Die Variable $mitoderohne 
 ist dafuer wie im Beispiel ersichtlich zu aendern. Beispiel:  
 
$mitoderohne = "<hr style=\"color: #FFFFFF; background-color: #FFFFFF\" size=\"1\">";
 --------------------------------------------------------------------------------------------------
 */
$mitoderohne = " ";

?>