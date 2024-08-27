import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { CLERK_SECRET_KEY } from '$env/static/private';
import { pbdata } from '$lib/server/PocketBase';
import { clerkClient, withClerkHandler } from 'clerk-sveltekit/server';

export const handle: Handle = sequence(
	withClerkHandler({
		debug: true,
		secretKey: CLERK_SECRET_KEY,
		signInUrl: '/sign-in'
	}),
	async ({ event, resolve }) => {
		if (event.locals.auth == undefined) {
			return await resolve(event);
		}

		const userId = event.locals.auth.userId;
		let pb_user = null;
		try {
			pb_user = await pbdata.collection('user').getFirstListItem<{
				id: string;
				sub: string;
				email: string;
			}>('clerk_id="' + userId + '"', {});
		} catch (e) {
			const clerk_user = await clerkClient.users.getUser(event.locals.auth.userId);
			const email = clerk_user.emailAddresses[0].emailAddress;
			pb_user = await pbdata.collection('user').create<{
				id: string;
				sub: string;
				email: string;
			}>({
				clerk_id: userId,
				sub: null,
				email: email
			});
		}

		event.locals.pb_user = structuredClone(pb_user);

		return await resolve(event);
	}
);
