import type { Collection, RecordService } from "pocketbase";
import { connection } from "./PocketBase"
import type {
	Series,
	SubSeries,
	Figure,
} from './Types';

export class FigurFilterBuilder {
  filter: Set<string>;
  figureCollection: RecordService 
  constructor() {
    this.figureCollection = connection.collection("Figure"); 
    this.filter = new Set()
  }

  fake() {
    if (this.filter.has("fake=true")) {
      this.filter.delete("fake=true")
      this.filter.add("fake=false")
    } else {
      this.filter.delete("fake=false")
      this.filter.add("fake=true")
    }
  }

  sticker() {
    if (this.filter.has("sticker=true")) {
      this.filter.delete("sticker=true")
      this.filter.add("sticker=false")
    } else {
      this.filter.delete("sticker=false")
      this.filter.add("sticker=true")
    }
  }

  yearRange(year : number){
    // NOTE: Think about implemening this as a range-query on second-call
    // TODO: Handle the case where there was already a range inserted befores
    for (const value of this.filter.values()) {
      if (value.startsWith('year=')) {
        const oldYear = Number.parseInt(value.split("=")[1])
        this.filter.delete(value);
        const older = Math.min(year, oldYear)
        const younger = Math.max(year, oldYear)
        this.filter.add(`year>=${older} && year<=${younger}`)
        return;
      }
    }
    this.filter.add(`year=${year}`)
  }

  year(year : number) {
    const found = this.findRemove("year")
    if (found) return
    this.filter.add(`year=${year}`)
  }

  mpgnumber(mpgNr: string | undefined){
    const found = this.findRemove("mpgNr")
    if (found) return
    this.filter.add(`mpgNr=${mpgNr}`)
  }

  private findRemove(search: string) {
    for (const element of this.filter.values()) {
      if (element.startsWith(search)) {
        this.filter.delete(element)
        return true
      }
    }
    return false
  }

  async run() : Promise<Figure[]> {
    // Remove this implicit copy -> f.e. manull iteration
    return structuredClone(await this.figureCollection.getFullList({ "filter" : Array.from(this.filter).join(" && ") }));
  }
}

export let figureBuilder = new FigurFilterBuilder()
