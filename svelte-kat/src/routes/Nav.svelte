<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DownIcon from './DownIcon.svelte';
	
	export let title: string;
	export let options: string[];
	let testvalue = '';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: title + 'navbar',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};
</script>

<button class="btn variant-ringed select-none" use:popup={popupCombobox}>
	{title}
	<DownIcon/>
</button>
<div class="card shadow-xl py-1 select-none" data-popup="{title}navbar">
	<ListBox rounded="rounded-none">
		{#each options as option}
			<ListBoxItem
        class="rounded-lg text-sm "
        active="hover:variant-soft"
				bind:group={testvalue}
				name="medium"
				value={option}
				on:click={() => {}}>{option}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
