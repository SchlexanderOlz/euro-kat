export interface Figure {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;

	mpgNr: number;
	figureName: string;
	fake: boolean;
	sticker: boolean;
	identifier: string;
	note: string;
	variation: Variation;
	pictures: string[]; // Pictues are Base64 encoded
	countryVariations: CountryVariation[];
	packageInserts: PackageInsert[];
  	releaseYear: number;
}

export interface CountryVariation {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;

	country: Country;
	year: number;
	note: string;
}

export interface PackageInsert {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	description: string;
	picture: string[]; // Pictures are Base64 encoded
}

export interface SubSeries {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	serialName: string;
	country: Country;
	thanks: string;
	releaseYear: number;
	packaging: Packaging;
	figures: Figure[];
}

export interface Packaging {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	description: string;
	pictures: string[]; // Pictures are Base64 encoded
}

export interface Series {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	idLetters: string;
	year: number;
	subSeries: SubSeries[];
}

export interface Variation {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	variation: string;
	picture: string; // Base64 string
}


export interface Country {
	collectionId: string;
	collectionName : string;
	id : string;
	created: string;
	updated: string;
	
	countryName: string;
}

/**
 * changes:
 * -figurepicture
 * -picture
 * -PackagingPictures
 * -FigureInOtherCountries
 * 
 * pictures now stored in tables instead of foreign key and junction tables
 * 
 * 
 * 
 * 
 * Questions for 23.08.2023:
 * 
 * 1. Warum gibts zwei mal series?
 * 2. Warum sind Packaging und packagingInsert das gleiche? Fehlt da vllt der Verweis auf eine andere Collection? Was ist der Unterschied?
 */
