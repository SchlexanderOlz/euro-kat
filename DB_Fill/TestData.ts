import PocketBase from "pocketbase";
import type {
  Series,
  SubSeries,
  Figure,
  SubSeriesVariation,
  Packaging,
  Variation,
  FigureVariation,
  WarningZD,
} from "../sveltekat/src/lib/Types.js";
import fs from "fs";
import { connection } from "../sveltekat/src/lib/PocketBase.js";
import * as dotenv from "dotenv";

dotenv.config();

const email: string = process.env.EMAIL ?? "";
const password: string = process.env.PASSWORD ?? "";

const pb = new PocketBase("https://ek.liamk.dev/");
pb.autoCancellation(false);

function getTypeHeader(path: string): string {
  switch (path.split("\\").pop()?.split(".").pop()) {
    case "png":
      return "image/png";
    case "jpg":
      return "image/jpeg";
    case "JPG":
      return "image/jpeg";
    case "jpeg":
      return "image/jpeg";
    case "Jpg":
      return "image/jpeg";
    case "JPEG":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    default:
      console.log(path);
      return "image/png";
  }
}

async function add() {
  console.log(await pb.admins.authWithPassword(email, password));

  const figures = pb.collection("Figure");
  const series = pb.collection("Series");
  const subSeries = pb.collection("SubSeries");
  const subSeriesVariations = pb.collection("SubSeriesVariation");
  const figureVariations = pb.collection("FigureVariation");
  const packaging = pb.collection("Packaging");
  const variations = pb.collection("Variation");

  const data = fs.readFileSync("../html-parser/data.json", "utf8");
  let json = JSON.parse(data);

  let dbFigures: { [key: string]: string } = {};
  for (let object of json) {
    let seriesData = new FormData();
    seriesData.append("seriesLetter", object.seriesLetter);
    const seriesRecord = await series.create(seriesData);

    for (let sub of object.subSeries) {
      let subSeriesData = new FormData();

      if (sub.packaging != null) {
        for (const packag of sub.packaging) {
          var packageData = new FormData();

          for (const path of packag.images) {
            try {
              const data = fs.readFileSync(path);
              const blob = new Blob([data], { type: getTypeHeader(path) });
              packageData.append("images", blob, path.split("\\").pop());
            } catch (Error) {
              continue;
            }
          }
          if (packag.name) packageData.append("name", packag.name);
          if (packag.thanks) packageData.append("thanks", packag.thanks);
          const record = await packaging.create(packageData);
          subSeriesData.append("packaging", record.id);
        }
      }

      subSeriesData.append("name", sub.name);
      subSeriesData.append("thanks", sub.thanks);
      subSeriesData.append("seriesId", seriesRecord.id);
      const subSeriesRecord = await subSeries.create(subSeriesData);
      sub.recordId = subSeriesRecord.id;

      for (const figure of sub.figures) {
        let formData = new FormData();

        const promises = figure.pictures?.map(async (path: string) => {
          if (path.search("Detail.gif") >= 0) return;
          if (path.search("want_fig.jpg") >= 0) return;

          try {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            formData.append("pictures", blob, path.split("\\").pop());
          } catch (error) {}
        });

        if (!figure.mpgNr) continue;
        formData.append("mpgNr", figure?.mpgNr);
        if (figure.name) formData.append("name", figure?.name);
        if (figure.year) formData.append("year", figure?.year);
        if (figure.identifier)
          formData.append("identifier", figure?.identifier);
        if (figure.aufkleber) formData.append("sticker", figure?.sticker);
        if (figure.maxi) formData.append("maxi", figure?.maxi);
        if (figure.note) formData.append("note", figure?.note);
        if (figure.fake) formData.append("fake", figure?.fake);
        if (figure.questionable)
          formData.append("questionable", figure?.questionable);
        if (figure.year) formData.append("year", figure.year);
        if (figure.header) formData.append("header", figure.header);

        formData.append("subSeriesId", subSeriesRecord.id);

        await Promise.all(promises || []);

        try {
          const insertedFig = await figures.create(formData);
          dbFigures[figure.mpgNr] = insertedFig.id;
        } catch (Error) {
          console.log(
            `Figure ${figure.mpgNr} does not exist and could also not be inserted`
          );
        }
      }
    }
  }

  for (const object of json) {
    for (const sub of object.subSeries) {
      for (const variation of sub.variations) {
        let subVariation = new FormData();

        if (variation.year) subVariation.append("year", variation.year);
        if (variation.country)
          subVariation.append("country", variation.country);
        if (variation.note) subVariation.append("note", variation.note);

        if (variation.images) {
          for (const path of variation.images) {
            if (path.search("want_bpz.jpg") >= 0) continue;
            try {
              const data = fs.readFileSync(path);
              const blob = new Blob([data], { type: getTypeHeader(path) });
              subVariation.append("images", blob);
            } catch (Error) {}
          }
        }

        let packages: FormData[] = [];
        if (variation.pckgi) {
          for (const pckgi of variation.pckgi) {
            let formData = new FormData();

            for (const path of pckgi?.picture) {
              try {
                if (path.search("want_bpz.jpg") >= 0) continue;
                const data = fs.readFileSync(path);
                const blob = new Blob([data], { type: getTypeHeader(path) });
                formData.append("packageInserts", blob);
              } catch (Error) {
                continue;
              }
            }

            let figureId = dbFigures[pckgi.mpgNr];
            if (figureId == undefined) {
              console.log("Ressource not found: " + pckgi.mpgNr);
              continue;
            }

            formData.append("figureId", figureId);
            packages.push(formData);
          }
        }
        subVariation.append("subSeriesId", sub.recordId);
        const record = await subSeriesVariations.create(subVariation);

        for (let formData of packages) {
          formData.append("subSeriesVariationId", record.id);
          await figureVariations.create(formData);
        }
      }

      if (sub.figureVariations == null) continue;
      for (const variation of sub?.figureVariations) {
        let figureId = dbFigures[variation.mpgNr];
        if (figureId == undefined) {
          console.log("Ressource not found: " + variation.mpgNr);
          continue;
        }
        let formData = new FormData();

        if (variation.images) {
          for (const path of variation?.images) {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            formData.append("images", blob, path.split("\\").pop());
          }
        }
        formData.append("variation", variation.variation);
        const record = await variations.create(formData);

        await figures.update(figureId, {
          "variations+": record.id,
        });
      }
    }
  }
}

async function addExtras() {
  console.log(await pb.admins.authWithPassword(email, password));
  const data = fs.readFileSync("../html-parser/extras.json", "utf8");
  const json = JSON.parse(data);
  const extras = pb.collection("Extra");
  const extraTypes = pb.collection("ExtraType");

  for (const extra of json) {
    let formData = new FormData();

    if (extra.types) {
      let typeCount = 1;
      for (const type of extra.types) {
        let extraData = new FormData();
        extraData.append("name", `Typ ${typeCount}`);
        typeCount += 1;

        for (const path of type) {
          try {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            extraData.append("images", blob, path.split("\\").pop());
          } catch (Error) {
            continue;
          }
        }
        const record = await extraTypes.create(extraData);
        formData.append("types", record.id);
      }
    }

    formData.append("numbered", extra.numbered);

    if (extra.format) formData.append("format", extra.format);
    if (extra.name) formData.append("name", extra.name);
    if (extra.text) formData.append("text", extra.text);
    if (extra.id) formData.append("identifier", extra.id);
    if (extra.address) formData.append("address", extra.address);
    if (extra.series) formData.append("series", extra.series);
    if (extra.year) formData.append("year", extra.year);
    if (extra.note) formData.append("note", extra.note);
    if (extra.thanks) formData.append("thanks", extra.thanks);

    await extras.create(formData);
  }
}

async function addWarnings() {
  await pb.admins.authWithPassword(email, password);
  const data = fs.readFileSync("../html-parser/warnings.json", "utf8");
  const json = JSON.parse(data);
  const warnings = pb.collection("Warning");
  const warningTypes = pb.collection("WarningType");

  for (const warning of json) {
    let formData = new FormData();

    if (warning.varTypes) {
      for (const type of warning.varTypes) {
        let warningData = new FormData();
        warningData.append("name", type.typeName);

        for (const path of type.images) {
          try {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            warningData.append("images", blob, path.split("\\").pop());
          } catch (Error) {}
        }
        const record = await warningTypes.create(warningData);
        formData.append("types", record.id);
      }
    } else {
      let warningData = new FormData();
      warningData.append("name", "Typ 1");

      if (warning.imgs) {
        for (const path of warning.imgs) {
          try {
            const data = fs.readFileSync(path);
            const blob = new Blob([data], { type: getTypeHeader(path) });
            warningData.append("images", blob, path.split("\\").pop());
          } catch (Error) {}
        }
      }
      const record = await warningTypes.create(warningData);
      formData.append("types", record.id);
    }

    formData.append("numbered", warning.numbered);
    if (warning.general) formData.append("general", warning.general);
    if (warning.header) {
      try {
        const data = fs.readFileSync(warning.header);
        const blob = new Blob([data], { type: getTypeHeader(warning.header) });
        formData.append("header", blob);
      } catch (Error) {}
    }
    if (warning.countryA) formData.append("countryA", warning.countryA);
    if (warning.countryB) formData.append("countryB", warning.countryB);
    if (warning.format) formData.append("format", warning.format);
    if (warning.variations) formData.append("variations", warning.variations);
    if (warning.name) formData.append("name", warning.name);
    if (warning.thanks) formData.append("thanks", warning.thanks);

    warnings.create(formData);
  }
}

async function dropAll(collectionName: string) {
  await pb.admins.authWithPassword(email, password);
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
        dropAll("Warning");
        dropAll("WarningType");
        dropAll("Extra");
        dropAll("ExtraType");
        return;
      case "--drop-figures":
        dropAll("Series");
        dropAll("Figure");
        dropAll("FigureVariation");
        dropAll("SubSeries");
        dropAll("SubSeriesVariation");
        dropAll("Packaging");
        return;
      case "--add":
        add();
        return;
      case "--add-all":
        add();
        addWarnings();
        addExtras();
        return;
      case "--add-warnings":
        addWarnings();
        return;
      case "--drop-warnings":
        dropAll("Warning");
        dropAll("WarningType");
        return;
      case "--add-extras":
        addExtras();
        return;
      case "--drop-extras":
        dropAll("Extra");
        dropAll("ExtraType");
        return;
    }
  });
}

main();
