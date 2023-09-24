// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Figure,
	SubSeriesVariation,
	FigureVariation,
	Packaging
} from './Types';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation};
export const domain: string = "ek.krenn.tech:443"
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

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
