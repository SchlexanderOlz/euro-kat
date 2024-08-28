import { Record } from 'pocketbase';
import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'
import {type Figure, type Category } from './Types';

export const filterBool = writable(false);

export const categories = writable<Category[]>([]);
export const categoryFigureCount = writable<{[id: string]: number}>({});

export const subscription = writable<string | null>(null)
export const userId = writable<string | null>(null)

export const history = persisted<{figures: Figure[]}>('figure_history', {figures: []});
