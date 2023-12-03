import { connection } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let figureCount = (await connection.collection('Figure').getList(1, 1, {})).totalItems;
	return {
		figureCount: figureCount
	};
}) satisfies PageServerLoad;
