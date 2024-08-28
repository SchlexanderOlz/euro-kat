import { pbdata } from '$lib/server/PocketBase';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	event.url.href;
	if (event.locals.auth.userId) {
		event.locals.pb_user = await pbdata.collection('user').getFirstListItem<{
			id: string;
			sub: string;
			email: string;
			stripe_id: string;
			clerk_id: string;
		}>('clerk_id="' + event.locals.auth.userId + '"', {});
	} else {
		event.locals.pb_user = null;
	}

	return {
		subscription: event.locals.pb_user?.sub || null,
    userId: event.locals.pb_user?.id || null
	};
}) satisfies LayoutServerLoad;
