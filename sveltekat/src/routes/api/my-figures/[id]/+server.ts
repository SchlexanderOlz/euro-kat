import { adminConnection } from '$lib/server/PocketBase';
import { Category, FigureData } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  if (event.locals.pb_user?.sub !== 'premium') {
    return new Response('Unauthorized', { status: 401 });
  }
	const figureCollected = await adminConnection.collection('collection').getFullList<FigureData>({
		filter: 'user_id="' + event.locals.pb_user.id + '" && figure_id="' + event.params.id + '"',
		expand: 'category_id',
		sort: '-count'
	});

	let map: { [string: string]: any } = {};

	for (let figure of figureCollected) {
		if (figure.category_id != '') {
			map[figure.category_id] = figure;
		} else {
			map['undefined'] = figure;
		}
	}

	let sortedCategories: Category[] = []; //figureCollected.map((figure) => figure.expand.category)

	figureCollected.forEach((figureRow) => {
		if (figureRow.category_id != '') {
			sortedCategories.push(figureRow.expand.category_id);
		} else {
			sortedCategories.push({
				id: null,
				user_id: event.locals.pb_user.id,
				name: 'Uncategorized',
				color: '#000000'
			});
		}
	});

	const allCategories = await adminConnection
		.collection('category')
		.getFullList<Category>({ filter: 'user_id="' + event.locals.pb_user.id + '"' });
	const allCatIds = allCategories.map((category) => category.id);
	const allUsedIds = sortedCategories.map((category) => category.id);
	const unusedIds = allCatIds.filter((x) => !allUsedIds.includes(x));
	let orderedIds = allUsedIds.concat(unusedIds);
	orderedIds = orderedIds.map((id) => (id === null ? 'undefined' : id));
	if (!orderedIds.includes('undefined')) {
		orderedIds.push('undefined');
	}
	let orderedCategories = orderedIds.map((id) =>
		allCategories.find((category) => category.id === id)
	);
	orderedCategories = orderedCategories.map((category) =>
		category
			? category
			: {
					id: null,
					user_id: event.locals.pb_user.id,
					name: 'Uncategorized',
					color: '#000000',
					count: map['undefined'] ? map['undefined'].count : 0
				}
	);

	return new Response(
		JSON.stringify({
			mappedData: map,
			sortedCategories: orderedCategories
		})
	);
};

export const POST: RequestHandler = async (event) => {
  if (event.locals.pb_user?.sub !== 'premium') {
    return new Response('Unauthorized', { status: 401 });
  }

	const data = await event.request.json();
	const figure_id = event.params.id;
	const category_id = data.category_id == 'undefined' ? null : data.category_id;
	const change_by = data.count;

	let filter =
		"user_id='" +
		event.locals.pb_user.id +
		"' && figure_id='" +
		figure_id +
		"' && " +
		'category_id=' +
		(category_id ? "'" + category_id + "'" : null);

	try {
		const figureCollected = await adminConnection
			.collection('collection')
			.getFirstListItem<FigureData>(filter, {});

		if (change_by < 0 && figureCollected.count + change_by < 0) {
			return new Response('Cannot have negative figure count', { status: 400 });
		}

    if (figureCollected.count + change_by == 0) {
      await adminConnection.collection('collection').delete(figureCollected.id);
      return new Response();
    }

		await adminConnection.collection('collection').update(figureCollected.id, {
			count: figureCollected.count + change_by
		});
	} catch (e) {
		await adminConnection.collection('collection').create<FigureData>({
			user_id: event.locals.pb_user.id,
			figure_id: figure_id,
			category_id: category_id,
			count: change_by
		});
	}

	return new Response();
};
