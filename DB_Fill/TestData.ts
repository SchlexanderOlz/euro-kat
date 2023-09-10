import PocketBase from "pocketbase";
import type {
  Series,
  SubSeries,
  CountryVariation,
  Figure,
} from "../sveltekat/src/lib/PocketBase.js";
import fs from "fs";

const pb = new PocketBase("https://ek.krenn.tech/");
pb.autoCancellation(false);

function getTypeHeader(path: string): string {
  switch (path.split("\\").pop()?.split(".").pop()) {
    case "png":
      return "image/png";
    case "jpg":
      return "image/jpeg";
    case "JPG":
      return "image/jpeg";
    default:
      console.log(path);
      return "image/png";
  }
}

async function add() {
  console.log(
    await pb.admins.authWithPassword("admin@admin.admin", "Kennwort1!")
  );

  const figures = pb.collection("Figure");
  const series = pb.collection("Series");
  const subSeries = pb.collection("SubSeries");
  const countryVariations = pb.collection("CountryVariation");

  const data = fs.readFileSync("../html-parser/data.json", "utf8");
  const json = JSON.parse(data);

  await json.forEach(async (object: Series) => {
    let seriesData = new FormData();
    seriesData.append("seriesLetter", object.seriesLetter);
    object.subSeries.forEach(async (sub: SubSeries) => {
      let subSeriesData = new FormData();
      sub.figures.forEach(async (figure: Figure) => {
        let formData = new FormData();
        formData.append("mpgNr", figure.mpgNr);
        formData.append("name", figure.name);
        formData.append("year", figure.year);
        formData.append("identifier", figure.identifier);
        formData.append("sticker", figure.sticker);
        formData.append("note", figure.note);

        figure.packageInserts?.forEach((path: string) => {
          const data = fs.readFileSync(path);
          const blob = new Blob([data], { type: getTypeHeader(path) });
          formData.append("packageInserts", blob, path.split("\\").pop());
        });

        figure.pictures?.forEach((path: string) => {
          const data = fs.readFileSync(path);
          const blob = new Blob([data], { type: getTypeHeader(path) });
          formData.append("pictures", blob, path.split("\\").pop());
        });

        const record = await figures.create(formData);
        subSeriesData.append("figures", record.id);
      });

      subSeriesData.append("name", sub.name);
      subSeriesData.append("thanks", sub.thanks);
      subSeriesData.append("year", sub.year);
      subSeriesData.append("country", sub.country);
      sub.countryVariations.forEach(
        async (countryVariation: CountryVariation) => {
          let countryData = new FormData();
          countryData.append("country", countryVariation.country);
          countryData.append("year", countryVariation.year);
          countryData.append("note", countryVariation.note);
          countryVariation.images.forEach((path: string) => {
            try {
              const data = fs.readFileSync(path);
              const blob = new Blob([data], { type: getTypeHeader(path) });
              countryData.append("images", blob, path.split("\\").pop());
            } catch (Error) {}
          });
          const record = await countryVariations.create(countryData);
          subSeriesData.append("countryVariations", record.id);
        }
      );
      const record = await subSeries.create(subSeriesData);
      seriesData.append("subSeries", record.id);
    });
    await series.create(seriesData);
  });
}

add();
