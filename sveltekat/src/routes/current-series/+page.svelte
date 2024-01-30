<script lang="ts">
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	{#if data.figures && data.figures.length != 0}
		{#each data.figures as figure (figure.id)}
			<FigureListItem {figure} />
		{/each}
	{:else}
		<div class="w-full flex justify-center items-center">
			<p class="mt-8 text-center">Es konnten keine Ergebnisse gefunden werden.</p>
		</div>
	{/if}
</div>
