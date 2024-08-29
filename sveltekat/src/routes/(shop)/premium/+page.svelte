<script lang="ts">
	import { Check, ThumbsUp, TrendingUp } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';

	import ClerkLoading from 'clerk-sveltekit/client/ClerkLoading.svelte';
	import ClerkLoaded from 'clerk-sveltekit/client/ClerkLoaded.svelte';
	import SignOutButton from 'clerk-sveltekit/client/SignOutButton.svelte';
	import { PUBLIC_STRIPE_PREMIUM_LINK } from '$env/static/public';
</script>

<div class="w-full h-full flex items-center justify-center px-[5%]">
	<div class="card w-full max-w-max p-2 px-3 md:text-lg text-sm">
		<h1 class="h2">Premium</h1>
		<p class="mt-3 mb-4 opacity-90">Für alle Sammler das perfekte Paket:</p>
		<div class="flex my-4 items-center">
			<TrendingUp class="stroke-warning-600 stroke-[2] shrink-0" />
			<p class="ml-2 max-w-96">
				Mit dem Kauf dieses Abos unterstützen Sie den Fortbestand von Euro-Kat!
			</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Trage ein, welche Figuren du bereits hast!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Eigene Kategorien!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Eigene Wunschliste!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">
				Sortieren deiner vorhandenen Figuren und deiner Wunschliste!
			</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Markiere deine Figuren mit Farben!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">E-Mail Benachrichtigungen bei neuen Figuren!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Verlauf von angesehenen Figuren!</p>
		</div>
		<div class="flex my-4 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Nie mehr den Überblick verlieren!</p>
		</div>
		<div class="flex my-4 items-center">
			<ThumbsUp class="stroke-warning-600 stroke-[2] shrink-0" />
			<p class="ml-2 max-w-96 opacity-80">Mehr Vorteile in Arbeit!</p>
		</div>

		<div class="w-full mb-1">
			<p class="text-4xl mr-4 text-end">
				<span class="text-sm">3 Tage</span> <span class="font-semibold">0€</span>
				<span class="text-sm">statt</span> <s class="font-thin">4,99€</s>
				<span class="text-sm">/m</span>
			</p>
		</div>

		<ClerkLoaded>
			<SignedOut>
				<a href="/sign-up">
					<button class="btn variant-ghost-primary w-full mt-4 sm:text-base text-sm"
						>Jetzt Premium holen!</button
					>
				</a>
			</SignedOut>

			<SignedIn let:user>
				<a
					href="{PUBLIC_STRIPE_PREMIUM_LINK}?prefilled_email={user?.emailAddresses[0]}"
					target="_blank"
				>
					<button class="btn variant-ghost-primary w-full mt-4 sm:text-base text-sm"
						>Jetzt Premium holen!</button
					>
				</a>
			</SignedIn>
		</ClerkLoaded>
		<ClerkLoading>
			<button class="btn variant-ghost-primary w-full mt-4 sm:text-base text-sm">Ladet</button>
		</ClerkLoading>
	</div>
</div>
