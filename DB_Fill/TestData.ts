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

  for (const object of json) {
    for (const sub of object.subSeries) {
      for (const figure of sub.figures) {
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

        await figures.create(formData);
      }
    }
  }

  for (const object of json) {
    let seriesData = new FormData();
    seriesData.append("seriesLetter", object.seriesLetter);

    for (const sub of object.subSeries) {
      let subSeriesData = new FormData();
      for (const variation of sub.variations) {
        let subVariation = new FormData();
        subVariation.append("year", variation.year);
        subVariation.append("country", variation.country);
        subVariation.append("note", variation.note);

        for (const pckgi of variation.pckgi) {
          let formData = new FormData();

          const data = fs.readFileSync(pckgi.picture);
          const blob = new Blob([data], { type: getTypeHeader(pckgi.picture) });
          formData.append("packageInserts", blob);
          const figureCreate = figureVariations.create(formData);

          try {
            var figureRef = await figures.getFirstListItem(
              `mpgNr="${pckgi.mpgNr}"`
            );
          } catch (Error) {
            console.log("Ressource not found: " + pckgi.mpgNr);
            continue;
          }
          const record = await figureCreate

          figures.update(figureRef.id, {
            "figureVariations+": record.id,
          });
          subVariation.append("figureVariations", record.id);
        }
        const record = await subSeriesVariations.create(subVariation);
        subSeriesData.append("subSeriesVariations", record.id);
      }

      subSeriesData.append("name", sub.name);
      subSeriesData.append("thanks", sub.thanks);
      const record = await subSeries.create(subSeriesData);
      seriesData.append("subSeries", record.id);
    }
    await series.create(seriesData);
  }
}

async function addWarnings() {
   console.log(
    await pb.admins.authWithPassword("admin@admin.admin", "Kennwort1!")
  );
  const data = fs.readFileSync("../html-parser/warnings.json", "utf8"); 
  const json = JSON.parse(data)

  json.forEach((warning: any/*Warning*/) => {
    // TODO: Continue here
  });
}

async function dropAll(collectionName: string) {
  await pb.admins.authWithPassword("admin@admin.admin", "Kennwort1!");
  const collection = pb.collection(collectionName);
  const items = await collection.getFullList();
  for (const item of items) {
    await collection.delete(item.id);
  }
}

function main() {
  const args = process.argv;

  args.forEach(async (arg) => {
    console.log(arg);
    switch (arg) {
      case "--drop-all":
        dropAll("Series");
        dropAll("Figure");
        dropAll("FigureVariation");
        dropAll("SubSeries");
        dropAll("SubSeriesVariation");
        return;
      case "--add":
        add();
    }
  });
}

main();
