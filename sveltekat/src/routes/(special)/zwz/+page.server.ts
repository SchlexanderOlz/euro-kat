import { getExtras } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        extras: structuredClone(await getExtras())
    };
}) satisfies PageServerLoad;