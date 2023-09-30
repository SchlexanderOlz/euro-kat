import { getWarnings } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        warnings: structuredClone(await getWarnings())
    };
}) satisfies PageServerLoad;