export interface Figure {
	mpgNr: string;
	name: string;
	sticker: boolean;
	identifier: string;
	note: string;
	pictures: string[]; // Pictues are Base64 encoded
	countryVariations: CountryVariation[];
	packageInserts: string[] // Just images currently
	year: string;
}

export interface CountryVariation {
	country: string;
	year: number;
	note: string;
	images: string[]
}

export interface SubSeries {
	name: string;
	country: string;
	thanks: string;
	year: number;
	figures: Figure[];
}

export interface Series {
	seriesLetter: string;
	subSeries: SubSeries[];
}

export interface Variation {
	variation: string;
	picture: string; // Base64 string
}

