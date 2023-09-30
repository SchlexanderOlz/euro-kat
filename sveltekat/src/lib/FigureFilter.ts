import type { Collection, RecordService } from 'pocketbase';
import { connection, figureInitLoadCount } from './PocketBase';
import type { Series, SubSeries, Figure } from './Types';

export class FigurFilterBuilder {
	filter: Set<string>;
	figureCollection: RecordService<Figure>;
	optionals: Set<string>;

	constructor() {
		this.figureCollection = connection.collection('Figure');
		this.optionals = new Set();
		this.filter = new Set();
	}

	fake() {
		this.toggleBoolConatined('fake');
	}

	killFake() {
		this.findRemove("fake", this.filter)
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
		this.toggleBoolConatined('questionable');
	}

	killQuestionable() {
		this.findRemove("questionable", this.filter)
	}

	sticker() {
		this.toggleBoolConatined('sticker');
	}

	killSticker() {
		this.findRemove("sticker", this.filter)
	}

	yearBegin(year: number | undefined) {
		this.findRemove('year>=', this.filter);
		this.filter.add(`year>="${year}"`);
	}

	yearEnd(year: number | undefined) {
		this.findRemove('year<=', this.filter);
		this.filter.add(`year<="${year}"`);
	}

	year(year: number | undefined) {
		this.findRemove('year=', this.filter);
		if (year == undefined) return;
		this.filter.add(`year="${year}"`);
	}

	name(name: string) {
		this.findRemove('name~', this.optionals);
		this.optionals.add(`name~"${name}"`);
	}

	identifier(id: string) {
		this.findRemove('identifier~', this.optionals);
		this.optionals.add(`identifier~"${id}"`);
	}

	note(note: string) {
		this.findRemove('note~', this.optionals);
		this.optionals.add(`note~"${note}"`);
	}

	id(id: string) {
		this.findRemove('id=', this.filter);
		this.filter.add(`id="${id}"`);
	}

	mpgnumber(mpgNr: string | undefined) {
		this.findRemove('mpgNr~', this.optionals);
		this.optionals.add(`mpgNr~"${mpgNr}"`);
	}

	country(country: string) {
		this.findRemove('country=', this.filter);
		this.filter.add(`country="${country}"`);
	}

	private findRemove(search: string, lookupList: Set<string>) {
		for (const element of lookupList.values()) {
			if (element.startsWith(search)) {
				lookupList.delete(element);
				return true;
			}
		}
		return false;
	}

	async run(): Promise<Figure[]> {
		if (this.filter.size == 0 && this.optionals.size == 0) return await this.figureCollection.getList(1, figureInitLoadCount);

		let query = "";
		if (this.filter.size > 0) {
			query = Array.from(this.filter).join("&&")
			if (this.optionals.size > 0) query += "&&("
		}
		if (this.optionals.size > 0) {
			query += Array.from(this.optionals).join("||")
			if (this.filter.size > 0) {
				query += ")"
			}
		}

		return structuredClone(
			// TODO: How to handle multiple pages
			(
				await this.figureCollection.getList(1, figureInitLoadCount, {
					filter: query,
					expand: "subSeriesId"
				})
			).items
		);
	}
}

export let figureBuilder = new FigurFilterBuilder();
