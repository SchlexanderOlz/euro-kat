export interface Figure {
	id: string;
	created: DateTime;
	modified: DateTime;
	mpgNr: string;
	name: string;
	sticker: boolean;
	identifier: string;
	note: string;
	pictures: string[]; // TODO: Find out how pictures are fetched
	figureVariations: FigureVariation[];
	packageInserts: string[]; // Just images currently
	year: string;
}

export interface FigureVariation {
	id: string;
	created: DateTime;
	modified: DateTime;
	packageInserts: string[] // Not how pictures are retrieved
}


export interface SubSeriesVariation {
	id: string;
	created: DateTime;
	update: DateTime;
	year: number;
	figuresVariation: FigureVariation[];
	note: string;
}

export interface SubSeries {
	id: string;
	created: DateTime;
	updated: DateTime;
	name: string;
	thanks: string;
	subSeriesVariations: SubSeriesVariation[];
}

export interface Series {
	id: string;
	created: DateTime;
	updated: DateTime;
	seriesLetter: string;
	subSeries: SubSeries[];
}
