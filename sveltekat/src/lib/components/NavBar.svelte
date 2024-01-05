<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavBox from './NavBox.svelte';
	import { NavItems, type Item } from '$lib/NavItems';
	import NavItem from './NavItem.svelte';
	import SideNav from './SideNav.svelte';
	import EkLogo from '$lib/icons/EKLogo.svelte';
</script>

<AppBar padding="p-0">
	<svelte:fragment slot="lead">
		<a class="flex-shrink-0" href="/">
			<EkLogo
				classes="h-14 w-auto m-2 -mr-2 hover:scale-110 duration-150 cursor-pointer flex-shrink-0"
			/>
		</a>
	</svelte:fragment>
	<div class="w-max content-center select-none md:flex hidden">
		{#each NavItems as item}
			{#if Object.keys(item.references).length > 1}
				<NavBox {item} />
			{:else}
				<NavItem title={item.title} link={item.references['']} />
			{/if}
		{/each}
	</div>
	<svelte:fragment slot="trail">
		<div class="mr-4 flex flex-row items-center">
			<a class="xxs:flex hidden" href="https://www.paypal.com/" target="_blank">
				<button class="btn variant-ghost-primary mr-4">Spenden</button>
			</a>
			<div class="md:flex hidden">
				<LightSwitch />
			</div>
			<SideNav />
		</div>
	</svelte:fragment>
</AppBar>
