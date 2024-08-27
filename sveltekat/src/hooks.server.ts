import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleClerk } from 'clerk-sveltekit/server';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { pbdata } from '$lib/server/PocketBase';

export const handle: Handle = sequence(
	handleClerk(CLERK_SECRET_KEY, {
		debug: true,
		protectedPaths: [], //['/current-series', '/figures', '/whz', '/zwz', '/legacy'],
		signInUrl: '/sign-in'
	}),
	async ({ event, resolve }) => {
		if (event.locals.session == undefined) {
			return await resolve(event);
		}

		const userId = event.locals.session.userId;
    let pb_user = null;
		try {
			pb_user = await pbdata.collection('user').getFirstListItem<{
        id: string;
        sub: string;
      }>('clerk_id="' + userId + '"', {});
		} catch (e) {
			console.log('user ' + userId + ' does not exist');
			pb_user = await pbdata.collection('user').create<{
        id: string;
        sub: string;
      }>({
				clerk_id: userId,
				sub: null
			});
		}

    event.locals.pb_user = structuredClone(pb_user);

		return await resolve(event);
	}
);
