import { pbdata } from '$lib/server/PocketBase';
import {type  Category } from '$lib/Types';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    console.log(event.locals.pb_user);
  
    const categories = await pbdata.collection('category').getFullList<Category>({ filter: 'user="' + event.locals.pb_user.id + '"'})
    
    return {
        categories: structuredClone(categories)
    };
}) satisfies PageServerLoad;