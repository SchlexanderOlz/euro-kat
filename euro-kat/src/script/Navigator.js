import React, { useState } from "react";
import "../style/Navigator.css";

function Navigator({ onSelectSection }) {
  const handleSelectSection = (section) => {
    onSelectSection(section); // Call the callback function to handle navigation
  };

  return (
    <div id="nav">
      <table>
        <tbody>
          <tr>
            <td>
              <p align="center">
                <img
                  border="0"
                  src="genpict/logo_klein.jpg"
                  width="62"
                  height="60"
                  alt=""
                />
              </p>
            </td>
          </tr>
          <tr>
            <td id="start">Start</td>
          </tr>
          <tr className="minor_important">
            <td>SUCHEN</td>
          </tr>
          <tr className="minor_important">
            <td>Info</td>
          </tr>
          <tr className="important">
            <td>
              <b>Der Euro-Katalog</b>
            </td>
          </tr>
          <tr className="minor_important">
            <td>
              <b>D + Welt Aktuell</b>
            </td>
          </tr>
          <tr className="minor_important">
            <td>
              <a
                title="Die Serien der Saison 2022-2023"
                href="#"
                onClick={() => handleSelectSection("releases")}
              >
                August 2022- Juli 2023
              </a>
            </td>
          </tr>
          <tr className="minor_important">
            <td>
              <b>D + Welt ab 2004</b>
            </td>
          </tr>
          <tr className="minor_important">
            <td>
              <a
                title="Die Serien der Saison 2022-2023"
                href="aktuell/akt2022.htm"
              >
                Inhalte nach MPG-Kennung
              </a>
            </td>
          </tr>
          <tr>
            <td>Dies und Das</td>
          </tr>
          <tr>
            <td>
              <b>D + Welt</b>
            </td>
          </tr>
          <tr>
            <td>
              <a href="JGListen/D_Menu.htm">Jahrgänge D</a>
            </td>
          </tr>
          <tr>
            <td>Jahrgänge Welt</td>
          </tr>
          <tr>
            <td>Index von A - Z</td>
          </tr>
          <tr>
            <td>
              <b>Spezialthemen</b>
            </td>
          </tr>
          <tr>
            <td>Kinder Joy D</td>
          </tr>
          <tr>
            <td>Kinder Joy US</td>
          </tr>
          <tr>
            <td>Kinder Joy Ice</td>
          </tr>
          <tr>
            <td>Maxi-Inhalte</td>
          </tr>
          <tr>
            <td>HP+BPZ</td>
          </tr>
          <tr>
            <td>Rubriken</td>
          </tr>
          <tr>
            <td>Warnhinweisz.</td>
          </tr>
          <tr>
            <td>Zusatzwarnz.</td>
          </tr>
          <tr>
            <td>Berichte</td>
          </tr>
          <tr id="question_pic">
            <td>
              <img src="genPict/frageB.jpg" alt="" />
            </td>
          </tr>
          <tr>
            <td>Sonstiges</td>
          </tr>
          <tr>
            <td>Quellen</td>
          </tr>
          <tr>
            <td>Links</td>
          </tr>
          <tr>
            <td>Das Team</td>
          </tr>
          <tr>
            <td>Email</td>
          </tr>
          <tr>
            <td>
              Impressum/
              <br />
              Datenschutz
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Navigator;
