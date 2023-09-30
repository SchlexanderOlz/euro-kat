<script lang="ts">
	import { connection, domain, imgdom } from '$lib/PocketBase';
	import type { WarningZD } from '$lib/Types';
	import type { PageData } from './$types';

	export let data: PageData;

	let warn: WarningZD = data.warningDetail;

	// thanks
</script>

<div class="w-full md:px-[20%] sm:px-[15%] px-[10%] my-8">
	<h2 class="h2 mb-4">{warn.name}</h2>
	{#if false}
		<p class="mb-1 font-bold">Dank an: <span class="text-red-600 font-normal">to add</span></p>
	{/if}

	{#if warn.general != '' && warn.general != null}
		<p class="font-bold">Allgemeines:</p>
		<p class="mb-1">{warn.general}</p>
	{/if}

	{#if warn.header != '' && warn.header != null}
		<p class="font-bold">Addresskopf:</p>
		<img
			class="mb-1"
			src="{imgdom}/{warn.collectionId}/{warn.id}/{warn.header}"
			alt="Addresskopf"
		/>
	{/if}

	{#if warn.countryA != '' && warn.countryA != null}
		<p class="font-bold mb-1">
			Länderkennzeichen A-Seite: <span class="font-normal">{warn.countryA}</span>
		</p>
	{/if}

	{#if warn.countryB != '' && warn.countryB != null}
		<p class="font-bold mb-1">
			Länderkennzeichen B-Seite: <span class="font-normal">{warn.countryB}</span>
		</p>
	{/if}

	{#if warn.format != '' && warn.format != null}
		<p class="font-bold mb-1">Format: <span class="font-normal">{warn.format}</span></p>
	{/if}

	{#if warn.variations != '' && warn.variations != null}
		<p class="font-bold mb-1">
			Bekannte Varianten: <span class="font-normal">{warn.variations}</span>
		</p>
	{/if}

	{#each warn.expand.types as vari}
		<div class="card w-fit my-2 pt-1 pb-2 px-2">
			<p class="mb-1">{vari.name}</p>
			{#each vari.images as imag}
				<img src="{imgdom}/{vari.collectionId}/{vari.id}/{imag}" alt={vari.name} />
			{/each}
		</div>
	{/each}
</div>
