<script lang="ts">
	import { figures } from '$lib/PocketBase';
	import FigureList from '$lib/components/FigureList.svelte';
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="h-full w-full px-16 pt-12">
	<FigureList>
		{#each figures as figure (figure.figureId)}
			<FigureListItem {figure} />
		{/each}
	</FigureList>
</div>
