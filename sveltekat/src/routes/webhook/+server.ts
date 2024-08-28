import { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import type { RequestHandler } from './$types';
import { Stripe } from 'stripe';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const POST: RequestHandler = async (ev) => {
	const body = await ev.request.text();
	const signature = ev.request.headers.get('stripe-signature') || '';

  let data;
  let eventType;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
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
        const plan = priceId == 'price_1PsVcMF2IFQpSgvXYo8UYUnx' ? 'premium' : 'none'

        if (plan == 'none') break;

        if (customer.email) {
          // TODO: create user if necessary & update user in db
          console.log('Buyed Premium - Customer email: ', customer.email);
          
        } else {
          console.error('No email found for customer');
          throw new Error('No email found for customer');
        }

        break;
      case 'customer.subscription.deleted':
        const subscription = await stripe.subscriptions.retrieve(data.object.id);
        // TODO: revoke user access
        console.log('Subscription deleted: ', subscription.id);
        
        break;
      default:
        console.log(`Unhandled event type ${eventType}`);
    }
  } catch (err) {
    console.error(
      'stripe error: ', err.message, ' | event type: ', eventType
    )
  }

	return new Response();
};
