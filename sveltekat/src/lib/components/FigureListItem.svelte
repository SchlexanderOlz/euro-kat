<script lang="ts">
	import type { Figure } from '$lib/Types';

	export let figure: Figure;
</script>

<a
	class="card card-hover py-1 px-2 my-1 flex  justify-between relative hover:bg-surface-200-700-token"
	href="/figures/{figure.id}"
>
	<div class="flex">
		<p class="sm:w-80 w-full sm:mr-0 mr-2 overflow-hidden sm:flex-shrink-0 ">{figure.name}</p>
		{#if figure.expand.subSeriesId.name && figure.expand.subSeriesId.name != 'undefined'}
			<p class="text-surface-400 ml-4 mr-16 md:flex hidden ">
				{figure.expand.subSeriesId.name.substring(0, 30)}...
			</p>
		{/if}
	</div>
	<p class="w-max right-2 text-right flex-shrink-0">#{figure.mpgNr}</p>
</a>
