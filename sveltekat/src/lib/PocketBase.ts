// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Country,
	Packaging,
	Figure,
	Variation,
	CountryVariation,
	PackageInsert
} from './Types';

const country: Country = {
	id: 5,
	countryName: 'Austria'
};

const packaging: Packaging = {
	description: 'This is a package',
	pictures: ['binary code', 'other binary code']
};

const variation: Variation = {
	variationId: 10,
	variation: 'Has a cock',
	picture: 'a picture of variation'
};

const countryVariation: CountryVariation = {
	countryVariationId: 10,
	country: country,
	year: 1999,
	note: 'This is a variaiton'
};

const packageInserts: PackageInsert = {
	description: 'This ís the basic package_insert',
	picture: ['This is a picture']
};

const figures: Figure[] = [
	{
		figureId: 10,
		mpgNr: 2349,
		figureName: 'Deine mum',
		fake: true,
		sticker: false,
		identifier: true,
		note: 'Nice cook',
		variation: variation,
		pictures: ['a picture 1', 'a picture 2'],
		countryVariations: [countryVariation],
		packageInserts: [packageInserts, packageInserts]
	}
];

const subSeries: SubSeries = {
	subSeriesId: 420,
	serialName: 'Deine mum',
	country: country,
	thanks: 'Thank you!!!!',
	releaseYear: 420,
	packaging: packaging,
	figures: figures
};
const series: Series = {
	seriesId: 69,
	idLetters: 'mpkg',
	year: 1420,
	subSeries: [subSeries, subSeries]
};

const pb: PocketBase = new PocketBase('http://127.0.0.1:8090');

export async function getSubSeriesByLetter(seriesLetter: string): Promise<SubSeries> {
	if (seriesLetter === 'soos') {
		throw TypeError('Damn mann you litttle suusy bucka');
	}
	return subSeries;
}

export async function getSeries(): Promise<Series> {
	return series;
}

export async function getFigureOfSeries(series: string) {
	return figures;
}
