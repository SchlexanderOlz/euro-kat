import type { ListResult, RecordService } from 'pocketbase';
import { connection, figureInitLoadCount } from './PocketBase';
import type { Figure } from './Types';
import { userId } from './Stores';
import { get } from 'svelte/store';

export class FigurFilterBuilder {
	required: Set<string>;
	figureCollection: RecordService<Figure>;
	optional: Set<string>;
	sort: Set<string>;
	currentPage: number = 1;
	user_id?: string;

	constructor() {
		this.figureCollection = connection.collection('Figure');
		this.optional = new Set();
		this.required = new Set();
		this.sort = new Set();
		this.sortByMpgNr();
	}

	private startIsContainedRequired(start: string) {
		return Array.from(this.required).some((elem) => elem.startsWith(start));
	}

	private startIsContainedOptional(start: string) {
		return Array.from(this.optional).some((elem) => elem.startsWith(start));
	}

	private toggleBoolConatined(field: string) {
		if (this.required.has(`${field}=true`)) {
			this.required.delete(`${field}=true`);
			this.required.add(`${field}=false`);
		} else {
			this.required.delete(`${field}=false`);
			this.required.add(`${field}=true`);
		}
	}

	private getRequiredFilterValue(start: string): string {
		for (const elem of this.required) {
			if (elem.startsWith(start)) return elem.replace(start, '').replaceAll("'", '');
		}
		return '';
	}

	private getOptionalFilterValue(start: string): string {
		for (const elem of this.optional) {
			if (elem.startsWith(start)) return elem.replace(start, '').replaceAll("'", '');
		}
		return '';
	}

	currentSeries() {
		if (
			this.findRemove(
				'(subSeriesId.seriesId.currentSeries=true||subSeriesId.currentSeries=true)',
				this.required
			) &&
			this.killMaxi()
		)
			return;
		this.toggleSort('maxi');
		this.required.add('(subSeriesId.seriesId.currentSeries=true||subSeriesId.currentSeries=true)');
	}

	killMaxi(): boolean {
		return this.findRemove('+maxi', this.sort);
	}

	public get isCurrentTriggered(): boolean {
		return this.startIsContainedRequired(
			'(subSeriesId.seriesId.currentSeries=true||subSeriesId.currentSeries=true)'
		);
	}

	changed() {
		if (this.findRemove('updated>=', this.required)) return;
		let date = new Date();
		date.setMonth(date.getMonth() - 1);
		this.required.add(`updated>='${this.formatDate(date)}'`);
	}

	public get isChangedTriggered(): boolean {
		return this.startIsContainedRequired('updated>=');
	}

	maxi() {
		if (this.findRemove('(maxi=true', this.required)) return;
		this.required.add(`(maxi=true||subSeriesId.name~'maxi')`);
	}

	public get isMaxiTriggered(): boolean {
		return this.startIsContainedRequired('(maxi=true');
	}

	fake() {
		if (this.findRemove('fake=true', this.required)) return;
		this.required.add('fake=true');
	}

	isFakeTriggered(): boolean {
		return this.startIsContainedRequired('fake=');
	}

	questionable() {
		if (this.findRemove('questionable=true', this.required)) return;
		this.required.add('questionable=true');
	}

	public get isQuestionableTriggered(): boolean {
		return this.startIsContainedRequired('questionable=');
	}

	sticker() {
		if (this.findRemove('sticker=true', this.required)) return;
		this.required.add('sticker=true');
	}

	public get isStickerTriggered(): boolean {
		return this.startIsContainedRequired('sticker=');
	}

	byYearBegin(year: number | undefined) {
		this.findRemove('year>=', this.required);
		this.required.add(`year>=${year}`);
	}

	public get yearBegin(): number {
		return Number.parseInt(this.getRequiredFilterValue('year>='));
	}

	public get yearEnd(): number {
		return Number.parseInt(this.getRequiredFilterValue('year<='));
	}

	byYearEnd(year: number | undefined) {
		this.findRemove('year<=', this.required);
		this.required.add(`year<=${year}`);
	}

	public get year(): number {
		return Number.parseInt(this.getRequiredFilterValue('year='));
	}

	byYear(year: number | undefined) {
		this.findRemove('year=', this.required);
		if (year == undefined) return;
		this.required.add(`year='${year}'`);
	}

	byName(name: string) {
		this.findRemove('name~', this.optional);
		this.optional.add(`name~'${name}'`);
	}

	public get name(): string {
		return this.getOptionalFilterValue('name~');
	}

	byIdentifier(id: string) {
		this.findRemove('identifier~', this.optional);
		this.optional.add(`identifier~'${id}'`);
	}

	public get identifier(): string {
		return this.getOptionalFilterValue('identifier~');
	}

	byNote(note: string) {
		this.findRemove('note~', this.optional);
		this.optional.add(`note~'${note}'`);
	}

	public get note(): string {
		return this.getOptionalFilterValue('note~');
	}

	byId(id: string) {
		this.findRemove('id=', this.required);
		this.required.add(`id='${id}'`);
	}

	public get id(): string {
		return this.getRequiredFilterValue('id=');
	}

	byMpgNr(mpgNr: string) {
		this.findRemove('mpgNr=', this.optional) ||
			this.findRemove('subSeriesId.seriesId.seriesLetter', this.optional);

		let match = /^(?!^[0-9][A-Za-z]$).*((\d|[0-9][A-Z]))$/;
		if (match.test(mpgNr)) this.optional.add(`mpgNr='${mpgNr}'`);
		else this.optional.add(`subSeriesId.seriesId.seriesLetter='${mpgNr}'`);
	}

	public get mpgNr(): string {
		return (
			this.getOptionalFilterValue('mpgNr=') ||
			this.getOptionalFilterValue('subSeriesId.seriesId.seriesLetter=')
		);
	}

	byCountry(country: string) {
		this.findRemove('country=', this.required);
		this.required.add(`country='${country}'`);
	}

	public get country(): string {
		return this.getRequiredFilterValue('country~');
	}

	bySubSeries(name: string) {
		this.findRemove('subSeriesId.name~', this.optional);
		this.optional.add(`subSeriesId.name~'${name}'`);
	}

	public get SubSerie(): string {
		return this.getOptionalFilterValue('subSeriesId.name~');
	}

	sortByNote() {
		this.killMpgNr();
		this.killName();
		this.toggleSort('note');
	}

	public get sortNote(): boolean {
		return !this.sort.has('-note');
	}

	killNote() {
		this.findRemove('+note', this.sort);
		this.findRemove('-note', this.sort);
	}

	sortByMpgNr() {
		this.killNote();
		this.killName();
		this.toggleSort('mpgNr');
	}

	public get sortMpgNr(): boolean {
		return !this.sort.has('-mpgNr');
	}

	killMpgNr() {
		this.findRemove('+mpgNr', this.sort);
		this.findRemove('-mpgNr', this.sort);
	}

	sortByName() {
		this.killMpgNr();
		this.killNote();
		this.toggleSort('name');
	}

	public get sortName(): boolean {
		return !this.sort.has('-name');
	}

	killName() {
		this.findRemove('+name', this.sort);
		this.findRemove('-name', this.sort);
	}

	mine() {
		if (this.findRemove('FigureVariation_via_figureId.habIch?=true', this.required)) return;
		this.required.add('FigureVariation_via_figureId.habIch?=true');
	}

	myFigures() {
		if (!get(userId)) return;
		if (this.findRemove('collection_via_figure_id.user_id?=', this.required)) return;
		this.required.add(`collection_via_figure_id.user_id?='${get(userId)}'`);
	}

	wishes() {
		if (!get(userId)) return;
		if (this.findRemove('wishes_via_figure_id.user_id?=', this.required)) return;
		this.required.add(`wishes_via_figure_id.user_id?='${"5yand3ub6991lqv"}'`);
	}

	public get isMyFiguresTriggered() {
		return this.startIsContainedRequired(`collection_via_figure_id.user_id?=`);
	}

	public get isMineTriggered() {
		return this.startIsContainedRequired('FigureVariation_via_figureId.habIch?=');
	}

	public get isWishesTriggered() {
		return this.startIsContainedRequired('wishes_via_figure_id.user_id?=');
	}

	private formatDate(date: Date): string {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	private toggleSort(sortName: string) {
		for (const sort of this.sort) {
			if (sort.startsWith('-' + sortName)) {
				this.sort.delete(sort);
				this.sort.add('+' + sortName);
				return;
			}

			if (sort.startsWith('+' + sortName)) {
				this.sort.delete(sort);
				this.sort.add('-' + sortName);
				return;
			}
		}
		this.sort.add('+' + sortName);
	}

	private findRemove(search: string, lookupList: Set<string>): boolean {
		for (const element of lookupList.values()) {
			if (element.startsWith(search)) {
				lookupList.delete(element);
				return true;
			}
		}
		return false;
	}

	async run(): Promise<ListResult<Figure>> {
		if (this.required.size == 0 && this.optional.size == 0 && this.sort.size == 0)
			return await this.figureCollection.getList(this.currentPage, figureInitLoadCount);

		let query = '';
		if (this.required.size > 0) {
			query = Array.from(this.required).join('&&');
			if (this.optional.size > 0) query += '&&(';
		}
		if (this.optional.size > 0) {
			query += Array.from(this.optional).join('||');
			if (this.required.size > 0) {
				query += ')';
			}
		}

		return structuredClone(
			await this.figureCollection.getList(this.currentPage, figureInitLoadCount, {
				filter: query,
				sort: Array.from(this.sort).join(','),
				expand: 'subSeriesId.seriesId,countryColor'
			})
		);
	}
}
const figureBuiler = new FigurFilterBuilder();
export default figureBuiler;
