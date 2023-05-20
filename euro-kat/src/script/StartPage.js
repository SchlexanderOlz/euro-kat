import React from "react";
import "../style/StartPage.css";


function TopSection() {
  return (
    <table border="0" width="100%" cellspacing="0">
      <tr>
        <td>
          <p align="center">
            <font face="Comic Sans MS" color="#776800">
              <img
                border="0"
                src="genPict/b_HJFHenze.gif"
                width="468"
                height="60"
                alt="HJFHenze logo"
              />
            </font>
          </p>
        </td>
      </tr>
    </table>
  );
}

// Component for the marquee section
function MarqueeSection() {
  return (
    <div align="center">
      <table border="0" width="71%" id="table1">
        <tr>
          <td height="29">
            <marquee
              scrolldelay="120"
              scrollamount="5"
              style={{
                fontWeight: "bold",
                fontFamily: "Verdana",
                fontSize: "12pt",
                color: "#FF0000",
              }}
            >
              Helmut's Sammlerseiten: Euro-Kat die Inhalte aus dem
              Überraschungsei * Berichte rund um die Themen der Seiten * Bremer
              Karten
            </marquee>
          </td>
        </tr>
      </table>
    </div>
  );
}

// Component for the welcome section
function WelcomeSection() {
  return (
    <div align="center">
      <table border="0" width="750">
        <tr>
          <td colspan="3">
            <img
              border="0"
              src="genpict/h2.jpg"
              width="101"
              height="116"
              align="left"
              hspace="15"
              alt="Welcome image"
            />
            Herzlich Willkommen auf diesen Sammlerseiten!
            <br />
            <br />
            Warm welcome to these collector's sides!
            <br />
            <br />
            Cordialement bienvenue sur ces côtés de collectionneur
            <br />
            <br />
            Una cordial bienvenida a todos los coleccionistas de Kinder a estas
            páginas!
            <br />
            <br />
            Добро пожаловать на страницы сборщиков!
            <font face="Verdana">
              <br />
            </font>
            Mail: <a href="mailto:Sammler@HJFHenze.de">Sammler@HJFHenze.de</a>
          </td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td valign="top">&nbsp;</td>
          <td valign="top">
            Der <b>Euro-Katalog</b> als die umfangreichste Informationssammlung
            zu den Ü-Ei-Inhalten der vergangenen Jahre.
          </td>
          <td valign="top">&nbsp;</td>
        </tr>
        <tr>
          <td width="99%" colspan="3">
            <font color="#FFFFCC">
              <img
                border="0"
                src="genPict/leerpic.jpg"
                width="18"
                height="12"
                alt="HJFHenze logo"
              />
              HJFHenze - Helmut J.F.Henze
            </font>
          </td>
        </tr>
      </table>
      <hr />
    </div>
  );
}

// Component for the footer section
function FooterSection() {
  return (
    <div align="center">
      <center>
        <table border="0" width="750">
          <tr>
            <td width="750" height="25">
              <p>
                <font size="1" face="Arial">
                  <u>Copyright:</u> Das Copyright auf die Abbildungen und
                  verwendeten Bezeichnungen liegt bei den jeweiligen
                  Herstellern.
                  <br />
                  <u>Links:</u> Entsprechend derzeitigem Recht distanziere ich
                  mich in jeder Form von den Inhalten der von meinen Seiten
                  abgehenden Links. <br />
                  Diese Seiten sind optimiert für MS-Explorer 1024x768.
                </font>
              </p>
            </td>
          </tr>
          <tr>
            <td class="head" width="700">
              Datenschutz (DSGVO)
            </td>
          </tr>
          <tr>
            <td width="700">
              HJFHenze.de - Helmut's Sammlerseiten / Euro-Kat.de / FF-Kat.de -
              Der Fremdfigurenkatalog / BPZ-Kat.de
              <br />
              sind private Sammlerseiten auf denen Informationen für Sammler der
              Inhalte von Überraschungseiern der Fa. Ferrero und anderer
              ähnlicher Produkte zusammengetragen und veröffentlicht werden.
              <br />
              <b>
                Durch die Nutzung dieser Seiten werden keine personenbezogenen
                Daten erhoben. <br />
                Auf den Seiten werden keine Cookies verwendet.
              </b>
            </td>
          </tr>
          <tr>
            <td width="700">
              Die Sammlerseiten leben von der Unterstützung durch Sammlerinnen
              und Sammler aus der ganzen Welt.
              <br />
              Es ist mir wichtig, mich für jede zugesendete Information, jedes
              zugesendete Bild zu bedanken indem ich Name und Vorname der
              Zusenderin/des Zusenders auf der jeweiligen Seite angebe. Dieses
              wende ich jetzt über 10 Jahre an und ist für alle Besucherinnen
              und Besucher meiner Seiten sichtbar.
            </td>
          </tr>
          <tr>
            <td width="700">
              <font color="#FF0000">
                <b>
                  ACHTUNG! Mit der Zusendung einer Information, eines Bildes
                  erklären Sie sich mit der Veröffentlich Ihres Namen und Ihres
                  Vornamens einverstanden! Sollten Sie dieses nicht wünschen, so
                  teilen Sie mir dieses in der Mail mit.&nbsp;{" "}
                </b>
              </font>
            </td>
          </tr>
          <tr>
            <td width="700">
              <font color="#FF0000">
                <b>
                  <span id="result_box" class lang="en">
                    <span class>ATTENTION!</span>{" "}
                    <span class>
                      By sending an information, a picture you agree with the
                      publication of your name and your first name!
                    </span>{" "}
                    If you do not want this, please let me know in the mail.
                  </span>
                </b>
              </font>
            </td>
          </tr>
          <tr>
            <td width="700">&nbsp;</td>
          </tr>
          <tr>
            <td width="700">
              Weitere Informationen und die DSGVO konforme Datenschutzerklärung
              finden Sie unter dem Menüpunkt <b>Impressum/Datenschutz</b>.
            </td>
          </tr>
          <tr>
            <td width="700">&nbsp;</td>
          </tr>
          <tr>
            <td width="700">&nbsp;</td>
          </tr>
          <tr>
            <td width="700">&nbsp;</td>
          </tr>
          <tr>
            <td width="750" height="25">
              &nbsp;
            </td>
          </tr>
        </table>
      </center>
    </div>
  );
}

function Navigator() {
  return (
    <div id="nav">
      <table border="0" width="120" cellspacing="1">
        <tr>
          <td width="95%" height="40">
            <p align="center">
              <img
                border="0"
                src="genpict/logo_klein.jpg"
                width="62"
                height="60"
              />
            </p>
          </td>
        </tr>
        <tr>
          <td width="96%" height="10"></td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#C1DBEE">
              Start
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="10">
            <font size="2" color="#F8DD45">
              Info
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="10">
            <font size="2" color="#F8DD45">
              SUCHEN
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="10"></td>
        </tr>
        <tr>
          <td width="95%" height="20" bgcolor="#3366CC">
            <b>
              <font color="#FFFFFF" face="Arial" size="2">
                Der Euro-Katalog
              </font>
            </b>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20" bgcolor="#396F91">
            <font color="#FFFFFF" face="Arial" size="2">
              <b>D + Welt Aktuell</b>
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20">
            <a
              style={{
                textDecoration: "none",
                fontWeight: 700,
                fontStyle: "italic",
              }}
              title="Die Serien der Saison 2022-2023"
              href="aktuell/akt2022.htm"
            >
              <font size="2" color="#F8DD45">
                August 2022- Juli 2023
              </font>
            </a>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20" bgcolor="#396F91">
            <b>
              <font face="Arial" size="2" color="#FFFFFF">
                D + Welt
              </font>
            </b>
            <font color="#FFFFFF" face="Arial" size="2">
              <b> ab 2004</b>
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <a
              style={{
                textDecoration: "none",
                fontWeight: 700,
                fontStyle: "italic",
              }}
              title="Die Serien der Saison 2022-2023"
              href="aktuell/akt2022.htm"
            >
              <font size="2" color="#F8DD45">
                Inhalte nach MPG-Kennung
              </font>
            </a>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Dies und Das
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20" bgcolor="#396F91">
            <b>
              <font face="Arial" size="2" color="#FFFFFF">
                D + Welt{" "}
              </font>
            </b>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <i>
              <b>
                <font size="2" color="#F8DD45">
                  <a href="JGListen/D_Menu.htm">
                    <font color="#F8DD45">Jahrgänge D</font>
                  </a>
                </font>
              </b>
            </i>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Jahrgänge Welt
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Index von A - Z
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20" bgcolor="#396F91">
            <font color="#FFFFFF" face="Arial" size="2">
              <b>Spezialthemen</b>
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20">
            <font size="2" color="#F8DD45">
              Kinder Joy D
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20">
            <font size="2" color="#F8DD45">
              Kinder Joy US
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="20">
            <font size="2" color="#F8DD45">
              Kinder Joy Ice
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Maxi-Inhalte
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              HP+BPZ
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Rubriken
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Warnhinweisz.
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Zusatzwarnz.
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="10"></td>
        </tr>
        <tr>
          <td width="96%" height="10">
            <font size="2" color="#F8DD45">
              Berichte
            </font>
          </td>
        </tr>
        <tr>
          <td width="96%" height="60">
            <p align="center">
              <img border="0" src="genPict/frageB.jpg" width="62" height="60" />
            </p>
          </td>
        </tr>
        <tr>
          <td width="96%" height="10"></td>
        </tr>
        <tr>
          <td width="95%" height="20" bgcolor="#396F91">
            <b>
              <font color="#FFFFFF" face="Arial" size="2">
                Sonstiges
              </font>
            </b>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Quellen
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Links
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Das Team
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#F8DD45">
              Email
            </font>
          </td>
        </tr>
        <tr>
          <td width="95%" height="20">
            <font size="2" color="#C1DBEE">
              Impressum/
              <br />
              Datenschutz
            </font>
          </td>
        </tr>
      </table>
    </div>
  );
}

// Component for the start page
function StartPage() {
  return (
    <div>
      <Navigator />
      <TopSection />
      <MarqueeSection />
      <WelcomeSection />
      <FooterSection />
    </div>
  );
}

export default StartPage;
