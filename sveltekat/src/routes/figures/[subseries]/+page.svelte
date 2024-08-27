<script lang="ts">
	import { imgdom } from '$lib/PocketBase';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { Minus, Plus } from 'lucide-svelte';
	import { categories } from '$lib/Stores';
	import CollectedSnippet from './CollectedSnippet.svelte';

	export let data: PageData;

  $categories = data.categories
</script>

<svelte:head>
	<title>Euro-Kat | Figuren-Katalog</title>
	<meta name="description" content="Figur" />
</svelte:head>

<h2 class="h2 my-4 text-center break-words md:px-4 px-2">
	{data.pageData.subser?.name || data.pageData.subSeriesFigures[0].name}
</h2>

<p class="text-center md:px-4 px-2">{data.pageData.subser?.thanks}</p>

<div class="w-full flex flex-col items-center mb-10">
	<div class="w-full flex flex-row flex-wrap justify-center">
		{#if data.pageData.subservars != undefined && data.pageData.subservars[0].images.length != 0}
			{#each data.pageData.subservars[0].images as imag}
				<img
					class="w-max mt-4 px-4 "
					src="{imgdom}/{data.pageData.subservars[0].collectionId}/{data.pageData.subservars[0]
						.id}/{imag}"
					alt="{data.pageData.subser.name} Beipackzettel"
				/>
			{/each}
		{:else}
			<img class="mt-4" src="/images/want_bpz.jpg" alt="Kein Beipackzettel-Foto verfügbar" />
		{/if}
	</div>

	<h2 class="h2 mb-4 mt-6 text-center">Figuren</h2>
	<div class="w-[90%] sm:w-[75%] md:w-[50%]">
		{#each data.pageData.subSeriesFigures as fig}
			<p class="mt-3 ml-1 text-xl font-bold "> {fig.header}</p>
			<div class="flex flex-col xl:flex-row card my-2 p-2">
				<div class="xl:w-72 w-auto pr-2 shrink-0 flex flex-col ">
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold">MPG-Nr:</span>
						{fig.mpgNr}
					</p>
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold">Name:</span>
						{fig.name}
					</p>
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold">Kennung:</span>
						{fig.identifier}
					</p>
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold">Aufkleber:</span>
						{fig.sticker ? 'Ja' : 'Nein'}
					</p>
					<p class="font-normal my-0.5 break-all">
						<span class="font-bold break-keep">Bemerkung:</span>
						{fig.note}
					</p>
          <div class="h-0.5 rounded-full my-2 w-full  bg-surface-300-600-token"/>
          <div class=" w-full h-full grow space-y-1 mb-1">
              <p class="font-bold">Gesammelt:</p>
              
              <CollectedSnippet figure={fig} />
              
              <!-- Collected -->

          </div>
				</div>

				<div class="flex flex-wrap xl:justify-start justify-center xl:mt-0 mt-1">
					{#if fig.pictures.length != 0}
						{#each fig.pictures as pic}
							<img
								class="h-40 w-auto"
								src="{imgdom}/{fig.collectionId}/{fig.id}/{pic}"
								alt={fig.name}
							/>
						{/each}
					{:else}
						<img src="/images/want_fig.jpg" alt="Kein Figuren-Foto verfügbar" />
					{/if}
				</div>
			</div>
		{/each}

		{#if data.pageData.variations != undefined && data.pageData.variations.length != 0}
			<h2 class="h2 mb-4 mt-6 text-center">Variationen</h2>
			<div class="flex flex-wrap w-full justify-center">
				{#each data.pageData.variations as variation}
					{#if variation.variation != '' && variation.variation != 'undefined' && variation.images.length != 0}
						<div class="card p-2 m-1 w-fit">
							{#if variation.variation != '' && variation.variation != null && variation.variation != 'undefined'}
								<p class="font-bold mb-1">{variation.variation}</p>
							{/if}
							{#each variation.images as image}
								<img
									src="{imgdom}/{variation.collectionId}/{variation.id}/{image}"
									alt="Variation"
								/>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<h2 class="h2 mb-4 mt-6 text-center">Beipackzettelübersicht</h2>
		<div class="card">
			<Accordion>
				{#if data.pageData.subservars != undefined && data.pageData.subservars.length != 0}
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
																<span class="font-bold">
																	{#if figvar.expand.figureId?.mpgNr}
																		{#if figvar.habIch}
																			<img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Red_x.svg" class="w-6 h-6 inline-block" alt="Red X">
																		{/if}
																		{figvar.expand.figureId.mpgNr} - {figvar.expand.figureId.name}
																	{:else}
																		Nicht bekannt?
																	{/if}
																</span>
															</svelte:fragment>
															<svelte:fragment slot="content">
																<div class="h-auto max-w-[100%] flex flex-wrap">
																	{#if figvar.packageInserts.length > 0}
																		{#each figvar.packageInserts as bpz}
																			<img
																				class="w-auto max-h-32"
																				src="{imgdom}/{figvar.collectionId}/{figvar.id}/{bpz}"
																				alt="Beipackzettel"
																			/>
																		{/each}
																	{:else}
																		<img
																			class="w-auto max-h-32"
																			src="/images/want_bpz.jpg"
																			alt="Missing Beipackzettel"
																		/>
																	{/if}
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
				{/if}
			</Accordion>
		</div>

		{#if data.pageData.subser != undefined && data.pageData.subser.packaging.length != 0}
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

	<p class="mt-5 opacity-50">
		Erstellt: {new Date(data.pageData.subser?.created).toLocaleDateString()}
	</p>
	<p class="opacity-50 -mb-4">
		Verändert: {new Date(data.pageData.subser?.updated).toLocaleDateString()}
	</p>
</div>
