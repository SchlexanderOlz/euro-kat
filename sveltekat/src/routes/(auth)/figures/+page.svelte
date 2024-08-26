<script lang="ts">
	import FigureList from '$lib/components/FigureList.svelte';
</script>

<svelte:head>
	<title>Euro-Kat | Figuren-Katalog</title>
	<meta
		name="description"
		content="Eine sortierbare, filterbare und suchbare Liste aller Figuren"
	/>
</svelte:head>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<FigureList />
</div>
