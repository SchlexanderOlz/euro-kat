export interface Figure {
	collectionId: string;
	id: string;
	created: string;
	modified: string;
	mpgNr: string;
	fake: boolean;
	questionable: boolean;
	isCurrentSeries: boolean;
	variations: Variation[];
	name: string;
	header: string;
	sticker: boolean;
	identifier: string;
	note: string;
	pictures: string[];
	figureVariations: FigureVariation[];
	subSeries: SubSeries;
	packageInserts: string[];
	year: string;
	subSeriesId: string;
	isMarked: boolean;
	expand: {
		subSeriesId: SubSeries;
		countryColor?: CountryColor;
	};
}

export interface CountryColor {
  country: string;
  color: string;
}


export interface Packaging {
	id: string;
	collectionId: string;
	created: string;
	modified: string;
	images: string[];
	name: string;
	thanks: string;
}

export interface FigureVariation {
	id: string;
	collectionId: string;
	created: string;
	modified: string;
	packageInserts: string[]; // Not how pictures are retrieved
	figureId: Figure;
	subSeriesId: SubSeries;
	habIch: boolean;
	expand: {
		figureId: Figure;
	};
}

export interface Variation {
	id: string;
  collectionId: string;
	created: string;
	modified: string;
	variation: string;
	images: string[];
}

export interface SubSeriesVariation {
	collectionId: string;
	id: string;
	created: string;
	update: string;
	year: number;
	figuresVariation: FigureVariation[];
	note: string;
	country: string;
	expand: any;
	images: string[];
	figvars: FigureVariation[];
}

export interface SubSeries {
	id: string;
	collectionId: string;
	created: string;
	updated: string;
	name: string;
	thanks: string;
	subSeriesVariations: SubSeriesVariation[];
	packaging: Packaging[];
	expand: {
		'SubSeriesVariation(subSeriesId)': SubSeriesVariation[];
	};
}

export interface Series {
	id: string;
	created: string;
	updated: string;
	seriesLetter: string;
	subSeries: SubSeries[];
}

export interface WarningZ {
	id: string;
	name: string;
	numbered: boolean;
	general: string;
}

export interface WarningZD {
	id: string;
	collectionId: string;
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
	thanks: string;
	types: WarningType[];
	expand: {
		types: WarningType[];
	};
}

export interface WarningType {
	id: string;
	collectionId: string;
	created: string;
	updated: string;
	name: string;
	description: string;
	images: string[];
}

export interface Extra {
	id: string;
	created: string;
	updated: string;
	name: string;
	text: string;
}

export interface ExtraDetail {
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
	expand: {
		types: ExtraType[];
	};
}

export interface ExtraType {
	id: string;
	collectionId: string;
	created: string;
	updated: string;
	description: string;
	name: string;
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
	subSeries: SubSeries;
	expand: any;
}

export interface FigurePageCleaned {
	subSeriesFigures: Figure[];
	subser: SubSeries;
	subservars: SubSeriesVariation[];
  variations: Variation[];
}

export interface Article {
	created: Date,
	content: string
}

export interface Category {
  id: string | null;
  user_id: string;
  name: string;
  color: string;
}

export interface FigureData {
  id: string;
  user_id: string;
  figure_id: string;
  category_id: string;
  count: number;
}
