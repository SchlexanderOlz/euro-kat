import { getWarningDetail } from '$lib/PocketBase';
import type { WarningZD } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 86400
	}
};

export const load = (async ({ params }) => {
	let res: WarningZD = await getWarningDetail(params.whzi);
	res.name = res.numbered
		? `Die Warnhinweiszettel Nr. ${res.name.replace(' ', '-')}`
		: `Die ${res.name.replace('WHZ', 'Warnhinweiszettel')}`;
	return {
		warningDetail: structuredClone(res)
	};
}) satisfies PageServerLoad;
