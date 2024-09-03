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
	Article,
	Variation,
	CountryColor
} from './Types.js';
import { env } from '$env/dynamic/public';

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging, Article };

export const domain: string = env.PUBLIC_DATA_URL || 'ek.krenn.tech:443';
console.log(domain);
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection('Figure');
const warnings = connection.collection('Warning');
const subSeriesVar = connection.collection('SubSeriesVariation');
const extras = connection.collection('Extra');
const articles = connection.collection('Article');
const country_colors = connection.collection('CountryColors');

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
			'subSeriesId.SubSeriesVariation(subSeriesId).FigureVariation(subSeriesVariationId).figureId,variations,countryColor'
	});

	if (figure.subSeriesId == '') {
		//return figure
	}

	const seriesFigures = await figures.getFullList<Figure>({
		filter: `subSeriesId="${figure.subSeriesId}"`
	});

	let subSeries = figure.expand.subSeriesId;

	let subSeriesVariations = subSeries?.expand['SubSeriesVariation(subSeriesId)'];

	// expand packaging
	if (subSeries?.packaging != undefined) {
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

	if (subSeriesVariations != undefined) {
		for (let sub of subSeriesVariations) {
			sub.figvars = sub.expand['FigureVariation(subSeriesVariationId)'];
		}
	}

	let variations: Variation[] = [];
	// manual expand because pocketbase is shit -_-
	if (figure.variations != undefined && figure.variations.length != 0) {
		variations = await connection.collection('Variation').getFullList<Variation>({
			filter: figure.variations.map((id: any) => `id="${id}"`).join('||')
		});
	}

	let color = '';

	const vals: FigurePageCleaned = {
		subSeriesFigures: seriesFigures,
		subser: subSeries,
		subservars: subSeriesVariations,
		variations: variations
	};

	if (figure.subSeriesId == '') {
		vals.subSeriesFigures = [figure];
	}

	return vals;
}

export async function getColors(): Promise<CountryColor[]> {
	return await country_colors.getFullList();
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
	return await articles.getFirstListItem('', { sort: '-created' });
}
