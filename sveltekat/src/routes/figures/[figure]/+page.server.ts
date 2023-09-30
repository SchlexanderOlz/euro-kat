import { getAllPageData } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';
import type { FigurePageCleaned } from '$lib/Types';

export const load = (async ({params}) => {
    const res: FigurePageCleaned = await getAllPageData(params.figure)
    return {
        pageData: structuredClone(res),
    };
}) satisfies PageServerLoad;