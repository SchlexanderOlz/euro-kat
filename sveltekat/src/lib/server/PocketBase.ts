import PocketBase from 'pocketbase';
import { USER_DATA_EMAIL, USER_DATA_PASSWORD, USER_DATA_URL } from '$env/static/private';


export const pbdata = new PocketBase(USER_DATA_URL);
pbdata.autoCancellation(false)
await pbdata.admins.authWithPassword(USER_DATA_EMAIL, USER_DATA_PASSWORD, {
  // This will trigger auto refresh or auto reauthentication in case
  // the token has expired or is going to expire in the next 30 minutes.
  autoRefreshThreshold: 30 * 60
});