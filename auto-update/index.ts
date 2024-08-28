import PocketBase from "pocketbase";
import nodemailer from "nodemailer";
import { disposeEmitNodes } from "typescript";

const domain: string = "ek.krenn.tech:443";
const imgdom: string = `https://${domain}/api/files`;
const connection: PocketBase = new PocketBase(`https://${domain}`);
const userConnection: PocketBase = new PocketBase(process.env.USER_DATA_URL);

userConnection.autoCancellation(false);
await userConnection.admins.authWithPassword(
  process.env.USER_DATA_EMAIL!,
  process.env.USER_DATA_PASSWORD!
);

const figures = connection.collection("Figure");

let last_exec = new Date(Date.now() - 1000 * 60 * 60 * 24);

let new_figures = await figures.getFullList({
  filter: `created>'${encodeURIComponent(last_exec.toISOString())}'`,
  expand: "subSeriesId",
});

let users = await userConnection.collection("user").getFullList({
  filter: "sub='premium'",
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: false,
});

await new Promise((resolve, reject) => {
  transporter.verify(function (error, success) {
    if (error || !success) {
      return reject(error);
    }
    resolve(null);
  });
});

if (new_figures.length == 0) throw new Error("No Figures");

const info = await transporter.sendMail({
  from: `"Euro-Katalog" <${process.env.EMAIL_USER}>`,
  to: users.map((user) => user.email).join(", "),
  subject: "Neue Figuren verfügbar!",
  html:
    `<h2>Neue Figuren!</h2>
        <p>Es gibt wieder neue Ü-Ei-Figuren im Euro-Katalog! 🎉 Schaut gerne vorbei und entdeckt die neuesten Einträge.

            Falls ihr Informationen zu den neuen Figuren habt, würden wir uns freuen, wenn ihr uns Bescheid gebt. Jede Info hilft, den Katalog weiter zu vervollständigen!

            Vielen Dank und viel Spaß beim Stöbern!

            Beste Grüße,
            Das Euro-Katalog-Team
            </p>` +
    new_figures
      .map((figure) => {
        return `
        <b>Figur Name: ${figure.name}</b><br>
        <b>Serienname: ${figure.expand!.subSeriesId.name}</b>
        `
      })
      .join("<br>"),
});
