<script lang="ts">
	import type { Figure } from '$lib/Types';

	export let figure: Figure;
	console.log(figure);
	let color = figure.expand.countryColor ? figure.expand.countryColor.color : '';
	if (figure.isMarked) color = '#8e1a03';
</script>

<a
	style={`background-color: ${color};`}
	class="card card-hover py-1 px-2 my-1 h-min flex justify-between relative hover:bg-surface-200-700-token"
	href="/figures/{figure.id}"
>
	<div class="flex">
		<p
			class="sm:w-80 w-full sm:mr-0 mr-2 overflow-hidden sm:flex-shrink-0 break-all md:flex hidden"
		>
			{figure.name}
		</p>

		{#if figure.expand.subSeriesId?.name}
			<p class="md:text-surface-400 md:ml-4 mr-16 md:flex overflow-y-hidden break-all">
				{figure.expand.subSeriesId.name.substring(0, 30)}...
			</p>
		{:else}
			<p class="text-surface-400 md:ml-4 mr-16 md:flex overflow-y-hidden break-all">
				Keine Serie vorhanden :-/
			</p>
		{/if}
	</div>
	<p class="w-max right-2 text-right flex-shrink-0">#{figure.mpgNr}</p>
</a>
