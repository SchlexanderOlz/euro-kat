import type { Collection, RecordService } from "pocketbase";
import { connection } from "./PocketBase"
import type {
	Series,
	SubSeries,
	Country,
	Packaging,
	Figure,
	Variation,
	CountryVariation,
	PackageInsert
} from './Types';


class FigurFilterBuilder {
  filter: Set<string>;
  figureCollection: RecordService 
  constructor() {
    this.figureCollection = connection.collection("Figure"); 
    this.filter = new Set()
  }

  fake() {
    this.filter.add("fake=true") 
  }

  sticker() {
    this.filter.add("sticker=true")
  }

  countryVariation(country : Country) {
    this.filter.add(`countryVariations.country=${country}`)
  }

  year(year : number){
    this.filter.add(`year=${year}`)
  }

  mpgnumber(mpgNum: number){
    this.filter.add(`mpgNr=${mpgNum}`)
  }

  async run() : Promise<Figure[]> {
    // Remove this implicit copy -> f.e. manull iteration
    return await this.figureCollection.getFullList({ "filter" : Array.from(this.filter).join(" && ") });
  }
}
