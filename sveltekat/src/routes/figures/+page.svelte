<script lang="ts">
	import { connection, getFigureDetail, type Figure } from '$lib/PocketBase';
	import type { FigurePage } from '$lib/Types';
	import FigureList from '$lib/components/FigureList.svelte';
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const figures: Figure[] = data.figures;

	//implement load more

	let res: FigurePage;
	async function test()  {
	res = await getFigureDetail("b04vbp0wtedmfqj")
	//console.log(res);
	}
	test()
	
</script>

<div class="h-full w-full sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<FigureList {figures} />
</div>
