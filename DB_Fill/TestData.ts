import PocketBase from "pocketbase";
import {
  Series,
  SubSeries,
  Figure,
  SubSeriesVariation,
  FigureVariation,
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
  const subSeriesVariations = pb.collection("SubSeriesVariation");
  const figureVariations = pb.collection("FigureVariation");

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

        figure.pictures?.forEach((path: string) => {
          const data = fs.readFileSync(path);
          const blob = new Blob([data], { type: getTypeHeader(path) });
          formData.append("pictures", blob, path.split("\\").pop());
        });

        const record = await figures.create(formData);
      });

      sub.variations.forEach(async (variation: SubSeriesVariation) => {
        let subVariation = new FormData();
        subVariation.append("year", variation.year);
        subVariation.append("country", variation.country);
        subVariation.append("note", variation.note);

        variation.pckgi.forEach(async (pckgi: any) => {
          let formData = new FormData();

          const data = fs.readFileSync(pckgi.picture);
          const blob = new Blob([data], { type: getTypeHeader(pckgi.picture) });
          formData.append("packageInserts", blob);
          const record = await figureVariations.create(formData);

          try {
            var figureRef = await figures.getFirstListItem(
              `mpgNr="${pckgi.mpgNr}"`
            );
          } catch (Error) {
            console.log("Ressource not found: " + pckgi.mpgNr);
            return;
          }

          await figures.update(figureRef.id, {
            "figureVariations+": record.id,
          });
          subVariation.append("figureVariations", record.id);
        });
        const record = await subSeriesVariations.create(subVariation);
        subSeriesData.append("subSeriesVariations", record.id);
      });

      subSeriesData.append("name", sub.name);
      subSeriesData.append("thanks", sub.thanks);
      const record = await subSeries.create(subSeriesData);
      seriesData.append("subSeries", record.id);
    });
    await series.create(seriesData);
  });
}

add();
