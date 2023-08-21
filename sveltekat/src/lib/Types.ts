export interface Figure {
	figureId: number;
	mpgNr: number;
	figureName: string;
	fake: boolean;
	sticker: boolean;
	identifier: boolean;
	note: string;
	variation: Variation;
	pictures: string[]; // Pictues are Base64 encoded
	countryVariations: CountryVariation[];
	packageInserts: PackageInsert[];
  releaseYear: string;
}

export interface CountryVariation {
	countryVariationId: number;
	country: Country;
	year: number;
	note: string;
}

export interface PackageInsert {
	description: string;
	picture: string[]; // Pictures are Base64 encoded
}

export interface SubSeries {
	subSeriesId: number;
	serialName: string;
	country: Country;
	thanks: string;
	releaseYear: number;
	packaging: Packaging;
	figures: Figure[];
}

export interface Packaging {
	description: string;
	pictures: string[]; // Pictures are Base64 encoded
}

export interface Series {
	seriesId: number;
	idLetters: string;
	year: number;
	subSeries: SubSeries[];
}

export interface Variation {
	variationId: number;
	variation: string;
	picture: string; // Base64 string
}

export interface Series {
	seriesId: number;
	idLetters: string;
	year: number;
}

export interface Country {
	id: number;
	countryName: string;
}
