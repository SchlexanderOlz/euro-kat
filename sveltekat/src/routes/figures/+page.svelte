<script lang="ts">
	import type { Figure } from '$lib/PocketBase';
	import FigureList from '$lib/components/FigureList.svelte';
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const figures: Figure[] = data.figures

	//implement load more
</script>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<FigureList {figures}/>
</div>
