// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Figure,
	Variation,
	CountryVariation,
} from './Types';

export type { Series, SubSeries, CountryVariation, Figure };

const variation: Variation = {
	collectionId: '3',
	collectionName: 'Variation',
	id: '1',
	created: 'cre',
	updated: 'up',
	variation: 'Has a cock',
	picture: 'a picture of variation'
};

const countryVariation: CountryVariation = {
	collectionId: '4',
	collectionName: 'CountryVariation',
	id: '1',
	created: 'cre',
	updated: 'up',
	country: country,
	year: 1999,
	note: 'This is a variaiton'
};

const packageInserts: PackageInsert = {
	collectionId: '5',
	collectionName: 'PackageInsert',
	id: '1',
	created: 'cre',
	updated: 'up',
	description: 'This ís the basic package_insert',
	picture: ['This is a picture']
};

export const figures: Figure[] = [
	{
		collectionId: '6',
		collectionName: 'Figure',
		id: '1',
		created: 'cre',
		updated: 'up',
		mpgNr: 2349,
		figureName: 'Deine mum',
		fake: true,
		sticker: false,
		identifier: '1234',
		note: 'Nice cook',
		variation: variation,
		pictures: ['a picture 1', 'a picture 2'],
		countryVariations: [countryVariation],
		packageInserts: [packageInserts, packageInserts],
		releaseYear: 2020
	},
	{
		collectionId: '6',
		collectionName: 'Figure',
		id: '2',
		created: 'cre',
		updated: 'up',
		mpgNr: 2350,
		figureName: 'Dein dad',
		fake: true,
		sticker: false,
		identifier: '5678',
		note: 'Nice cock',
		variation: variation,
		pictures: ['a picture 1', 'a picture 2'],
		countryVariations: [countryVariation],
		packageInserts: [packageInserts, packageInserts],
		releaseYear: 2022
	}
];

const subSeries: SubSeries = {
	collectionId: '7',
	collectionName: 'SubSeries',
	id: '1',
	created: 'cre',
	updated: 'up',
	serialName: 'Deine mum',
	country: country,
	thanks: 'Thank you!!!!',
	releaseYear: 420,
	packaging: packaging,
	figures: figures
};
const series: Series = {
	collectionId: '8',
	collectionName: 'Series',
	id: '1',
	created: 'cre',
	updated: 'up',
	idLetters: 'mpkg',
	year: 1420,
	subSeries: [subSeries, subSeries]
};

export const connection: PocketBase = new PocketBase('https://ek.krenn.tech/_/');

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

export async function insertSeries(series: Series) {
	connection.collections.create('series', series);
}
