<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavBox from './NavBox.svelte';
	import { NavItems, type Item } from '$lib/NavItems';
	import NavItem from './NavItem.svelte';
</script>

<AppBar padding="p-0">
	<svelte:fragment slot="lead">
		<a href="/">
			<img
				class="h-14 w-auto m-2 -mr-1 hover:scale-110 duration-150 cursor-pointer"
				src="images/logo_klein.png"
				alt="Elefant"
				width="124px"
				height="120px"
			/>
		</a>
	</svelte:fragment>
	<div class="w-max content-center select-none">
		{#each NavItems as item}
			{#if Object.keys(item.references).length > 1}
				<NavBox {item} />
			{:else}
				<NavItem {item} />
			{/if}
		{/each}
	</div>
	<svelte:fragment slot="trail">
		<div class="mr-4">
			<LightSwitch />
		</div>
	</svelte:fragment>
</AppBar>
