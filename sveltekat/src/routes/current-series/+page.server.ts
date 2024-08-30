import figureBuilder from '$lib/FigureFilter';
import type { Figure } from '$lib/PocketBase';
import type { PageServerLoad } from './$types';

// export const config = {
// 	isr: {
// 		expiration: 86400
// 	}
// };

export const load = (async () => {
	let figures: Figure[] = structuredClone(
		await figureBuilder.figureCollection.getFullList({
			filter: '(subSeriesId.seriesId.currentSeries=true||subSeriesId.currentSeries=true)',
			expand: 'subSeriesId.seriesId,countryColor',
			sort: '-maxi,+mpgNr'
		})
	);
	return {
		figures: figures
	};
}) satisfies PageServerLoad;
