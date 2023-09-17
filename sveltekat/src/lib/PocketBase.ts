// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Figure,
	SubSeriesVariation,
	FigureVariation,
} from './Types';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation};
export const connection: PocketBase = new PocketBase('https://ek.krenn.tech/_/');

export async function getSubSeriesByLetter(seriesLetter: string): Promise<SubSeries> {
	if (seriesLetter === 'soos') {
		throw TypeError('Damn mann you litttle suusy bucka');
	}
}

export async function getSeries(): Promise<Series> {
}

export async function getFigureOfSeries(series: string) {
}

export async function insertSeries(series: Series) {
	connection.collections.create('series', series);
}
