import { adminConnection } from '$lib/server/PocketBase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
      if (event.locals.pb_user?.sub !== 'premium') {
        return new Response('Unauthorized', { status: 401 });
      }
    
    let result = false;

    try {
      const wishlisted = await adminConnection.collection('wishes').getFirstListItem(
        'user_id="' + event.locals.pb_user.id + '" && figure_id="' + event.params.id + '"',
      )
      result = true;
    } catch (e) {
      result = false;
    }
    
    return new Response(JSON.stringify(result), { status: 200 });
};

export const POST: RequestHandler = async (event) => {
  if (event.locals.pb_user?.sub !== 'premium') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const wishlist = await adminConnection.collection('wishes').getFirstListItem(
      'user_id="' + event.locals.pb_user.id + '" && figure_id="' + event.params.id + '"',
    )
    await adminConnection.collection('wishes').delete(wishlist.id)
    return new Response(JSON.stringify(false), { status: 200 });
  } catch (e) {
    const wishlist = await adminConnection.collection('wishes').create({
      user_id: event.locals.pb_user.id,
      figure_id: event.params.id
    })
    return new Response(JSON.stringify(true), { status: 200 });
  }
  
}
