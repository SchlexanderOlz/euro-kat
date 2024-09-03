<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const blacklist = ['', 'MPGNR', 'AUCH/NUR IN DEUTSCHLAND'];
</script>

<div class="w-full h-full flex flex-col items-center sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<h1 class="h1 mb-10">Alle Serien</h1>

	<div class="w-full grid-cols-5 grid gap-4 max-w-96">
		{#each data.series as series}
			{#if !blacklist.includes(series.seriesLetter)}
				<a href="/figures?series={series.seriesLetter}">
					<div class="card py-1 px-2 text-center">
						{series.seriesLetter}
					</div>
				</a>
			{/if}
		{/each}
	</div>
</div>
