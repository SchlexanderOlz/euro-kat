import { getWarnings } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 86400
	}
};

export const load = (async () => {
    return {
        warnings: structuredClone(await getWarnings())
    };
}) satisfies PageServerLoad;