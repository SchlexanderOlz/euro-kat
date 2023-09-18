<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Figure } from '$lib/PocketBase';
	import FigureListItem from './FigureListItem.svelte';
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import FilterIcon from '$lib/icons/FilterIcon.svelte';

	import { figureBuilder } from '$lib/FigureFilter';

	export let figures: Figure[];

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`, { keepFocus: true });
	};

	let inputValue = '';

	// QUERY FRIENDLY (max. 1 request/sec to db)
	//let debounceTimer: NodeJS.Timeout;
	//async function updateResults() {
	//  clearTimeout(debounceTimer);
	//  debounceTimer = setTimeout(async () => {
	//    updateSearchParams("q", inputValue)
	//    // db query
	//    console.log("update");
	//
	//  }, 500);
	//}

	// QUERY UNFRIENDLY (lots of db requests if user spams keys), but don't need "go" button
	function updateResults() {
		updateSearchParams('q', inputValue);
	}

	async function update() {
		figureBuilder.sticker(); // TODO: for every filter
    
		figures = await figureBuilder.run();
	}

	const filterOptions: { [filter: string]: () => void } = {
		Sticker: update
	};

	let filterSelect = '';

	$: lang = $page.url.searchParams.get('lang') || 'en';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'genbox',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};
</script>

<div>
	<div class="flex flex-col sm:flex-row mb-3">
		<div class="w-full mr-2 relative">
			<input
				bind:value={inputValue}
				on:input={updateResults}
				class="input w-full"
				placeholder="Suche"
			/>
			<button class="btn absolute right-0 variant-ringed ring-opacity-30" on:click={updateResults}
				>Los</button
			>
		</div>

		<button class="btn variant-filled select-none sm:mt-0 mt-1" use:popup={popupCombobox}>
			Filter <span class="ml-2 -mr-2"><FilterIcon /></span>
		</button>

		<div class="card text-xl shadow-xl select-none" data-popup="genbox">
			<ListBox rounded="rounded-lg">
				{#each Object.keys(filterOptions) as filter}
					<ListBoxItem
						active="variant-ringed"
						bind:group={filterSelect}
						name="medium"
						aria-label={filter}
						value={filter}
						on:click={async () => {
							update();
						}}>{filter}</ListBoxItem
					>
				{/each}
			</ListBox>
		</div>
	</div>

	{#each figures as figure (figure.id)}
		<FigureListItem {figure} />
	{/each}
</div>
