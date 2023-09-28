<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Figure } from '$lib/PocketBase';
	import FigureListItem from './FigureListItem.svelte';
	import { ListBox, ListBoxItem, SlideToggle, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import FilterIcon from '$lib/icons/FilterIcon.svelte';

	import { figureBuilder } from '$lib/FigureFilter';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import CDownIcon from '$lib/icons/CDownIcon.svelte';
	import CUpIcon from '$lib/icons/CUpIcon.svelte';

	import RangeSlider from 'svelte-range-slider-pips';

	export let figures: Figure[];

	let inputValue = '';

	// QUERY FRIENDLY (max. 1 request/sec to db)
	let debounceTimer: NodeJS.Timeout;
	async function updateSearch() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			if (inputValue[0] == '#') {
				figureBuilder.mpgnumber(inputValue.substring(1));
			} else {
				figureBuilder.name(inputValue);
			}
			figures = await figureBuilder.run();
		}, 500);
	}

	async function update() {
		//figureBuilder.country('Deutschland'); // TODO: for every filter
		figures = await figureBuilder.run();
	}

	const filterOptions: { [filter: string]: () => void } = {
		Sticker: update
	};

	// TODO: Mpgnr & note suchen
	// TODO: Sort name, note, mpgnr
	let filter = true;

	let yearrange = [2000, 2023];
	async function updateYear() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			figureBuilder.yearBegin(yearrange[0]);
			figureBuilder.yearEnd(yearrange[1]);
			figures = await figureBuilder.run();
		}, 500);
	}
</script>

<div>
	<div class="flex flex-col sm:flex-row">
		<div class="w-full mr-2 relative">
			<input
				on:input={() => {
					updateSearch();
				}}
				bind:value={inputValue}
				class="input w-full"
				placeholder="Suche:  'Name/Notiz', '#Mpg Nr.'"
			/>
			<button class="btn absolute right-0 variant-ringed ring-opacity-30">Los</button>
		</div>

		<button
			class="btn variant-filled select-none sm:mt-0 mt-2"
			on:click={() => {
				filter = !filter;
			}}
		>
			Filter <span class="ml-2 -mr-2">
				{#if filter}
					<CUpIcon styles="h-6 w-auto stroke-2" />
				{:else}
					<CDownIcon styles="h-6 w-auto stroke-2" />
				{/if}
			</span>
		</button>
	</div>

	{#if filter}
		<div class="card ring-surface-400 bg-surface-100 p-2 rounded-sm w-full mt-2 flex sm:flex-row flex-col sm:items-center">
			<div class="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-fit px-[5%] sm:px-0">
				<div class="flex flex-col sm:flex-row items-center">
					<p class="sm:hidden flex mb-1">Sticker</p>
					<SlideToggle
						on:change={() => {
							figureBuilder.sticker();
							update();
						}}
						name="sticker"
						checked={false}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 sm:flex hidden">Sticker</p>
				</div>
				<div class="flex flex-col sm:flex-row items-center sm:mt-2 ml-1 sm:ml-0 ">
					<p class="sm:hidden flex mb-1">Fake</p>
					<SlideToggle
						on:change={() => {
							figureBuilder.fake();
							update();
						}}
						name="sticker"
						checked={false}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 sm:flex hidden">Fake</p>
				</div>
				<div class="flex flex-col sm:flex-row items-center sm:mt-2 ml-1 sm:ml-0">
					<p class="sm:hidden flex mb-1">Fragwürdig</p>
					<SlideToggle
						on:change={() => {
							figureBuilder.questionable();
							update();
						}}
						name="sticker"
						checked={false}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 sm:flex hidden">Fragwürdig</p>
				</div>
			</div>

			<div class="sm:w-[40%] sm:min-w-[20rem] w-full sm:ml-8 flex-shrink-0 mt-4 sm:mt-0  ">
				<p class="ml-2 w-full text-center ">Jahre: {yearrange.join('-')}</p>
				<RangeSlider
					on:change={updateYear}
					bind:values={yearrange}
					min={2000}
					max={2023}
					range
					pips
					step={1}
					springValues={{ stiffness: 1, damping: 1 }}
				/>
			</div>
		</div>
	{/if}

	<div class="w-full h-8 flex items-center relative mt-2">
		<button class="ml-2 w-80 text-start"> Name </button>
		<button class="ml-4 md:flex hidden"> Notiz </button>
		<button class="absolute right-2"> Mpg Nr. </button>
	</div>

	{#if figures.length != 0}
		{#each figures as figure (figure.id)}
			<FigureListItem {figure} />
		{/each}
	{:else}
		<div class="w-full flex justify-center items-center">
			<p class="mt-8 text-center">Es konnten keine Ergebnisse gefunden werden.</p>
		</div>
	{/if}
</div>

<style>
	:root {
		--range-slider: hsl(180, 3.9%, 84.9%);
		--range-handle-inactive: hsl(31, 82.9%, 65.7%);
		--range-handle: hsl(31, 82.9%, 65.7%);
		--range-handle-focus: hsl(31.2, 83.2%, 51%);
		--range-handle-border: hsl(31, 82.9%, 65.7%);
		--range-range-inactive: hsl(31, 82.9%, 65.7%);
		--range-range: hsl(31, 82.9%, 65.7%);
		--range-float-inactive: hsl(31.2, 83.2%, 51%);
		--range-float: hsl(31.2, 83.2%, 51%);
		--range-float-text: hsl(0, 0%, 100%);

		--range-pip: hsl(210, 14.3%, 53.3%);
		--range-pip-text: hsl(210, 14.3%, 53.3%);
		--range-pip-active: hsl(180, 25.4%, 24.7%);
		--range-pip-active-text: hsl(180, 25.4%, 24.7%);
		--range-pip-hover: hsl(180, 25.4%, 24.7%);
		--range-pip-hover-text: hsl(180, 25.4%, 24.7%);
		--range-pip-in-range: hsl(180, 25.4%, 24.7%);
		--range-pip-in-range-text: hsl(180, 25.4%, 24.7%);
	}
</style>
