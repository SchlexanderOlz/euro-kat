<script lang="ts">
	import FigureList from '$lib/components/FigureList.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
  <h1 class="h1 text-center mb-10">Deine Figuren</h1>
	<FigureList collectionMode={true}/>
</div>