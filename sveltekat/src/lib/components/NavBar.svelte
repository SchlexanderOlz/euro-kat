<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import NavBox from './NavBox.svelte';
	import { NavItems, type Item } from '$lib/NavItems';
	import NavItem from './NavItem.svelte';
	import SideNav from './SideNav.svelte';
	import EkLogo from '$lib/icons/EKLogo.svelte';

	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	import { Sparkles } from 'lucide-svelte';
</script>

<AppBar padding="p-0">
	<svelte:fragment slot="lead">
		<a class="flex-shrink-0" href="/">
			<EkLogo
				classes="h-14 w-auto m-2 -mr-2 hover:scale-110 duration-150 cursor-pointer flex-shrink-0"
			/>
		</a>
	</svelte:fragment>
	<div class="w-max content-center select-none lg:flex hidden">
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
			<a class="xxs:flex hidden" href="/premium">
				<button class="btn variant-ghost-primary mr-4">Premium <Sparkles class="ml-2" /></button>
			</a>
			<ClerkLoaded>
				<SignedIn>
					<SignOutButton redirectUrl="/" class="mr-4 btn variant-ghost-secondary sm:flex hidden"
						>Ausloggen</SignOutButton
					>
				</SignedIn>
				<SignedOut>
					<a href="/sign-in">
						<button class="btn variant-ghost-secondary mr-4 sm:flex hidden">Einloggen</button>
					</a>
				</SignedOut>
			</ClerkLoaded>

			<ClerkLoading>
				<button class="btn variant-ghost-secondary mr-4 sm:flex hidden">Ladet</button>
			</ClerkLoading>
			<div class="lg:flex hidden">
				<LightSwitch />
			</div>

			<SideNav />
		</div>
	</svelte:fragment>
</AppBar>
