<script lang="ts">
	import { categories } from '$lib/Stores';
	import { type FigureData, type Figure, type Category } from '$lib/Types';
	import { ChevronDown, Minus, Plus, ChevronUp } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import CollectedButtons from './CollectedButtons.svelte';
	export let figure: Figure;

	let expand = false;
	let mappedData: { [category_id: string]: FigureData } = {};
	let sortedCategories: Category[] = [];

	async function fetchCollectionData() {
		let response = await (await fetch('/api/my-figures/' + figure.id)).json();
		mappedData = response.mappedData;
    sortedCategories = response.sortedCategories;
	}

	onMount(async () => {
		await fetchCollectionData();
	});

	async function increaseCount(category_id: string) {
		const res = await fetch('/api/my-figures/' + figure.id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ category_id, count: 1 })
		});

		await fetchCollectionData();
	}

	async function decreaseCount(category_id: string) {
		if (mappedData[category_id].count === 0) return;
		const res = await fetch('/api/my-figures/' + figure.id, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ category_id, count: -1 })
		});

		await fetchCollectionData();
	}
</script>

{#each sortedCategories.slice(0, 3) as category}
	{#if category.id === null}
		<div class="card variant-filled-surface px-1 py-0.5 flex justify-between">
			<p class="overflow-hidden">Unkategorisiert</p>
			<div class="flex">
				<CollectedButtons category_id={'undefined'} {mappedData} {increaseCount} {decreaseCount} />
			</div>
		</div>
	{:else}
		<div
			class="card px-1 py-0.5 flex justify-between"
			style="background-color: {category?.color}45;"
		>
			<p class="overflow-hidden">{category?.name}</p>
			<div class="flex">
				<CollectedButtons category_id={category.id} {mappedData} {increaseCount} {decreaseCount} />
			</div>
		</div>
	{/if}
{:else}
	<div class="card variant-filled-surface px-1 py-0.5 flex justify-between h-7" />
	<div class="card variant-filled-surface px-1 py-0.5 flex justify-between h-6" />
{/each}
{#if expand}
	{#each sortedCategories.slice(3) as category}
		{#if category.id === null}
			<div class="card variant-filled-surface px-1 py-0.5 flex justify-between">
				<p class="overflow-hidden">Unkategorisiert</p>
				<div class="flex">
					<CollectedButtons
						category_id={'undefined'}
						{mappedData}
						{increaseCount}
						{decreaseCount}
					/>
				</div>
			</div>
		{:else}
			<div
				class="card px-1 py-0.5 flex justify-between"
				style="background-color: {category?.color}45;"
			>
				<p class="overflow-hidden">{category?.name}</p>
				<div class="flex">
					<CollectedButtons
						category_id={category.id}
						{mappedData}
						{increaseCount}
						{decreaseCount}
					/>
				</div>
			</div>
		{/if}
	{/each}
{/if}

{#if sortedCategories.length > 2}
	<button on:click={() => (expand = !expand)} class="btn variant-filled-surface p-0.5 h-6 w-full">
		{#if !expand}
			<ChevronDown />
		{:else}
			<ChevronUp />
		{/if}
	</button>
{/if}
