<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { Item } from '$lib/NavItems';
	import { subscription } from '$lib/Stores';
	import { ChevronDown } from 'lucide-svelte';

	export let item: Item;
	$: path = $page.url.pathname || '';
	$: selected = Object.values(item.references).includes(path);

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: item.title + 'navbar',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};

	let premium = $subscription === 'premium' && item.title === 'Premium';
</script>

<button
	class="btn mx-1 pr-3 select-none {premium
		? 'variant-ghost-primary'
		: !selected
			? 'variant-ringed'
			: 'variant-ghost'}"
	use:popup={popupCombobox}
>
	{item.title}
	<ChevronDown class="ml-1" />
</button>

<div class="card shadow-xl select-none" data-popup="{item.title}navbar">
	<ListBox rounded="rounded-sm">
		{#each Object.keys(item.references) as reference}
			<ListBoxItem
				active="variant-ringed-surface rounded-sm {premium ? 'variant-soft-primary' : ''}"
				hover="hover:bg-primary-500/10"
				bind:group={path}
				name="medium"
				value={item.references[reference]}
				on:click={() => {
					goto(item.references[reference]);
				}}
			>
				{reference}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
