<script lang="ts">
	import type { Figure } from '$lib/Types';

	export let figure: Figure;
</script>

<a
	class="card card-hover py-1 px-2 my-1.5 flex relative hover:bg-surface-200-700-token"
	href="/figures/{figure.id}"
>
	<div class="flex">
		<p class="w-80 flex-shrink-0">{figure.name}</p>
		{#if figure.expand.subSeriesId.name && figure.expand.subSeriesId.name != 'undefined'}
			<p class="text-surface-400 ml-4 mr-16 md:flex hidden">
				{figure.expand.subSeriesId.name.substring(0, 30)}...
			</p>
		{/if}
	</div>
	<p class="w-max absolute right-2 text-right">#{figure.mpgNr}</p>
</a>
