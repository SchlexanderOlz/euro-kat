<script lang="ts">
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import { Drawer, type DrawerSettings, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import NavItem from './NavItem.svelte';
	import { NavItems, PremiumItems } from '$lib/NavItems';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	import { Sparkles } from 'lucide-svelte';
	import { subscription } from '$lib/Stores';

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

			{#if $subscription !== 'premium'}
				<a class="w-full flex justify-center mb-2 px-3" href="/premium">
					<button class="btn variant-ghost-primary w-full">Premium <Sparkles class="ml-2" /></button
					>
				</a>
			{/if}

			<div class="flex flex-col mx-2">
				{#each NavItems as item}
					{#if Object.keys(item.references).length > 1}
						<div class="mt-1 mb-3 w-full pl-1 pr-2">
							<p class=" w-full">{item.title}</p>
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

				{#if $subscription === 'premium'}
					{#each PremiumItems as item}
						{#if Object.keys(item.references).length > 1}
							<div class="mt-1 mb-3 w-full pl-1 pr-2">
								<p class=" w-full flex">Premium <Sparkles class="p-0.5 ml-1" /></p>
								{#each Object.keys(item.references) as key}
									<NavItem
										title={key}
										link={item.references[key]}
										styles={`my-0.5 w-full ${
											item.references[key] == path
												? '!variant-ghost-primary'
												: '!variant-soft-primary'
										}`}
									/>
								{/each}
							</div>
						{:else}
							<NavItem
								title={item.title}
								link={item.references['']}
								styles={`my-0.5 ${item.references[''] == path ? '!variant-ghost-primary' : '!variant-soft-primary'}`}
							/>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<div class="w-full px-5">
			<SignedIn>
				<SignOutButton redirectUrl="/" class="btn variant-ghost-secondary w-full mb-4"
					>Ausloggen</SignOutButton
				>
			</SignedIn>
			<SignedOut>
				<a href="/sign-in" class="">
					<button class="btn variant-ghost-secondary w-full mb-4">Einloggen</button>
				</a>
			</SignedOut>
		</div>
	</div>
</Drawer>

<button
	on:click={sideOpen}
	class="lg:hidden flex cursor-pointer justify-center items-center hover:scale-105 duration-150"
>
	<MenuIcon />
</button>
