import { Record } from 'pocketbase';
import { writable } from 'svelte/store';
import {type Category } from './Types';

export const filterBool = writable(false);

export const categories = writable<Category[]>([]);
