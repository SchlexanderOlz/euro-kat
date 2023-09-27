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
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import CDownIcon from '$lib/icons/CDownIcon.svelte';
	import CUpIcon from '$lib/icons/CUpIcon.svelte';

	export let figures: Figure[];

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

	async function update() {
		figureBuilder.country('Deutschland'); // TODO: for every filter

		figures = await figureBuilder.run();
	}

	const filterOptions: { [filter: string]: () => void } = {
		Sticker: update
	};

	let filter = true;
</script>

<div>
	<div class="flex flex-col sm:flex-row">
		<div class="w-full mr-2 relative">
			<input bind:value={inputValue} class="input w-full" placeholder="Suche" />
			<button
				class="btn absolute right-0 variant-ringed ring-opacity-30"
				on:click={() => {
					console.log('update');
				}}>Los</button
			>
		</div>

		<button
			class="btn variant-filled select-none sm:mt-0 mt-2"
			on:click={() => {
				filter = !filter;
			}}
		>
			Filter <span class="ml-2 -mr-2">
				{#if filter}
					<CUpIcon styles="h-6 w-auto stroke-2"/>
				{:else}
					<CDownIcon styles="h-6 w-auto stroke-2"/>
				{/if}
			</span>
		</button>
	</div>

	{#if filter}
		<div class="card ring-surface-400 bg-surface-100 p-2 rounded-sm w-full mt-2">huan</div>
	{/if}

	<div class="w-full h-8 flex items-center relative mt-2">
		<button class="ml-2 w-80 text-start"> Name </button>
		<button class="ml-4 md:flex hidden"> Notiz </button>
		<button class="absolute right-2"> Mpg Nr. </button>
	</div>

	{#each figures as figure (figure.id)}
		<FigureListItem {figure} />
	{/each}
</div>
