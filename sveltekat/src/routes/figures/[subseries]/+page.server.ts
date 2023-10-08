import { getAllPageData } from '$lib/PocketBase';
import type { FigurePageCleaned } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 86400
	}
};

export const load = (async ({params}) => {
    const res: FigurePageCleaned = await getAllPageData(params.subseries)
    return {
        pageData: structuredClone(res),
    };
}) satisfies PageServerLoad;