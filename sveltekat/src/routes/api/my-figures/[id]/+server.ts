import { pbdata } from '$lib/server/PocketBase';
import { Category, FigureData } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const figureCollected = await pbdata.collection('Figure').getFullList<FigureData>({
		filter: 'user="' + event.locals.pb_user.id + '" && figure_id="' + event.params.id + '"',
		expand: 'category',
		sort: '-count'
	});

	let map: { [string: string]: any } = {};

	for (let figure of figureCollected) {
		if (figure.category != '') {
			map[figure.category] = figure;
		} else {
			map['undefined'] = figure;
		}
	}

	let sortedCategories: Category[] = []; //figureCollected.map((figure) => figure.expand.category)

	figureCollected.forEach((figureRow) => {
		if (figureRow.category != '') {
			sortedCategories.push(figureRow.expand.category);
		} else {
			sortedCategories.push({
				id: null,
				user: event.locals.pb_user.id,
				name: 'Uncategorized',
				color: '#000000'
			});
		}
	});

	const allCategories = await pbdata
		.collection('category')
		.getFullList<Category>({ filter: 'user="' + event.locals.pb_user.id + '"' });
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
					user: event.locals.pb_user.id,
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
	const data = await event.request.json();
	const figure_id = event.params.id;
	const category_id = data.category_id == 'undefined' ? null : data.category_id;
	const change_by = data.count;

	let filter =
		"user='" +
		event.locals.pb_user.id +
		"' && figure_id='" +
		figure_id +
		"' && " +
		'category=' +
		(category_id ? "'" + category_id + "'" : null);

	try {
		const figureCollected = await pbdata
			.collection('figure')
			.getFirstListItem<FigureData>(filter, {});

		if (change_by < 0 && figureCollected.count + change_by < 0) {
			return new Response('Cannot have negative figure count', { status: 400 });
		}

		await pbdata.collection('figure').update(figureCollected.id, {
			count: figureCollected.count + change_by
		});
	} catch (e) {
		await pbdata.collection('figure').create<FigureData>({
			user: event.locals.pb_user.id,
			figure_id: figure_id,
			category: category_id,
			count: change_by
		});
	}

	return new Response();
};
