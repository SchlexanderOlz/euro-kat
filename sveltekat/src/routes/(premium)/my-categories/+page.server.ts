import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const response = structuredClone(await (await event.fetch('/api/my-categories')).json());

	return {
		categories: response.categories,
		categoryFigureCount: response.categoryFigureCount
	};
}) satisfies PageServerLoad;
