import { pbdata } from '$lib/server/PocketBase';
import { type FigureData, type Category } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const categories = await pbdata
		.collection('category')
		.getFullList<Category>({ filter: 'user="' + event.locals.pb_user.id + '"' });

	return new Response(JSON.stringify(structuredClone(categories)), { status: 200 });
};

export const POST: RequestHandler = async (event) => {
	const data = await event.request.json();
	try {
		if (data.id) {
			pbdata.collection('category').update(data.id, {
				user: event.locals.pb_user.id,
				name: data.name,
				color: data.color
			});
		} else {
			pbdata.collection('category').create({
				user: event.locals.pb_user.id,
				name: data.name,
				color: data.color
			});
		}

		return new Response('Success', { status: 200 });
	} catch (e) {
		return new Response(String(e), { status: 500 });
	}
};

export const DELETE: RequestHandler = async (event) => {
	const data = await event.request.json();
	const category_id = data.id;

	const categoryFigures = await pbdata.collection('figure').getFullList<FigureData>({
		filter: 'user="' + event.locals.pb_user.id + '" && category="' + category_id + '"'
	});

	categoryFigures.forEach((figure) => {
		event.fetch('/api/my-figures/' + figure.figure_id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category_id: 'undefined',
				count: figure.count
			})
		});
		pbdata.collection('figure').delete(figure.id);
	});

	try {
		pbdata.collection('category').delete(category_id);
		return new Response('Success', { status: 200 });
	} catch (e) {
		return new Response(String(e), { status: 500 });
	}
};
