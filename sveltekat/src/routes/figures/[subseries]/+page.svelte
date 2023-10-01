<script lang="ts">
	import { imgdom } from '$lib/PocketBase';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';

	export let data: PageData;

	console.log(data.pageData);

	// http://euro-kat.de/n_toy/2018_2019/6083.htm
	// http://localhost:5173/figures/sgkl6trqp1ahivi
</script>

<svelte:head>
	<title>Euro-Kat | Figuren-Katalog</title>
	<meta name="description" content="Figur" />
</svelte:head>


<!-- 		https://www.skeleton.dev/utilities/table-of-contents
	
	<div class="absolute top-0 left-0" use:tocCrawler={{ mode: 'generate' }}>
	<h2>Figuren</h2>
	<h3>Variationen</h3>
	<a href="#variationen">test</a>
	<a href="#figuren">test</a>
</div>

<TableOfContents />-->

<h2 id="tset" class="h2 my-4 text-center break-all">{data.pageData.subser.name}</h2>

<p class="text-center">{data.pageData.subser.thanks}</p>

<div class="w-full flex flex-col items-center mb-10">
	<img
		class="w-max mt-4"
		src="{imgdom}/{data.pageData.subservars[0].collectionId}/{data.pageData.subservars[0].id}/{data
			.pageData.subservars[0].images[0]}"
		alt="{data.pageData.subser.name} Beipackzettel"
	/>

	<p>bpz</p>
	<p>verpackungen</p>

	
	<h2 id="figuren" class="h2  mb-4 mt-6 text-center">Figuren</h2>
	<div class="w-fit">
		{#each data.pageData.subSeriesFigures as fig}
			<div class="flex card my-2 p-2">
				<div class="w-72 flex justify-center">
					<img
						class="w-max"
						src="{imgdom}/{fig.collectionId}/{fig.id}/{fig.pictures[0]}"
						alt={fig.name}
					/>
				</div>
				<div class="ml-4 w-72">
					<p class="font-normal my-0.5"><span class="font-bold">MPG-Nr:</span> {fig.mpgNr}</p>
					<p class="font-normal my-0.5"><span class="font-bold">Name:</span> {fig.name}</p>
					<p class="font-normal my-0.5"><span class="font-bold">Kennung:</span> {fig.identifier}</p>
					<p class="font-normal my-0.5"><span class="font-bold">Aufkleber:</span> {fig.sticker ? 'Ja' : 'Nein'}</p>
					<p class="font-normal my-0.5 break-all"><span class="font-bold break-keep">Bemerkung:</span> {fig.note}</p>
					
					<!--Beipackzettel?-->

				</div>
			</div>
		{/each}

		<h2 id="variationen" class="h2  mb-4 mt-6 text-center">Variationen</h2>
		<div class="card w-full">
			<Accordion>
				{#each data.pageData.subservars as subservar}
					<AccordionItem>
						<!--<svelte:fragment slot="lead">(icon)</svelte:fragment>-->
						<svelte:fragment slot="summary"
							>
							<span class="font-bold">Variation {subservar.country} - {subservar.year}</span></svelte:fragment
						>
						<svelte:fragment slot="content">
							<p>{subservar.note}</p>
							{#each subservar.images as img}
								<img src="{imgdom}/{subservar.collectionId}/{subservar.id}/{img}"/>
							{/each}
						</svelte:fragment>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</div>
	</div>


