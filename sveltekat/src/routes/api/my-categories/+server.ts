import { adminConnection } from '$lib/server/PocketBase';
import { type FigureData, type Category } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	if (event.locals.pb_user?.sub !== 'premium') {
		return new Response('Unauthorized', { status: 401 });
	}

	let categories = await adminConnection
		.collection('category')
		.getFullList<Category>({ filter: 'user_id="' + event.locals.pb_user.id + '"' });

	let categoryFigureCount: { [id: string]: number } = {};
	for (const category of categories) {
		let id = category.id;
		const response = await adminConnection.collection('collection').getList<FigureData>(1, 1, {
			filter: 'user_id="' + event.locals.pb_user.id + '" && category_id="' + id + '"'
		});
		let count = response.totalPages;
		categoryFigureCount[category.id || 'undefined'] = count;
	}
	categoryFigureCount['undefined'] = (
		await adminConnection.collection('collection').getList<FigureData>(1, 1, {
			filter: 'user_id="' + event.locals.pb_user.id + '" && category_id=null'
		})
	).totalPages;

	categories = [
		...[{ id: null, user_id: event.locals.pb_user.id, name: 'Unkategorisiert', color: '#000000' }],
		...categories
	];
	const orderedCategories = categories.sort((a, b) => {
		return categoryFigureCount[b.id || 'undefined'] - categoryFigureCount[a.id || 'undefined'];
	});

	console.log(categoryFigureCount);
	console.log(orderedCategories);

	return new Response(
		JSON.stringify(
			structuredClone({ categories: orderedCategories, categoryFigureCount: categoryFigureCount })
		),
		{ status: 200 }
	);
};

export const POST: RequestHandler = async (event) => {
	if (event.locals.pb_user?.sub !== 'premium') {
		return new Response('Unauthorized', { status: 401 });
	}

	const data = await event.request.json();
	try {
		if (data.id) {
			adminConnection.collection('category').update(data.id, {
				user_id: event.locals.pb_user.id,
				name: data.name,
				color: data.color
			});
		} else {
			adminConnection.collection('category').create({
				user_id: event.locals.pb_user.id,
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
	if (event.locals.pb_user?.sub !== 'premium') {
		return new Response('Unauthorized', { status: 401 });
	}

	const data = await event.request.json();
	const category_id = data.id;

	const categoryFigures = await adminConnection.collection('collection').getFullList<FigureData>({
		filter: 'user_id="' + event.locals.pb_user.id + '" && category_id="' + category_id + '"'
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
		adminConnection.collection('collection').delete(figure.id);
	});

	try {
		adminConnection.collection('category').delete(category_id);
		return new Response('Success', { status: 200 });
	} catch (e) {
		return new Response(String(e), { status: 500 });
	}
};
