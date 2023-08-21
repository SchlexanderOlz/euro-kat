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
import type { List } from "postcss/lib/list";


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

  async run() : Promise<Figure[]> {
    // Remove this implicit copy -> f.e. manull iteration
    return await this.figureCollection.getFullList({ "filter" : Array.from(this.filter).join("&&") });
  }
}
