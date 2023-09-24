import PocketBase from "pocketbase";
import type {
  Series,
  SubSeries,
  Figure,
  SubSeriesVariation,
  Packaging,
  Variation,
  FigureVariation,
} from "../sveltekat/src/lib/Types.js";
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
  const packaging = pb.collection("Packaging");
  const variations = pb.collection("Variation");

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
        formData.append("fake", figure.fake);
        formData.append("questionable", figure.questionable);

        figure.pictures?.forEach((path: string) => {
          if (path.search("want_fig.jpg") >= 0) return;
          try {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            formData.append("pictures", blob, path.split("\\").pop());
          } catch (Error) {
            return;
          }
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

          for (const path of pckgi.picture) {
            try {
              if (path.search("want_bpz.jpg") >= 0) continue;
              const data = fs.readFileSync(path);
              const blob = new Blob([data], { type: getTypeHeader(path) });
              formData.append("packageInserts", blob);
            } catch (Error) {
              continue;
            }
          }
          const figureCreate = figureVariations.create(formData);

          try {
            var figureRef = await figures.getFirstListItem(
              `mpgNr="${pckgi.mpgNr}"`
            );
          } catch (Error) {
            console.log("Ressource not found: " + pckgi.mpgNr);
            continue;
          }
          const record = await figureCreate;

          figures.update(figureRef.id, {
            "figureVariations+": record.id,
          });
          subVariation.append("figureVariations", record.id);
        }
        const record = await subSeriesVariations.create(subVariation);
        subSeriesData.append("subSeriesVariations", record.id);
      }

      if (sub.packaging != null) {
        for (const packag of sub.packaging) {
          var packageData = new FormData();

          packag.images.forEach((path: string) => {
            try {
              const data = fs.readFileSync(path);
              const blob = new Blob([data], { type: getTypeHeader(path) });
              packageData.append("images", blob, path.split("\\").pop());
            } catch (Error) {
              return;
            }
          });
          packageData.append("name", packag.name);
          packageData.append("thanks", packag.thanks);
          const record = await packaging.create(packageData);
          subSeriesData.append("packaging", record.id);
        }
      }

      sub.figureVariations?.forEach(async (variation: any) => {
        try {
          var figureRef = await figures.getFirstListItem<Figure>(
            `mpgNr="${variation.mpgNr}"`
          );
        } catch (Error) {
          console.log("Ressource not found: " + variation.mpgNr);
          return;
        }
        let formData = new FormData();
        variation.images.forEach(async (path: string) => {
          const data = fs.readFileSync(path);
          const blob = new Blob([data], { type: getTypeHeader(path) });
          formData.append("images", blob, path.split("\\").pop());
        });
        formData.append("variation", variation.variation);
        const record = await variations.create(formData);

        figures.update(figureRef.id, {
          "variations+": record.id,
        });
      });

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
  const json = JSON.parse(data);

  json.forEach((warning: any /*Warning*/) => {
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
        dropAll("Packaging");
        dropAll("Variation");
        return;
      case "--add":
        add();
    }
  });
}

main();
