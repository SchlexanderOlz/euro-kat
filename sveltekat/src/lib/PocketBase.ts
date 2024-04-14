import PocketBase from 'pocketbase';
import type {
	Series,
	SubSeries,
	Figure,
	SubSeriesVariation,
	FigureVariation,
	Packaging,
	FigurePageCleaned,
	WarningZ,
	WarningZD,
	Extra,
	ExtraDetail,
	Article
} from './Types.js';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging, Article };
export const domain: string = 'ek.krenn.tech:443';
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection('Figure');
const warnings = connection.collection('Warning');
const subSeriesVar = connection.collection('SubSeriesVariation');
const extras = connection.collection('Extra');
const articles = connection.collection('Article')

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

export async function getAllPageData(fid: string): Promise<FigurePageCleaned> {
	const figure: any = await figures.getOne(fid, {
		expand:
			'subSeriesId.SubSeriesVariation(subSeriesId).FigureVariation(subSeriesVariationId).figureId'
	});

	const seriesFigures = await figures.getFullList<Figure>({
		filter: `subSeriesId="${figure.subSeriesId}"`
	});
	let subSeries = figure.expand.subSeriesId;
	let subSeriesVariations = subSeries.expand['SubSeriesVariation(subSeriesId)'];

	// expand packaging
	if (subSeries.packaging != undefined) {
		const cpackaging: string[] = subSeries.packaging;

		let tpackaging: Packaging[] = [];
		await Promise.all(
			cpackaging.map(async (packaging) => {
				const result = await connection.collection('Packaging').getOne<Packaging>(packaging);
				tpackaging.push(structuredClone(result));
			})
		);
		subSeries.packaging = tpackaging;
	}

	for (let sub of subSeriesVariations) {
		sub.figvars = sub.expand['FigureVariation(subSeriesVariationId)'];
	}

	const vals: FigurePageCleaned = {
		subSeriesFigures: seriesFigures,
		subser: subSeries,
		subservars: subSeriesVariations
	};

	return vals;
}

export async function getCountrys(): Promise<Set<string>> {
	return new Set(
		(await subSeriesVar.getFullList<SubSeriesVariation>()).map((value) => value.country)
	);
}

export async function getFigureCount(): Promise<number> {
	return (await figures.getList(1, 1)).totalItems;
}

export async function getLatestArticle(): Promise<Article> {
	return await articles.getFirstListItem('', {sort: "+created"})
}