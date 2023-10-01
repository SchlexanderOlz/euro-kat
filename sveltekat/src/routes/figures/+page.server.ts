import { domain, figureInitLoadCount, type Figure } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';
import PocketBase, { ListResult } from 'pocketbase';

export const load = (async () => {
	const pb: PocketBase = new PocketBase(`https://${domain}`);
	const result: ListResult<Figure> = await pb
		.collection('Figure')
		.getList<Figure>(1, figureInitLoadCount, { sort: 'mpgNr' });
	const items: Figure[] = result.items;
	const totalPages: number = result.totalPages;

	return {
		figures: structuredClone(items),
		totalPages: totalPages
	};
}) satisfies PageServerLoad;
