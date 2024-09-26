import { PREMIUM_PRICE_ID, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { pbdata } from '$lib/server/PocketBase';
import type { RequestHandler } from './$types';
import { Stripe } from 'stripe';

export const POST: RequestHandler = async (ev) => {
	const stripe = new Stripe(STRIPE_SECRET_KEY);
	const body = await ev.request.text();
	const signature = ev.request.headers.get('stripe-signature') || '';

	let data;
	let eventType;
	let event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook signature verification failed.', err.message);
		return new Response('Webhook signature verification failed.', { status: 400 });
	}

	data = event.data;
	eventType = event.type;

	try {
		switch (eventType) {
			case 'checkout.session.completed':
				// Fulfill the purchase...
				const session = await stripe.checkout.sessions.retrieve(data.object.id, {
					expand: ['line_items']
				});

				const customerId = session?.customer;
				const customer = await stripe.customers.retrieve(customerId);

				const priceId = session?.line_items?.data[0]?.price?.id;
				const plan = priceId == PREMIUM_PRICE_ID ? 'premium' : 'none';

				if (plan == 'none') break;

				if (customer.email) {
					// TODO: create user if necessary & update user in db
					console.log('Buyed Premium - Customer email: ', customer.email);
					try {
						// user exists
						const pb_user = await pbdata
							.collection('user')
							.getFirstListItem("email='" + customer.email + "'");
						await pbdata.collection('user').update(pb_user.id, {
							sub: plan,
							stripe_id: customerId
						});
					} catch (e) {
						// user does not exist
						console.log('User does not exist, creating user...');
						const pb_user = await pbdata.collection('user').create({
							email: customer.email,
							sub: plan,
							stripe_id: customerId
						});
					}
				} else {
					console.error('No email found for customer');
					throw new Error('No email found for customer');
				}

				break;
			case 'customer.subscription.deleted':
				const subscription = await stripe.subscriptions.retrieve(data.object.id);
				const stripeCustomerId = subscription?.customer;

				try {
					// get user
					console.log(stripeCustomerId);

					const user = await pbdata
						.collection('user')
						.getFirstListItem("stripe_id='" + stripeCustomerId + "'");
					await pbdata.collection('user').update(user.id, {
						sub: null
					});
				} catch {
					// user does not exist - but still canceled subscription?
					console.error('User does not exist - but still canceled subscription?');
					throw new Error('User does not exist');
				}

				// TODO: revoke user access
				console.log('Subscription deleted: ', subscription.id);

				break;
			default:
				console.log(`Unhandled event type ${eventType}`);
		}
	} catch (err) {
		console.error('stripe error: ', err.message, ' | event type: ', eventType);
	}

	return new Response();
};
