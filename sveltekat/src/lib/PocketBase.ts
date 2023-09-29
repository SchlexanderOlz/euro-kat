// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Figure,
	SubSeriesVariation,
	FigureVariation,
	Packaging,
	FigurePage,
	FigurePageCleaned
} from './Types.js';
import type Warning from 'postcss/lib/warning';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging };
export const domain: string = 'ek.krenn.tech:443';
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection('Figure');
const warnings = connection.collection('Warning');
const subSeriesVariations = connection.collection('SubSeriesVariation');

export async function getFigureDetail(id: string): Promise<FigurePageCleaned> {
	const res: FigurePage = await figures.getOne<FigurePage>(id, {
		expand:
			'FigureVariation(figureId), FigureVariation(figureId).subSeriesVariationId, FigureVariation(figureId).subSeriesVariationId.subSeriesId'
	});

	let figvars: FigureVariation[] = res.expand["FigureVariation(figureId)"]
	let subservar: SubSeriesVariation = figvars[0].expand.subSeriesVariationId
	let subser: SubSeries = subservar.expand.subSeriesId

	res.expand = null
	figvars[0].expand = null
	subservar.expand = null
	
	let vals: FigurePageCleaned = {
		figure: res,
		figvars: figvars,
		subservar: subservar,
		subser: subser
	}
	console.log(vals);

	// packaging?
	return vals;
	
}

export async function getPackageInserts(): Promise<Warning[]> {
	return await warnings.getFullList({ expand: 'types' });
}

export async function getCountrys(): Promise<Set<string>> {
	return new Set(
		(await subSeriesVariations.getFullList<SubSeriesVariation>()).map((value) => value.country)
	);
}
