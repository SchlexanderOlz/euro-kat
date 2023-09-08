<script lang="ts">
	import { figures } from '$lib/PocketBase';
	import FigureList from '$lib/components/FigureList.svelte';
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6">
	<FigureList>
		{#each figures as figure (figure.id)}
			<FigureListItem {figure} />
		{/each}
	</FigureList>
</div>
