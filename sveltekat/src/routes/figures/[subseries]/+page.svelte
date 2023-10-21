<script lang="ts">
	import { imgdom } from '$lib/PocketBase';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Euro-Kat | Figuren-Katalog</title>
	<meta name="description" content="Figur" />
</svelte:head>

<h2 class="h2 my-4 text-center break-all">{data.pageData.subser.name}</h2>

<p class="text-center">{data.pageData.subser.thanks}</p>

<div class="w-full flex flex-col items-center mb-10">
	{#if data.pageData.subservars[0].images.length != 0}
		{#each data.pageData.subservars[0].images as imag}
			<img
				class="w-max mt-4"
				src="{imgdom}/{data.pageData.subservars[0].collectionId}/{data.pageData.subservars[0]
					.id}/{imag}"
				alt="{data.pageData.subser.name} Beipackzettel"
			/>
		{/each}
	{:else}
		<img class="mt-4" src="/images/want_bpz.jpg" alt="Kein Beipackzettel-Foto verfügbar" />
	{/if}

	<h2 class="h2 mb-4 mt-6 text-center">Figuren</h2>
	<div class="w-[90%] sm:w-[75%] md:w-[50%]">
		{#each data.pageData.subSeriesFigures as fig}
			<div class="flex card my-2 p-2">
				<div class="w-72 flex justify-center">
					{#if fig.pictures.length != 0}
						<img
							class="w-max"
							src="{imgdom}/{fig.collectionId}/{fig.id}/{fig.pictures[0]}"
							alt={fig.name}
						/>
					{:else}
						<img src="/images/want_fig.jpg" alt="Kein Figuren-Foto verfügbar" />
					{/if}
				</div>
				<div class="ml-4 w-72">
					<p class="font-normal my-0.5"><span class="font-bold">MPG-Nr:</span> {fig.mpgNr}</p>
					<p class="font-normal my-0.5"><span class="font-bold">Name:</span> {fig.name}</p>
					<p class="font-normal my-0.5"><span class="font-bold">Kennung:</span> {fig.identifier}</p>
					<p class="font-normal my-0.5">
						<span class="font-bold">Aufkleber:</span>
						{fig.sticker ? 'Ja' : 'Nein'}
					</p>
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold break-keep">Bemerkung:</span>
						{fig.note}
					</p>
				</div>
			</div>
		{/each}

		<h2 class="h2 mb-4 mt-6 text-center">Variationen</h2>
		<div class="card">
			<Accordion>
				{#each data.pageData.subservars as subservar}
					<AccordionItem>
						<svelte:fragment slot="summary">
							<span class="font-bold">Variation {subservar.country} - {subservar.year}</span
							></svelte:fragment
						>
						<svelte:fragment slot="content">
							<p class="whitespace-pre-wrap">{subservar.note}</p>

							{#if subservar.images.length != 0}
								{#each subservar.images as img}
									<img
										src="{imgdom}/{subservar.collectionId}/{subservar.id}/{img}"
										alt="Subseries"
									/>
								{/each}
							{:else}
								<img src="/images/want_bpz.jpg" alt="Kein Beipackzettel-Foto verfügbar" />
							{/if}
							{#if subservar.figvars != undefined}
								<Accordion>
									<AccordionItem>
										<svelte:fragment slot="summary">
											<span class="font-bold">Beipackzettel</span></svelte:fragment
										>
										<svelte:fragment slot="content">
											<Accordion>
												{#each subservar.figvars as figvar}
													<AccordionItem>
														<svelte:fragment slot="summary">
															<span class="font-bold"
																>{figvar.expand.figureId.mpgNr} - {figvar.expand.figureId
																	.name}</span
															></svelte:fragment
														>
														<svelte:fragment slot="content">
															<div class="h-auto max-w-[100%] flex flex-wrap">
																{#each figvar.packageInserts as bpz}
																	<img
																		class="w-auto max-h-32"
																		src="{imgdom}/{figvar.collectionId}/{figvar.id}/{bpz}"
																		alt="Beipackzettel"
																	/>
																{/each}
															</div>
														</svelte:fragment>
													</AccordionItem>
												{/each}
											</Accordion>
										</svelte:fragment>
									</AccordionItem>
								</Accordion>
							{/if}
						</svelte:fragment>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>

		{#if data.pageData.subser.packaging.length != 0}
			<h2 class="h2 mb-4 mt-6 text-center">Verpackungen</h2>
			<div class="card">
				<Accordion>
					{#each data.pageData.subser.packaging as packaging}
						<AccordionItem>
							<svelte:fragment slot="summary">
								<span class="font-bold">{packaging.name}</span></svelte:fragment
							>
							<svelte:fragment slot="content">
								<div class="card">
									{#each packaging.images as imag}
										<img
											src="{imgdom}/{packaging.collectionId}/{packaging.id}/{imag}"
											alt="Verpackung"
										/>
									{/each}
								</div>
							</svelte:fragment>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		{/if}
	</div>

	<p class="opacity-50">Erstellt: {data.pageData.subser.created}</p>
	<p class="opacity-50">Verändert: {data.pageData.subser.updated}</p>
</div>
