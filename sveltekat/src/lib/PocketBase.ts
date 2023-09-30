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
	FigurePageCleaned,
	WarningZ,
	WarningZD,
	Extra,
	ExtraDetail
} from './Types.js';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging };
export const domain: string = 'ek.krenn.tech:443';
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection('Figure');
const warnings = connection.collection('Warning');
const subSeriesVariations = connection.collection('SubSeriesVariation');
const subSeries = connection.collection('SubSeries');
const subSeriesVar = connection.collection('SubSeriesVariation');
const extras = connection.collection('Extra');

export async function getWarnings(): Promise<WarningZ[]> {
	return await warnings.getFullList<WarningZ>({
		sort: 'numbered',
		fields: 'id, name, general, numbered'
	});
}

export async function getWarningDetail(id: string): Promise<WarningZD> {
	return await warnings.getOne<WarningZD>(id, { expand: 'types', sort: 'numbered' });
}

export async function getExtras(): Promise<Extra[]> {
	return await extras.getFullList<Extra>({ fields: 'id, name, text', sort: '-numbered' });
}

export async function getExtraDetail(id: string): Promise<ExtraDetail> {
	return await extras.getOne<ExtraDetail>(id, { expand: 'types' });
}

export async function getFigurePageData(figureId: string): Promise<Figure> {
	return await figures.getOne(figureId, { expand: 'subSeriesId' });
}

export async function getSubSeriesVariations(subSeriesId: string): Promise<SubSeries> {
	return await subSeries.getOne(subSeriesId, {
		expand: 'SubSeriesVariation(subSeriesId)'
	});
}

export async function getFigureVariation(subSeriesVarId: string): Promise<FigureVariation> {
	return await subSeriesVar.getOne(subSeriesVarId, {
		expand: 'FigureVariation(subSeriesVariationId), FigureVariation(subSeriesVariationId).figureId'
	});
}

export async function getAllPageData(fid: string): Promise<FigurePageCleaned> {
	let figure: Figure = await getFigurePageData(fid);

	let subser: SubSeries = await getSubSeriesVariations(figure.expand.subSeriesId.id);
	let subservars: SubSeriesVariation[] = subser.expand['SubSeriesVariation(subSeriesId)'];
	let figvars: FigureVariation[] = [];
	subservars.forEach(async (subservar) => {
		figvars.push(await getFigureVariation(subservar.id));
	});
	const vals: FigurePageCleaned = {
		figure,
		subser,
		subservars,
		figvars
	};
	console.log(figvars);
	
	return vals;
}

export async function getCountrys(): Promise<Set<string>> {
	return new Set(
		(await subSeriesVariations.getFullList<SubSeriesVariation>()).map((value) => value.country)
	);
}
