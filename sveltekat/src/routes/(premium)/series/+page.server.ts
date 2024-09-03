import { connection } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	let series = await connection.collection('Series').getFullList();

	return {
		series: structuredClone(series)
	};
}) satisfies PageServerLoad;
