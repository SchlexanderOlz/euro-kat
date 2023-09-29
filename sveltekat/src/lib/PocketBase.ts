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
import type Warning from 'postcss/lib/warning';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging };
export const domain: string = 'ek.krenn.tech:443';
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection('Figure');
const warnings = connection.collection('Warning');
const subSeriesVariations = connection.collection('SubSeriesVariation');

export async function getFigureDetail(id: string): Promise<object> {
	return await figures.getOne(id, {
		expand:
			'FigureVariation(figureId), FigureVariation(figureId).subSeriesVariationId, FigureVariation(figureId).subSeriesVariationId.subSeriesId'
	});
}

export async function getPackageInserts(): Promise<Warning[]> {
	return await warnings.getFullList({ expand: 'types' });
}

export async function getCountrys(): Promise<Set<string>> {
	return new Set(
		(await subSeriesVariations.getFullList<SubSeriesVariation>()).map((value) => value.country)
	);
}
