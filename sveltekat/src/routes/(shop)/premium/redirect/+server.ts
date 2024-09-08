import { pbdata } from '$lib/server/PocketBase';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PUBLIC_STRIPE_PREMIUM_LINK } from '$env/static/public';
import { user } from 'clerk-sveltekit/client';
import { clerkClient } from 'clerk-sveltekit/server';

export const GET: RequestHandler = async (event) => {
	try {
		const premiumAnalytics = await pbdata
			.collection('click_count')
			.getFirstListItem("name='premium'");
		await pbdata.collection('click_count').update(premiumAnalytics.id, {
			count: premiumAnalytics.count + 1
		});
	} catch (err) {
		console.log('premiumAnalytics is not defined');
	}

	const clerk_user = await clerkClient.users.getUser(event.locals.auth.userId);
	const email = clerk_user.emailAddresses[0].emailAddress;

	if (email != null && email != undefined && email != '') {
		redirect(300, `${PUBLIC_STRIPE_PREMIUM_LINK}?prefilled_email=${email}`);
	} else {
		redirect(300, `${PUBLIC_STRIPE_PREMIUM_LINK}`);
	}
};
