<script lang="ts">
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import { Drawer, type DrawerSettings, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import NavItem from './NavItem.svelte';
	import { NavItems } from '$lib/NavItems';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'sideNav',
		bgDrawer: '',
		bgBackdrop: 'bg-surface-500/50',
		width: 'w-[220px]',
		padding: 'p-0',
		rounded: 'rounded-none',
		position: 'right'
	};

	function sideOpen() {
		drawerStore.open(drawerSettings);
	}

	function sideClose() {
		drawerStore.close();
	}

	let mount = false;
	onMount(() => {
		mount = true;
	});

	$: path = $page.url.pathname || '';
	let curPath = path;

	$: if (path != curPath) {
		sideClose();
		curPath = path;
	}
</script>

<Drawer>
	<div class="h-full flex flex-col justify-between">
		<div>
			<div class=" flex h-20 mx-4 pl-2 justify-between items-center">
				<div><LightSwitch bgLight="bg-surface-50" ring="ring-[1.5px] ring-current" /></div>

				<button class="cursor-pointer hover:scale-105 duration-150" on:click={sideClose}>
					<CloseIcon />
				</button>
			</div>

			<div class="flex flex-col mx-2">
				{#each NavItems as item}
					{#if Object.keys(item.references).length > 1}
						<div class="mt-1 mb-3 w-full pl-1 pr-2">
							<p class=" w-full">Spezial</p>
							{#each Object.keys(item.references) as key}
								<NavItem
									title={key}
									link={item.references[key]}
									styles={`my-0.5 w-full ${
										item.references[key] == path ? 'variant-ghost-surface' : ''
									}`}
								/>
							{/each}
						</div>
					{:else}
						<NavItem
							title={item.title}
							link={item.references['']}
							styles={`my-0.5 ${item.references[''] == path ? 'variant-ghost-surface' : ''}`}
						/>
					{/if}
				{/each}
			</div>
		</div>
		<a class="w-full flex justify-center mb-4" href="https://www.paypal.com/" target="_blank">
			<button class="btn variant-ghost-primary w-full mx-5">Spenden</button>
		</a>
	</div>
</Drawer>

<button
	on:click={sideOpen}
	class="nav:hidden flex cursor-pointer justify-center items-center hover:scale-105 duration-150"
>
	<MenuIcon />
</button>
