import type { Collection, RecordService } from 'pocketbase';
import { connection, figureInitLoadCount } from './PocketBase';
import type { Series, SubSeries, Figure } from './Types';

export class FigurFilterBuilder {
	filter: Set<string>;
  expand: string;
	figureCollection: RecordService<Figure>;

	constructor() {
		this.figureCollection = connection.collection('Figure');
    this.expand = "";
		this.filter = new Set();
	}

	fake() {
    this.toggleBoolConatined("fake")
	}

  private toggleBoolConatined(field: string) {
		if (this.filter.has(`${field}=true`)) {
			this.filter.delete(`${field}=true`);
			this.filter.add(`${field}=false`);
		} else {
			this.filter.delete(`${field}=false`);
			this.filter.add(`${field}=true`);
		}
  }

	questionable() {
    this.toggleBoolConatined("questionable")
	}

	sticker() {
    this.toggleBoolConatined("sticker")
	}

  yearBegin(year: number | undefined) {
    this.findRemove('year>=')
    this.filter.add(`year>=${year}`)
  }

  yearEnd(year: number | undefined) {
    this.findRemove('year<=')
    this.filter.add(`year<=${year}`)
  }

	year(year: number | undefined) {
		const found = this.findRemove('year=');
		if (found) return;
		this.filter.add(`year=${year}`);
	}

  name(name: string) {
    this.findRemove("name ~")
    this.filter.add(`name ~ "${name}"`)
  }

  identifier(id: string) {
    this.findRemove("identifier~")
    this.filter.add(`identifier~ "${id}"`)
  }

  note(note: string) {
    this.findRemove("note~")
    this.filter.add(`note~${note}`)
  }

  id(id: string) {
    this.findRemove("id=")
    this.filter.add(`id=${id}`)
  }

	mpgnumber(mpgNr: string | undefined) {
		this.findRemove('mpgNr ~');
		this.filter.add(`mpgNr ~ "${mpgNr}"`);
	}

  country(country: string) {
    if (!(this.expand == "FigureVariation,SubSeriesVariation(figureVariation).country")) {
      this.expand = "FigureVariation,SubSeriesVariation(figureVariation).country"
    }

    this.findRemove("country=")
    this.filter.add(`country=${country}`)
  }

	private findRemove(search: string) {
		for (const element of this.filter.values()) {
			if (element.startsWith(search)) {
				this.filter.delete(element);
				return true;
			}
		}
		return false;
	}

	async run(): Promise<Figure[]> {
		// Remove this implicit copy -> f.e. manull iteration
		return structuredClone(
			// TODO: How to handle multiple pages
			(await this.figureCollection.getList(1, figureInitLoadCount, { filter: Array.from(this.filter).join(' && '), expand: this.expand })).items
		);
	}
}

export let figureBuilder = new FigurFilterBuilder();
