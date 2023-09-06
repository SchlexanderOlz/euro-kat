<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DownIcon from '../icons/DownIcon.svelte';
	import type { Item } from '$lib/NavItems';

	export let item: Item;
	let testvalue = '';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: item.title + 'navbar',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};
</script>

<button class="btn variant-ringed ml-1 select-none" use:popup={popupCombobox}>
	{item.title}<DownIcon />
</button>
<div class="card shadow-xl select-none" data-popup="{item.title}navbar">
	<ListBox rounded="rounded-none">
		{#each Object.keys(item.references) as reference}
			<ListBoxItem
				class=""
				active="variant-ringed-surface rounded-md"
				bind:group={testvalue}
				name="medium"
				value={item.references[reference]}
				on:click={() => {
					console.log(item.references[reference]);
				}}
			>
				{reference}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
