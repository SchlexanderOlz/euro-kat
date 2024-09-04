<script lang="ts">
	import FigureListItem from './FigureListItem.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	import figureBuilder from '$lib/FigureFilter';
	import CDownIcon from '$lib/icons/CDownIcon.svelte';
	import CUpIcon from '$lib/icons/CUpIcon.svelte';

	import RangeSlider from 'svelte-range-slider-pips';
	import type { ListResult, ClientResponseError } from 'pocketbase';
	import type { CountryColor, Figure } from '$lib/Types';
	import ADownIcon from '$lib/icons/ADownIcon.svelte';
	import AupIcon from '$lib/icons/AUPIcon.svelte';
	import { onMount } from 'svelte';
	import { categories, filterBool, categoryFigureCount, subscription } from '$lib/Stores';
	import { getColors } from '$lib/PocketBase';
	import { page } from '$app/stores';

	export let wishlistMode = false;
	export let collectionMode = false;

	let figures: Figure[];
	let pages: number;

	let init_loading = true;

	let inputValue = figureBuilder.name || '#' + figureBuilder.mpgNr;
	if (inputValue === '#') inputValue = '';

	let curser = figureBuilder.isCurrentTriggered;
	let maxi = figureBuilder.isMaxiTriggered;
	let questionable = figureBuilder.isQuestionableTriggered;
	let changed = figureBuilder.isChangedTriggered;
	let mine = figureBuilder.isMineTriggered;

	let categoriesSelected: (string | null)[] = [];
	function toggleCategory(name: string | null) {
		if (name === 'Unkategorisiert') {
			name = null;
		}
		if (categoriesSelected.includes(name)) {
			categoriesSelected = categoriesSelected.filter((cat) => cat !== name);
		} else {
			categoriesSelected = [...categoriesSelected, name];
		}
	}

	let debounceTimer: NodeJS.Timeout;
	async function updateSearch() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			if (inputValue[0] == '#') {
				figureBuilder.byMpgNr(inputValue.substring(1));
			} else {
				figureBuilder.byMpgNr(inputValue.substring(0));
			}

			figureBuilder.byNote(inputValue);
			figureBuilder.byName(inputValue);
			figureBuilder.bySubSeries(inputValue);

			await update();
		}, 500);
	}

	async function update() {
		let res: ListResult<Figure>;
		if (collectionMode) {
			if (figureBuilder.isMyFiguresTriggered) {
				// disable to then enable
				figureBuilder.myFigures(categoriesSelected);
			}
			console.log(categoriesSelected);

			figureBuilder.myFigures(categoriesSelected);
		}
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
		figureBuilder.yearBegin || 2004,
		figureBuilder.yearEnd || new Date().getFullYear()
	];
	async function updateYear() {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			figureBuilder.byYearBegin(yearrange[0]);
			figureBuilder.byYearEnd(yearrange[1]);
			update();
		}, 500);
	}

	let colors: CountryColor[] = [];

	$: if ($page.url.href) {
		inputValue = '';
	}

	onMount(async () => {
		if ($subscription === 'premium') {
			let series = $page.url.searchParams.get('series');
			if (series !== null) {
				inputValue = '#' + series;
				updateSearch();
				history.pushState({}, '', '/figures');
			}
		}

		if (figureBuilder.isWishesTriggered != wishlistMode) {
			figureBuilder.wishes();
		}
		console.log(figureBuilder.isWishesTriggered);

		if (figureBuilder.isMyFiguresTriggered != collectionMode) {
			figureBuilder.myFigures();
			const response = await fetch('/api/my-categories').then((res) => res.json());
			$categories = response.categories;
			$categoryFigureCount = response.categoryFigureCount;
		}

		await update();

		init_loading = false;
		colors = await getColors();
	});
</script>

<div>
	<div class="flex flex-col sm:flex-row">
		<div class="w-full mr-2 relative flex">
			<input
				on:input={async () => {
					await updateSearch();
				}}
				bind:value={inputValue}
				class="input w-full"
				placeholder="Suche nach #MPG-Nr, Serienname oder Figurname"
			/>
			<button class="btn variant-ghost ring-opacity-30">Los</button>
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
			class="card ring-surface-400 bg-surface-100 p-2 rounded-sm w-full mt-2 flex nav:flex-row flex-col nav:items-center"
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
				<div class="flex flex-row items-center mt-2 ml-0">
					<SlideToggle
						on:change={() => {
							figureBuilder.mine();
							update();
						}}
						name="mine"
						checked={mine}
						active="bg-primary-500"
						size="sm"
						rounded="rounded"
					/>
					<p class="ml-2 flex">Daniel's Figuren</p>
				</div>
			</div>

			<div
				class="nav:w-[40%] nav:min-w-[20rem] flex-grow w-full nav:ml-10 flex-shrink-0 mt-4 nav:mt-0"
			>
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
			{#if !collectionMode}
				<div class="nav:ml-4 nav:w-max w-full flex flex-col space-y-1.5">
					{#each colors as color}
						<p style={`background-color: ${color.color}35;`} class="w-full rounded pl-1 pr-4">
							{color.country}
						</p>
					{/each}
				</div>
			{:else}
				<div class="nav:ml-4 nav:w-max w-full flex flex-col space-y-1.5">
					{#each $categories as category}
						<div class="flex flex-row items-center mt-2 ml-0">
							<SlideToggle
								on:change={() => {
									toggleCategory(category.name);
									update();
								}}
								name={category.name}
								checked={false}
								active="bg-primary-500"
								size="sm"
								rounded="rounded"
							/>
							<p class="ml-2 flex">{category.name}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/if}

	<div class="w-full h-8 flex items-center relative mt-2">
		<button
			on:click={() => {
				figureBuilder.sortByName();
				update();
			}}
			class="text-start mx-2 md:flex hidden w-80"
		>
			<span class="mr-1">Name</span>

			{#if figureBuilder.sort.has('+name')}
				<AupIcon />
			{:else if figureBuilder.sort.has('-name')}
				<ADownIcon />
			{/if}
		</button>

		<button
			on:click={() => {
				figureBuilder.sortByNote();
				update();
			}}
			class="flex ml-2"
		>
			<span class="mr-1">Serie</span>
			{#if figureBuilder.sort.has('+note')}
				<AupIcon />
			{:else if figureBuilder.sort.has('-note')}
				<ADownIcon />
			{/if}
		</button>
		<button
			on:click={() => {
				figureBuilder.sortByMpgNr();
				update();
			}}
			class="absolute right-2 flex"
		>
			<span class="mr-1">Mpg Nr.</span>
			{#if figureBuilder.sort.has('+mpgNr')}
				<AupIcon />
			{:else if figureBuilder.sort.has('-mpgNr')}
				<ADownIcon />
			{/if}
		</button>
	</div>

	{#if figures && figures.length != 0}
		{#each figures || [] as figure (figure.id)}
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
