<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import SignUp from 'clerk-sveltekit/client/SignUp.svelte';
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
	export let data: PageData;

	let firstVisit = $page.url.searchParams.get('firstVisit') === 'true';
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	{#if firstVisit}
		<a href="/" class="w-full mx-[5%] max-w-96">
			<div class="flex items-center justify-center variant-ghost-surface mb-4 mx-[5%] p-2 pr-3">
				<ArrowLeft class="shrink-0 mr-2"/> <p>Weiter zur normalen Seite</p>
			</div>
		</a>
	{/if}
	<SignUp redirectUrl="/" />
</div>
