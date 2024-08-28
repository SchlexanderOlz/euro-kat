import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
    if (event.locals.pb_user?.sub != 'premium') {
        throw redirect(307, '/premium')
    }

    return {};
}) satisfies LayoutServerLoad;