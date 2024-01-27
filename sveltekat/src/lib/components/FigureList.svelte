<script lang="ts">
	import FigureListItem from './FigureListItem.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	import { figureBuilder } from '$lib/FigureFilter';
	import CDownIcon from '$lib/icons/CDownIcon.svelte';
	import CUpIcon from '$lib/icons/CUpIcon.svelte';

	import RangeSlider from 'svelte-range-slider-pips';
	import type { ListResult, ClientResponseError } from 'pocketbase';
	import type { Figure } from '$lib/Types';
	import ADownIcon from '$lib/icons/ADownIcon.svelte';
	import AupIcon from '$lib/icons/AUPIcon.svelte';
	import { onMount } from 'svelte';
	import { filterBool } from '$lib/Stores';

	let figures: Figure[];
	let pages: number;

	let init_loading = true;

	let inputValue = figureBuilder.getName() || '#' + figureBuilder.getMpgNr();
	if (inputValue === '#') inputValue = '';

	let curser = figureBuilder.isCurrentTriggered();
	let maxi = figureBuilder.isMaxiTriggered();
	let questionable = figureBuilder.isQuestionableTriggered();
	let changed = figureBuilder.isChangedTriggered();

	let debounceTimer: NodeJS.Timeout;
	async function updateSearch() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			if (inputValue[0] == '#') {
				figureBuilder.mpgnumber(inputValue.substring(1));
			} else {
				figureBuilder.mpgnumber(inputValue.substring(0));
			}

			figureBuilder.note(inputValue);
			figureBuilder.name(inputValue);
			figureBuilder.subSeries(inputValue);

			await update();
		}, 500);
	}

	async function update() {
		let res: ListResult<Figure>;
		try {
			res = structuredClone(await figureBuilder.run());
		} catch (error: any) {
			return;
		}
		figureBuilder.currentPage = 1;
		figures = res.items;
		pages = res.totalPages;
	}

	$: loading = false;

	async function loadMore() {
		loading = true;
		figureBuilder.currentPage += 1;
		let res: ListResult<Figure> = structuredClone(await figureBuilder.run());
		figures = [...figures, ...res.items];
		loading = false;
	}

	let yearrange = [
		figureBuilder.getYearBegin() || 2004,
		figureBuilder.getYearEnd() || new Date().getFullYear()
	];
	async function updateYear() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			figureBuilder.yearBegin(yearrange[0]);
			figureBuilder.yearEnd(yearrange[1]);
			update();
		}, 500);
	}

	onMount(async () => {
		await update();
		init_loading = false;
	});
</script>

<div>
	<div class="flex flex-col sm:flex-row">
		<div class="w-full mr-2 relative">
			<input
				on:input={async () => {
					await updateSearch();
				}}
				bind:value={inputValue}
				class="input w-full"
				placeholder="Suche nach #MPG-Nr, Serienname oder Figurname"
			/>
			<button class="btn absolute right-0 variant-ringed ring-opacity-30">Los</button>
		</div>

		<button
			class="btn variant-filled select-none sm:mt-0 mt-2"
			on:click={() => {
				filterBool.set(!$filterBool);
			}}
		>
			Filter <span class="ml-2 -mr-2">
				{#if $filterBool}
					<CUpIcon styles="h-6 w-auto stroke-2" />
				{:else}
					<CDownIcon styles="h-6 w-auto stroke-2" />
				{/if}
			</span>
		</button>
	</div>

	{#if $filterBool}
		<div
			class="card ring-surface-400 bg-surface-100 p-2 rounded-sm w-full mt-2 flex sm:flex-row flex-col sm:items-center"
		>
			<div class="flex flex-col items-start justify-between w-fit px-0">
				<div class="flex flex-row items-center">
					<SlideToggle
						on:change={() => {
							figureBuilder.currentSeries();
							update();
						}}
						name="series"
						active="bg-primary-500"
						checked={curser}
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 flex">Aktuelle Saison</p>
				</div>
				<div class="flex flex-row items-center mt-2 ml-0">
					<SlideToggle
						on:change={() => {
							figureBuilder.maxi();
							update();
						}}
						name="maxi"
						checked={maxi}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 flex">Maxi</p>
				</div>
				<div class="flex flex-row items-center mt-2 ml-0">
					<SlideToggle
						on:change={() => {
							figureBuilder.questionable();
							update();
						}}
						name="questionable"
						checked={questionable}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 flex">Fragwürdig</p>
				</div>
				<div class="flex flex-row items-center mt-2 ml-0">
					<SlideToggle
						on:change={() => {
							figureBuilder.changed();
							update();
						}}
						name="changed"
						checked={changed}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 flex">Verändert</p>
				</div>
			</div>

			<div class="sm:w-[40%] sm:min-w-[20rem] w-full sm:ml-10 flex-shrink-0 mt-4 sm:mt-0">
				<p class="ml-2 w-full text-center">Jahre: {yearrange.join('-')}</p>
				<RangeSlider
					on:change={updateYear}
					bind:values={yearrange}
					min={2004}
					max={new Date().getFullYear()}
					range
					pips
					step={1}
					springValues={{ stiffness: 1, damping: 1 }}
				/>
			</div>
		</div>
	{/if}

	<div class="w-full h-8 flex items-center relative mt-2">
		<div class="w-80">
			<button
				on:click={() => {
					figureBuilder.sortName();
					update();
				}}
				class="ml-2 text-start flex"
			>
				Name

				{#if figureBuilder.sort.has('+name')}
					<AupIcon />
				{:else if figureBuilder.sort.has('-name')}
					<ADownIcon />
				{/if}
			</button>
		</div>

		<button
			on:click={() => {
				figureBuilder.sortNote();
				update();
			}}
			class="ml-4 md:flex hidden"
		>
			Serie
			{#if figureBuilder.sort.has('+note')}
				<AupIcon />
			{:else if figureBuilder.sort.has('-note')}
				<ADownIcon />
			{/if}
		</button>
		<button
			on:click={() => {
				figureBuilder.sortMpgNr();
				update();
			}}
			class="absolute right-2 flex"
		>
			Mpg Nr.
			{#if figureBuilder.sort.has('+mpgNr')}
				<AupIcon />
			{:else if figureBuilder.sort.has('-mpgNr')}
				<ADownIcon />
			{/if}
		</button>
	</div>

	{#if figures && figures.length != 0}
		{#each figures as figure (figure.id)}
			<FigureListItem {figure} />
		{/each}
		{#if figureBuilder.currentPage < pages}
			<div class="w-full flex justify-center mt-6">
				<button on:click={loadMore} disabled={loading} class="btn variant-filled-surface w-40"
					>Mehr Laden</button
				>
			</div>
		{/if}
	{:else if init_loading}
		{#each Array(50) as _, index}
			<div class="card h-8 my-1 p-1">
				<div class="placeholder animate-pulse h-6 rounded" />
			</div>
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
