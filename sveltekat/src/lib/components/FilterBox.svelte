<script lang="ts">
	import { ListBox, ListBoxItem, popup } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import FilterIcon from '$lib/icons/FilterIcon.svelte';

	const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`);
	};

	$: lang = $page.url.searchParams.get('lang') || 'en';

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'genbox',
		closeQuery: '.listbox-item',
		placement: 'bottom'
	};

  const filterOptions = [
    "testA", "testB"
  ]

  let filterSelect = '';
</script>

<button class="btn variant-filled select-none sm:mt-0 mt-1" use:popup={popupCombobox}>
	Filter <span class="ml-2 -mr-2"><FilterIcon/></span>
</button>
<div class="card text-xl shadow-xl select-none" data-popup="genbox">
	<ListBox rounded="rounded-lg">
		{#each filterOptions as filter}
			<ListBoxItem
				active="variant-ringed"
				bind:group={filterSelect}
				name="medium"
				aria-label="{filter}"
				value={filter}
				on:click={() => {
					updateSearchParams('filter', filter);
			}}
				>{filter}</ListBoxItem
			>
		{/each}
	</ListBox>
</div>
