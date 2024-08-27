import { pbdata } from '$lib/server/PocketBase';
import { FigureData } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	const figureCollected = await pbdata.collection('Figure').getFullList<FigureData>({
		filter: 'user="' + event.locals.pb_user.id + '" && figure_id="' + event.params.id + '"'
	});
	let map: { [string: string]: any } = {};
	for (let figureRow of figureCollected) {
		map[figureRow.category || 'undefined'] = figureRow;
	}
	return new Response(JSON.stringify(map));
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
