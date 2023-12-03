import { getExtraDetail } from '$lib/PocketBase';
import type { ExtraDetail } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const config = {
	isr: {
		expiration: 86400
	}
};

export const load = (async ({ params }) => {
	let res: ExtraDetail = await getExtraDetail(params.zwzi);
	return {
		extraDetail: structuredClone(res)
	};
}) satisfies PageServerLoad;
