export interface Figure {
	figureId: Number;
	mpgNr: Number;
	figureName: string;
	fake: boolean;
	sticker: boolean;
	identifier: boolean;
	note: string;
	variation: Variation;
	pictures: string[]; // Pictues are Base64 encoded
	countryVariations: CountryVariation[];
	packageInserts: PackageInsert[];
}

export interface CountryVariation {
	countryVariationId: Number;
	country: Country;
	year: Number;
	note: string;
}

export interface PackageInsert {
	description: string;
	picture: string[]; // Pictures are Base64 encoded
}

export interface SubSeries {
	subSeriesId: Number;
	serialName: string;
	country: Country;
	thanks: string;
	releaseYear: Number;
	packaging: Packaging;
	figures: Figure[];
}

export interface Packaging {
	description: string;
	pictures: string[]; // Pictures are Base64 encoded
}

export interface Series {
	seriesId: Number;
	idLetters: string;
	year: Number;
	subSeries: SubSeries[];
}

export interface Variation {
	variationId: Number;
	variation: string;
	picture: string; // Base64 string
}

export interface Series {
	seriesId: Number;
	idLetters: string;
	year: Number;
}

export interface Country {
	id: Number;
	countryName: string;
}
