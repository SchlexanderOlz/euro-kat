// https://pocketbase.io/docs/api-records/ <- docs

import PocketBase from 'pocketbase';
import type { Partner } from './Types';

const pb: PocketBase = new PocketBase('http://127.0.0.1:8090');

export async function getPartners(): Promise<Partner[]> {
  const result: Partner[] = await pb.collection('partner').getFullList<Partner>();
  const json: Partner[] = structuredClone(result);
  return json
}
