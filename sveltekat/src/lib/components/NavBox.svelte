<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DownIcon from '../icons/DownIcon.svelte';
	import type { Item } from '$lib/NavItems';
	import { subscription } from '$lib/Stores';

	export let item: Item;
	$: path = $page.url.pathname || '';
	$: selected = Object.values(item.references).includes(path);

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: item.title + 'navbar',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};
</script>

{#if $subscription === 'premium' && item.title === 'Premium'}
	<button class="btn mx-1 select-none variant-ghost-primary" use:popup={popupCombobox}>
		{item.title} <DownIcon />
	</button>
{:else}
	<button
		class="btn mx-1 select-none {selected ? 'variant-ghost' : 'variant-ringed'}"
		use:popup={popupCombobox}
	>
		{item.title}<DownIcon />
	</button>
{/if}

<div class="card shadow-xl select-none" data-popup="{item.title}navbar">
	<ListBox rounded="rounded-sm">
		{#each Object.keys(item.references) as reference}
			<ListBoxItem
				active="variant-ringed-surface rounded-sm"
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
