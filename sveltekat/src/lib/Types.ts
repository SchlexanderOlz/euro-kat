export interface Figure {
	id: string;
	created: Date;
	modified: Date; // TODO: change DateTime to string
	mpgNr: string;
	fake: boolean;
	questionable: boolean;
	variations: Variation[]
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
	created: Date;
	modified: Date;
	images: string[];
	name: string
	thanks: string
}

export interface FigureVariation {
	id: string;
	created: Date;
	modified: Date;
	packageInserts: string[] // Not how pictures are retrieved
}

export interface Variation {
	id: string;
	created: Date;
	modified: Date;
	variation: string;
	images: string[]
}


export interface SubSeriesVariation {
	id: string;
	created: Date;
	update: Date;
	year: number;
	figuresVariation: FigureVariation[];
	note: string;
  country: string
}

export interface SubSeries {
	id: string;
	created: Date;
	updated: Date;
	name: string;
	thanks: string;
	subSeriesVariations: SubSeriesVariation[];
	packaging: Packaging[]
}

export interface Series {
	id: string;
	created: Date;
	updated: Date;
	seriesLetter: string;
	subSeries: SubSeries[];
}

export interface Warning {
	id: string;
	created: Date;
	updated: Date;
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
	created: Date;
	updated: Date;
	name: string;
	images: string[];
}

export interface Extra {
	id: string;
	created: Date;
	updated: Date;
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
	created: Date;
	updated: Date;
	images: string[];
}