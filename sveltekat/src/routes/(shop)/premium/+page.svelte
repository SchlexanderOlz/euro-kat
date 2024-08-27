<script lang="ts">
	import { Check, ThumbsUp } from 'lucide-svelte';
	import type { PageData } from '../create-checkout-session/premium/$types';
	import { browser } from '$app/environment';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';

	export let data: PageData;
</script>

<div class="w-full h-full flex items-center justify-center px-[5%]">
	<div class="card w-full max-w-max p-2 px-3 md:text-lg text-sm">
		<h1 class="h2">Premium</h1>
		<p class="mt-3 mb-4">Für alle Sammler das perfekte Paket:</p>
		<div class="flex my-3 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2">Trage ein, welche Figuren du bereits hast!</p>
		</div>
		<div class="flex my-3 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2">Eigene Kategorien!</p>
		</div>
		<div class="flex my-3 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2">Sortieren deiner vorhandenen Figuren!</p>
		</div>
		<div class="flex my-3 items-center">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2">Markiere deine Figuren mit Farben!</p>
		</div>
		<div class="flex my-3">
			<Check class="stroke-success-600 stroke-[3] shrink-0" />
			<p class="ml-2">Nie mehr den Überblick verlieren!</p>
		</div>
		<div class="flex my-3">
			<ThumbsUp class="stroke-warning-600 stroke-[2] shrink-0" />
			<p class="ml-2">Mehr Vorteile in Arbeit!</p>
		</div>

		<div class="w-full mb-1">
			<p class="text-4xl mr-4 text-end">
				<span class="text-sm">3 Tage</span> <span class="font-semibold">0€</span>
				<span class="text-sm">statt</span> <s class="font-thin">5,99€</s>
				<span class="text-sm">/m</span>
			</p>
		</div>

    <SignedOut>
      <a href="/sign-in">
				<button class="btn variant-ghost-primary w-full mt-4 sm:text-base text-sm"
					>Jetzt Premium holen!</button
				>
			</a>
    </SignedOut>
			
    <SignedIn let:user>
      <a
      href="https://buy.stripe.com/test_aEU5lbcA7729gBG8ww?prefilled_email={user?.emailAddresses[0]}"
      target="_blank"
    >
      <button class="btn variant-ghost-primary w-full mt-4 sm:text-base text-sm"
        >Jetzt Premium holen!</button
      >
    </a>
    </SignedIn>
			
	</div>
</div>
