<script lang="ts">
	import { categories } from '$lib/Stores';
	import { type FigureData, type Figure } from '$lib/Types';
	import { ChevronDown, Minus, Plus, ChevronUp } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import CollectedButtons from './CollectedButtons.svelte';
	export let figure: Figure;

	let expand = false;

	let mappedData: { [category_id: string]: FigureData } = {};

  async function fetchCollectionData() {
    mappedData = await (await fetch('/api/my-figures/' + figure.id)).json();
  }

	onMount(async () => {
		await fetchCollectionData()
	});

  async function increaseCount(category_id: string) {
    console.log(figure.id);
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

<div class="card variant-filled-surface px-1 py-0.5 flex justify-between">
	<p class="overflow-hidden">Unkategorisiert</p>
	<div class="flex">
    <CollectedButtons category_id={"undefined"} {mappedData} {increaseCount} {decreaseCount}/>
	</div>
</div>
{#each $categories.slice(0, 2) as category}
	<div class="card px-1 py-0.5 flex justify-between" style="background-color: {category.color}45;">
		<p class="overflow-hidden">{category.name}</p>
		<div class="flex">
      <CollectedButtons category_id={category.id} {mappedData} {increaseCount} {decreaseCount}/>
		</div>
	</div>
{/each}
{#if expand}
	{#each $categories.slice(2) as category}
		<div
			class="card px-1 py-0.5 flex justify-between"
			style="background-color: {category.color}45;"
		>
			<p class="overflow-hidden">{category.name}</p>
			<div class="flex">
        <CollectedButtons category_id={category.id} {mappedData} {increaseCount} {decreaseCount}/>
			</div>
		</div>
	{/each}
{/if}

{#if $categories.length > 2}
	<button on:click={() => (expand = !expand)} class="btn variant-filled-surface p-0.5 h-6 w-full">
		{#if !expand}
			<ChevronDown />
		{:else}
			<ChevronUp />
		{/if}
	</button>
{/if}
