<script lang="ts">
	import type { Figure } from '$lib/PocketBase';
	import FigureList from '$lib/components/FigureList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const figures: Figure[] = data.figures;
	const pages: number = data.totalPages;
</script>

<svelte:head>
	<title>Euro-Kat | Figuren-Katalog</title>
	<meta
		name="description"
		content="Eine sortierbare, filterbare und suchbare Liste aller Figuren"
	/>
</svelte:head>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<FigureList {figures} {pages} />
</div>
