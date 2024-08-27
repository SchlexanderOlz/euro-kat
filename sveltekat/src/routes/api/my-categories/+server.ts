import { pbdata } from '$lib/server/PocketBase';
import { type FigureData, type Category } from '$lib/Types';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	let categories = await pbdata
		.collection('category')
		.getFullList<Category>({ filter: 'user="' + event.locals.pb_user.id + '"' });

  let categoryFigureCount: {[id: string]: number} = {}
  for (const category of categories) {
    let id = category.id;
    const response = await pbdata.collection('figure').getList<FigureData>(1, 1, {
      filter: 'user="' + event.locals.pb_user.id + '" && category="' + id + '"'
    });
    let count = response.totalPages;
    categoryFigureCount[category.id || 'undefined'] = count;
  }
  categoryFigureCount['undefined'] = (await pbdata.collection('figure').getList<FigureData>(1, 1, {
    filter: 'user="' + event.locals.pb_user.id + '" && category=' + null
  })).totalPages;

  categories.push({id: null, user: event.locals.pb_user.id, name: 'Uncategorized', color: '#000000'});
  const orderedCategories = categories.sort((a, b) => { return categoryFigureCount[b.id || 'undefined'] - categoryFigureCount[a.id || 'undefined'] });
  
	return new Response(JSON.stringify(structuredClone({categories: orderedCategories, categoryFigureCount: categoryFigureCount})), { status: 200 });
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
