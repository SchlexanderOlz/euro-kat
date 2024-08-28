import { getAllPageData } from '$lib/PocketBase';
import type { FigurePageCleaned } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 86400
	}
};

export const load = (async (event) => {
	const res: FigurePageCleaned = await getAllPageData(event.params.subseries);
  let categories = [];

  try {
    categories = await (await event.fetch('/api/my-categories')).json();
  } catch (e) {
    categories = [];
  }

	return {
		pageData: structuredClone(res),
    categories: categories
	};
}) satisfies PageServerLoad;
