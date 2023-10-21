Readme / Lies mich

Allgemeine Lizenzbedingungen

Bevor Sie das Script benutzen, müssen Sie die Lizenzbedingungen 
akzeptieren.

Sie dürfen dieses Script, bestehend aus der Suchfunktion und den zugehörigen 
Dateien im Ordner suchmy, kostenlos nutzen, gleich ob das Script im privaten 
oder gewerblich geführten Websites oder Webprojekten integriert wird, insofern 
vorhandene Copyrighthinweise in Form von Hyperlinks auf www.heim-und-haustiere.de
oder in Form eines Logos mit Hyperlinks auf www.heim-und-haustiere.de nicht 
entfernt wird und erhalten bleibt. Unter den gleichen Voraussetzungen dürfen 
Sie dieses Script auch kostenlos weiter gegeben oder verschenken. Sollten Sie 
ein Script kostenlos weitergeben oder verschenken, sind Sie verpflichtet, 
diese Lizenzbedingungen ebenfalls mit weiter zu geben.
  
Nicht gestattet ist es hingegen, dieses Script inklusive der zugehörigen 
Dateien im kommerziellen Sinne weiter zu verwerten. Hierzu zählt, dass dieses 
Script nicht ohne Einverständnis des Autors gegen ein Entgelt oder einem 
anderweitigen Erlös verkauft werden darf, ob einzeln oder in einem 
Sammelwerk spielt hierbei keine Rolle. Ebenfalls ist ein Abdruck in 
Printform oder eine Abbildung als Kopie ohne Zustimmung des Autors 
untersagt, gleich ob es sich dabei um ein Medium im Internet oder um eine 
Abbildung in anderen Medien handelt. Bei berechtigtem Interesse ist der 
Autor jedoch unter Umständen gern bereit seine Zustimmung zu erteilen. 
 
Um diesen Lizenzbedingungen zuzustimmen, bedarf es keiner schriftlichen 
oder mündlichen Erklärung oder Mitteilung. Da bei jeder Seite, auf der ein 
Script zum kopieren oder zum Download angeboten wird, ein Hinweis auf die 
AGB erfolgt, ferner diese Lizenzbedingungen jedem Download mit beiliegt, 
stimmen Sie den Lizenzbedingungen automatisch zu, wenn Sie dieses Script 
benutzen. Sie dürfen diesen Lizenzbedingungen jedoch nicht zustimmen, wenn Sie 
das gesetzlich vorgeschriebene Alter für den Abschluss von Verträgen noch 
nicht erreicht haben. In diesem Fall müssen Sie einen Sorgeberechtigten um 
sein Einverständnis bitten. 



Gewährleistung

Wir garantieren Ihnen, dass wir dieses Scripts so sorgfältig wie möglich 
getestet haben. Eine Gewähr für die Fehlerfreiheit des Scripts können wir 
dennoch nicht übernehmen. Der Download und die Verwendung der Scripts 
geschieht auf eigene Gefahr. Dies trifft insbesondere auf den 
unsachgemäßen Einsatz von Scripts zu und ebenso im Zusammenhang mit der
Weiterentwicklung von Servertechnologien, Programmiersprachen, 
Browsertechniken und Webstandards. Sollten Ihnen hieraus etwaige Schäden 
entstehen, übernehmen wir keine Gewährleistung. Weiterhin sollten Sie im 
eigenen Interesse bei der Verwendung darauf achten, dass Dateien mit sensiblen
Daten, wie Passwörter usw., von der Suche ausgeschlossen werden.



Wichtiger Hinweis 

Die Suchfunktion durchsucht den Quelltext und Quellcode von PHP-Dateien, ohne 
dass diese vom Server zuvor geparst werden! Passwörter und andere sensible 
Daten in einem Kommentarbereich sind somit durchsuchbar! Schützen Sie derartige
Dateien mit einem noindex-Tag im Head und sperren Sie zusätzlich derartige 
Dateien und Seiten für die Suche im Adminbereich. Testen Sie gegebenenfalls,
ob der Schutz zuverlässig ist.



Download und Installation

Bitte überprüfen Sie vor einer Installation, ob bei Ihren Webspace PHP5 
zu Verfügung steht.

Die erforderlichen Dateien befinden sich in einem Zip-Ordner, den Sie nach 
dem Download entpacken müssen. Ordner und Dateien sollten Sie nicht umbenennen. 
Tun Sie es dennoch, ist die Funktionalität des Scripts nicht mehr 
gewährleistet.

In einem ersten Schritt sollten Sie mit einem geeigneten Editor die Seite 
editsettings.php öffnen und bei diesem Punkt "ihre-domain" gegen den Namen 
Ihre eigenen Domain auswechseln:

$meineDomain = "www.ihre-domain.de";

Als nächstes sollten Sie "admin" jeweils gegen ein sicheres Passwort Ihrer 
Wahl ersetzen. Wenn Sie zur Erprobung keine Änderung an dieser Stelle 
vornehmen und weiterhin "admin" als Usernamen und als Userkennung verwenden, 
sollten Sie diese Änderung im Interesse der Sicherheit so bald wie möglich 
vornehmen. 

$pwusern = "admin";  (Usernamen) 
$pwunten = "admin";  (Userkennung)

Laden Sie im Anschluss die Datei suche.php und den Ordner suchmy mit all 
seinen Dateien in das Rootverzeichnis Ihres Webspaces. Das Rootverzeichnis ist 
das Stammverzeichnis bzw. die oberste Ebene Ihres Webspaces, dort wo auch ihre 
Index-Datei liegt. Sollte es sich um einen Unix Host handeln bzw. sollte sich 
Ihr Webspace auf einen Server befinden, der als Betriebssystem Unix verwendet, 
so müssen Sie folgende Dateien mit Schreibrechten versehen:

CHMOD 666 für die Dateien:

gsordner.txt 
gsseiten.txt
visits.txt
visitscontrol.txt


Vor dem ersten Test der Suche

Wenn Sie alle Dateien hochgeladen haben, rufen Sie die Datei 
www.ihre-domain/suchmy/edtieinwahl.php auf (wobei ihre-domain gegen den Namen 
Ihrer Domain zu ersetzen ist) und geben admin und admin ein oder den von Ihnen 
geänderten Usernamen und Userkennung. Es wird bei erfolgreicher Einwahl ein 
Cookie auf Ihren PC abgelegt und es erfolgt ein Wechsel zu einer Seite mit 
einer Navigation für den Admin- und Editbereich. Hier sollten Sie unter dem 
Menüpunkt "Gesperrte Worte, Seiten und Ordner: " den Link "Zum Editierbereich" 
wählen.

Tragen Sie in der ersten Liste auf der Seite "Editsuche: Dateien, Ordner und 
Stopworte" alle Seiten und Dateien ein, die nicht durchsucht werden sollen. 
Es ist jeweils nur eine Seite pro Zeile einzutragen. Tragen Sie im Anschluss 
in der zweiten Liste alle Ordner ein, die von der Suche ausgeschlossen werden 
sollen. Auch hier ist pro Zeile nur ein Ordner einzutragen. Bei Ordnerpfaden 
ist ein Schrägstrich zwischen den Ordnern erforderlich, es darf aber kein 
Schrägstrich am Anfang oder am ende verwendet werden!
 
Bei dem Ausschluss von Ordnern sollten Sie möglichst sorgfältig vorgehen, da 
zum Beispiel der Inhalt von Ordner die zu Statistiken, Countern usw. gehören 
und in denen viele Dateien liegen, die Suche im erheblichen Umfang 
verlangsamen kann!
Nicht unbedacht verändern sollten Sie hingegen die Liste mit den Stopwörtern. 
Stopwortlisten werden von allen größeren Suchmaschinen verwendet, um 
unwichtige Wörter von der Suche auszuschließen und um so den Suchvorgang  auf 
die wesentlichen Bestandteile einer Suchanfrage zu lenken. In dieser Liste 
sehen Sie eine Liste mit bisher gespeicherten Stopwörtern, die bei der 
normalen Suche nicht mit berücksichtigt werden. Sie können diese Liste 
editieren, in dem Sie einzelne Wörter hinzufügen oder aus der Liste löschen. 
Diese Liste hat auf die Suchoption "Genauer Wortlaut" keinen Einfluss.


Nach dem Test der Suchefunktion

Wenn dieser Schritt erledigt ist, können die Seite suche.php aufrufen. Wenn 
die Installation erfolgreich war, sehen Sie eine Tabelle mit den letzten 
Suchanfragen und darunter eine Tabelle mit den häufigsten Suchbegriffen 
eingeblendet. Ob Sie diese beiden Tabellen eingeblendet lassen möchten oder 
nur eine oder keine, können Sie in der Datei editsettings.php unter den 
folgenden Punkten angeben, in dem Sie die Werte jeweils auf "on" oder "off" 
setzen.

$tablastvisits = "on";
$tabmostworte  = "on";

Weiterhin können Sie mit "on" oder "off" angeben, ob die Titelzeile und die 
Links zur nächsten Seite (falls die Zahl der Ergebnisse höher ist als die 
Anzahl der angezeigten Ergebnisse pro Seite) eingeblendet werden.

$headlinean    = "on";
$seitenlinks   = "on";

Welche Werte noch von Ihnen geändert werden können, ist in der Datei 
editsettings.php bei den jeweiligen Punkten vermerkt. 

Es sei angemerkt, die Seite suche.php dient nur als Demo für die Ausgabe. Wenn 
Sie diese Seite weiterhin verwenden möchte, so können Sie diese entsprechend 
Ihren Vorstellungen verändern und einrichten. Den Headbereich können Sie mit 
weiteren Angaben erweitern, relevante Angaben, wie die Dokumenttyp-Deklaration 
HTML 4.01 Transitional, der Content-Typ charset=iso-8859-1 und die Einbindung 
zur CSS sollten hingegen nicht verändert werden, bzw. mit in anderen Seiten 
übernommen werden, um Probleme mit der Darstellung oder mit Umlauten zu 
vermeiden!
 
Bei Bedarf können Sie die beiden // Schrägstriche vor $vorWort = " "; löschen 
und statt dessen einen vorgewählten Suchbegriff zwischen "" einfügen. 

Beispiel: $vorWort = "Hustenropfen"; 
 
Beim ersten Aufruf würden dann auf der Seite suche.php alle gefundenen 
Ergebnisse aufgelistet, die das Wort Hustentropfen enthalten. Auf diese Art 
und Weise können Sie auch mehrere Seiten mit unterschiedlichen 
Suchergebnissen anlegen. Dabei ist zu bedenken, zu viele Seiten mit 
vordefinierten Suchbegriffen anzulegen ist nicht ratsam, da die Gefahr von 
zeitnahen oder zweitgleichen  Suchanfragen wächst, was zu einer Mehrbelastung 
führen würde. Besonders die Bots und Crawler von Suchmaschinen rufen bei ihren 
Besuchen nicht nur eine Seite auf und könnten bei zu vielen Seiten mit 
vordefinierten Suchbegriffen zu viele zeitnahe Suchvorgänge auslösen. 
Diesen Hinweis finden Sie auch im Quelltext der Datei suche.php. Der Hinweis 
kann dort entfernt werden, wobei Sie den Text in diesem Fall einschließlich 
des einleitenden /* und endenden */ Schrägstrichs entfernen müssten.

Die bestehenden Formatierungen lassen sich in der Datei meinesuche.css 
weitestgehend verändern, um so die Seite suche.php weitestgehend an Ihre 
vorhandenen Webseiten anzupassen. Alle Änderungen in der meinesuche.css 
verändern jedoch nicht nur das Erscheinungsbild der Seite suche.php, sondern 
auch das der Seiten im Adminbereich.

Um ein kleines Suchformular in allen Seiten Ihrer Website (Homepage) 
einzubinden, können Sie jedes beliebige Formular verwenden. Eine vorgefertigte 
Auswahl mit Beschreibung finden Sie im Adminbereich unter dem Menüpunkt 
"Suchfeld auswählen".



Sonstige Hinweise

Die Suchfunktion durchsucht alle vorhandenen Dokumente Zeilenweise. Wenn mehr
als ein Suchbegriff eingegeben wird, werden nur Treffer gelistet, wenn beide
Suchbegriffe innerhalb einer Zeile im Dokument vorkommen. Zeilen, in denen
Links oder Image-Tags vorkommen, werden nicht durchsucht. Ebenfalls werden
Zeichenketten nicht mit ausgegeben, die codetypische Zeichen enthalten, wozu
Dollarzeichen, Gleichheitszeichen, Semikolons und Klammern gehören. 

Es werden nur Seiten durchsucht, die ein Meta-Tag mit meta name="robots" im 
Head der Datei notiert haben und auch nur dann, wenn kein noindex in diesem 
Meta-Tag angegeben wurde. Seiten, deren Content (Inhalt) in Datenbanken liegt, 
werden nicht durchsucht. Obwohl viele Dateiendungen wie zum Beispiel *xml, 
*pdf oder *txt bereits im Script gesperrt werden, sind Dateien, die nicht 
durchsucht werden sollen und ebenso Ordner, in denen nur nicht zu 
durchsuchende Dateien enthalten sind, dennoch in den Listen im Adminbereich 
zu sperren. Andernfalls würde sich die Suche verlangsamen, da bei jeden 
Suchvorgang erst jeder Datei Zeile für Zeile nach eventuell vorhandenen 
Meta-Angaben vom Script durchsucht werden würde.

Um ungewollte Attacken zu verweiden, die durch spielende Kinder ebenso 
erfolgen könnten, wie automatisierte Suchanfragen, erfolgt eine kurzfristige 
Sperrung bei mehr als 60 Suchanfragen von einer einzigen IP innerhalb einer 
Stunde. Es werden nur Zugriffe von der IP gesperrt, von welcher die Störung 
erfolgte. Die IP-Sperre wird eine Stunde nach dem ersten Aufruf der Suche 
wieder aufgehoben.

Die Datei für die Auswertung der letzten Suchanfrage und der häufigsten 
Suchbegriffe begrenzt sich von allein auf 1.000 Eintragen, wobei die jeweils 
ältesten Eintragungen bei jedem erneuten Aufruf wieder gelöscht werden. Ein 
manuelles Eingreifen, um ein unkontrolliertes Wachstum der TXT-Datei zu 
vermeiden, ist somit nicht erforderlich, insofern keine Störung vorliegt. 
In durchgeführten Tests trat bisher keine Störung auf.


Horst Müller
Verlag und Websolution
Pferdemärsche 64
39576 Stendal

Tel.: 03931-710864





