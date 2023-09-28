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

export type { Series, SubSeries, SubSeriesVariation, Figure, FigureVariation, Packaging};
export const domain: string = "ek.krenn.tech:443"
export const imgdom: string = `https://${domain}/api/files`;
export const connection: PocketBase = new PocketBase(`https://${domain}`);

export const figureInitLoadCount: number = 50;

const figures = connection.collection("Figure")

export async function getFigureDetail(id: string): Promise<object> {
	return await figures.getOne(id, { expand: "FigureVariation(figureId).subSeriesVariation"})
}
