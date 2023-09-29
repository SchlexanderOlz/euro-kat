export interface Figure {
	id: string;
	created: string;
	modified: string; // TODO: change DateTime to string
	mpgNr: string;
	fake: boolean;
	questionable: boolean;
	variations: Variation[];
	name: string;
	sticker: boolean;
	identifier: string;
	note: string;
	pictures: string[]; // TODO: Find out how pictures are fetched
	figureVariations: FigureVariation[];
	packageInserts: string[]; // Just images currently
	year: string;
}

export interface Packaging {
	id: string;
	created: string;
	modified: string;
	images: string[];
	name: string;
	thanks: string;
}

export interface FigureVariation {
	id: string;
	created: string;
	modified: string;
	packageInserts: string[]; // Not how pictures are retrieved
}

export interface Variation {
	id: string;
	created: string;
	modified: string;
	variation: string;
	images: string[];
}

export interface SubSeriesVariation {
	id: string;
	created: string;
	update: string;
	year: number;
	figuresVariation: FigureVariation[];
	note: string;
	country: string;
}

export interface SubSeries {
	id: string;
	created: string;
	updated: string;
	name: string;
	thanks: string;
	subSeriesVariations: SubSeriesVariation[];
	packaging: Packaging[];
}

export interface Series {
	id: string;
	created: string;
	updated: string;
	seriesLetter: string;
	subSeries: SubSeries[];
}

export interface Warning {
	id: string;
	created: string;
	updated: string;
	name: string;
	numbered: boolean;
	general: string;
	header: string;
	countryA: string;
	countryB: string;
	format: string;
	variations: string;
	types: WarningType[]
}

export interface WarningType {
	id: string;
	created: string;
	updated: string;
	name: string;
	images: string[];
}

export interface Extra {
	id: string;
	created: string;
	updated: string;
	numbered: boolean;
	name: string;
	text: string;
	identifier: string;
	address: string;
	format: string;
	series: string;
	year: string;
	note: string;
	thanks: string;
	types: ExtraType[];
}

export interface ExtraType {
	id: string;
	created: string;
	updated: string;
	images: string[];
}

export interface FigurePage {
	id: string;
	created: string;
	modified: string;
	mpgNr: string;
	fake: boolean;
	questionable: boolean;
	variations: Variation[];
	name: string;
	sticker: boolean;
	identifier: string;
	note: string;
	pictures: string[];
	figureVariations: FigureVariation[];
	packageInserts: string[];
	year: string;
	subSeriesVariation: SubSeriesVariation[];
	subSeries: SubSeries
}