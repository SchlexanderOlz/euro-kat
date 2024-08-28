<script lang="ts">
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import { history } from '$lib/Stores';
</script>

<div class="w-full h-full flex flex-col items-center p-12">
	<h1 class="h1 text-center mb-10">Dein Verlauf</h1>
	<div class="w-full max-w-[41rem]">
		{#each $history?.figures || [] as figure}
			<FigureListItem {figure} />
		{:else}
			<p>Du hast keine Figuren in letzter Zeit angesehen.</p>
		{/each}
	</div>
</div>
