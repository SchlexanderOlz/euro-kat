<script lang="ts">
	import type { PageData } from './$types';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import CategoryModal from './CategoryModal.svelte';
	import { categories } from '$lib/Stores';
	import { Edit } from 'lucide-svelte';
	import { type Category } from '$lib/Types';
	import { onMount } from 'svelte';

	export let data: PageData;

	$categories = data.categories;

	const modalStore = getModalStore();

	onMount(async () => {
		$categories = await fetch('/my-categories').then((res) => res.json());
	});

	function openModal(category: Category | null = null) {
		console.log('open modal');
		const modal: ModalSettings = {
			type: 'component',
			component: { ref: CategoryModal },
			meta: { category: category }
		};
		modalStore.trigger(modal);
	}
</script>

<div class="w-full h-full flex flex-col items-center sm:px-[10%] px-[5%] sm:mt-12 mt-6 mb-16">
	<h1 class="h1">Deine Kategorien</h1>
	<p class="my-6">Erstelle Kategorien um deine Figuren zu organisieren.</p>
	{#each $categories as category}
		<div
			class="card w-full max-w-96 p-1 px-2 my-1 relative"
			style="background-color: {category.color}45;"
		>
			<p>{category.name}</p>
			<button
				on:click={() => {
					openModal(category);
				}}
				class="absolute btn variant-ghost-warning h-6 w-6 p-1 top-1 right-1"
			>
				<Edit class="h-4 w-4" />
			</button>
		</div>
	{:else}
		<p class="opacity-75">
			Noch keine Kategorie erstellt. Erstelle eine um das Sammeln zu beginnen!
		</p>
	{/each}
	<button
		on:click={() => {
			openModal();
		}}
		class="btn variant-soft-primary mt-4">Kategorie erstellen</button
	>
</div>
