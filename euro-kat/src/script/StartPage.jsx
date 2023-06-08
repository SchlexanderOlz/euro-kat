import React from "react";
import "../style/StartPage.css";

function TopSection() {
  return (
    <div id="top_section">
      <p>
        <img src="genPict/b_HJFHenze.gif" alt="HJFHenze logo" />
      </p>
    </div>
  );
}

function MarqueeSection() {
  return (
    <div id="marquee_section" align="center">
      <div id="marquee_content">
        Helmut's Sammlerseiten: Euro-Kat die Inhalte aus dem Überraschungsei *
        Berichte rund um die Themen der Seiten * Bremer Karten
      </div>
    </div>
  );
}

function WelcomeSection() {
  return (
    <div id="welcome_section" align="center">
      <table className="welcome_table">
        <tbody>
          <tr>
            <td colSpan="3">
              <img
                className="welcome_image"
                src="genpict/h2.jpg"
                alt="Welcome image"
              />
              <br />
              <br />
              Herzlich Willkommen auf diesen Sammlerseiten!
              <br />
              <br />
              Warm welcome to these collector's sides!
              <br />
              <br />
              Cordialement bienvenue sur ces côtés de collectionneur
              <br />
              <br />
              Una cordial bienvenida a todos los coleccionistas de Kinder a
              estas páginas!
              <br />
              <br />
              Добро пожаловать на страницы сборщиков!
              <br />
              <font face="Verdana">
                <br />
              </font>
              Mail: <a href="mailto:Sammler@HJFHenze.de">Sammler@HJFHenze.de</a>
            </td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td className="welcome_text">
              Der <b>Euro-Katalog</b> als die umfangreichste
              Informationssammlung zu den Ü-Ei-Inhalten der vergangenen Jahre.
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="3">
              <font className="footer_text">
                <img
                  src="genPict/leerpic.jpg"
                  width="18"
                  height="12"
                  alt="HJFHenze logo"
                />
                HJFHenze - Helmut J.F.Henze
              </font>
            </td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
  );
}

function FooterSection() {
  return (
    <div id="footer_main">
      <center>
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  <u>Copyright:</u> Das Copyright auf die Abbildungen und
                  verwendeten Bezeichnungen liegt bei den jeweiligen
                  Herstellern.
                  <br />
                  <u>Links:</u> Entsprechend derzeitigem Recht distanziere ich
                  mich in jeder Form von den Inhalten der von meinen Seiten
                  abgehenden Links.
                  <br />
                  Diese Seiten sind optimiert für MS-Explorer 1024x768.
                </p>
              </td>
            </tr>
            <tr>
              <td className="head">Datenschutz (DSGVO)</td>
            </tr>
            <tr>
              <td>
                HJFHenze.de - Helmut's Sammlerseiten / Euro-Kat.de / FF-Kat.de -
                Der Fremdfigurenkatalog / BPZ-Kat.de
                <br />
                sind private Sammlerseiten auf denen Informationen für Sammler
                der Inhalte von Überraschungseiern der Fa. Ferrero und anderer
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
              <td>
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
              <td>
                <span className="red">
                  <b>
                    ACHTUNG! Mit der Zusendung einer Information, eines Bildes
                    erklären Sie sich mit der Veröffentlich Ihres Namen und
                    Ihres Vornamens einverstanden! Sollten Sie dieses nicht
                    wünschen, so teilen Sie mir dieses in der Mail mit.&nbsp;{" "}
                  </b>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <span className="red">
                  <b>
                    <span id="result_box" className="lang-en">
                      <span className="">ATTENTION!</span>
                      <span className="">
                        {" "}
                        By sending an information, a picture you agree with the
                        publication of your name and your first name!
                      </span>
                      If you do not want this, please let me know in the mail.
                    </span>
                  </b>
                </span>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td>
                Weitere Informationen und die DSGVO konforme
                Datenschutzerklärung finden Sie unter dem Menüpunkt{" "}
                <b>Impressum/Datenschutz</b>.
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}


function StartPage() {
  return (
    <div>
      <TopSection />
      <MarqueeSection />
      <WelcomeSection />
      <FooterSection />
    </div>
  );
}

export default StartPage;