import { getExtraDetail } from '$lib/PocketBase';
import type { ExtraDetail } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    let res: ExtraDetail = await getExtraDetail(params.zwzi);
    //res.name = res.numbered ? `Die Warnhinweiszettel Nr. ${res.name.replace(" ","-")}` : `Die ${res.name.replace("WHZ","Warnhinweiszettel")}`
    return {
        extraDetail: structuredClone(res)
    };
}) satisfies PageServerLoad;