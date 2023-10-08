<script lang="ts">
	import { connection, domain, imgdom } from '$lib/PocketBase';
	import type { ExtraDetail } from '$lib/Types';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log(data.extraDetail);

	let extra: ExtraDetail = data.extraDetail;
</script>

<svelte:head>
	<title>Euro-Kat | ZWZ - {extra.name}</title>
	<meta name="description" content="{extra.text}" />
</svelte:head>

<div class="w-full md:px-[20%] sm:px-[15%] px-[10%] my-8">
	<h2 class="h2 mb-4 text-center">{extra.name}</h2>
	<p class="font-bold my-1">Warntext: <span class="font-normal">{extra.text}</span></p>
	<p class="font-bold my-1">Kennzeichnung: <span class="font-normal">{extra.identifier}</span></p>
	<p class="font-bold my-1">Adresskopf: <span class="font-normal">{extra.address}</span></p>
	<p class="font-bold my-1">Format: <span class="font-normal">{extra.format}</span></p>
	<p class="font-bold my-1">Serie z.B.: <span class="font-normal">{extra.series}</span></p>
	<p class="font-bold my-1">Jahrgang: <span class="font-normal">{extra.year}</span></p>
	<p class="font-bold my-1">Hinweis: <span class="font-normal">{extra.note}</span></p>
	<p class="font-bold my-1">Danke an: <span class="font-normal">{extra.thanks}</span></p>

	{#each extra.expand.types as ext}
		<div class="card w-fit my-2 pt-1 pb-2 px-2">
			<p class="mb-1">{ext.name}</p>

			{#if ext.images.length != 0}
				{#each ext.images as imag}
					<img src="{imgdom}/{ext.collectionId}/{ext.id}/{imag}" alt={ext.name} />
				{/each}
			{:else}
				<p class="text-red-500">Beipackzettel gesucht!</p>
			{/if}
		</div>
	{/each}
</div>
