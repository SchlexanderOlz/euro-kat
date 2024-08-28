<script lang="ts">
	import { type Figure } from '$lib/Types';
	import { onMount } from 'svelte';

	export let figure: Figure;

	let wishlisted = false;

	onMount(async () => {
		wishlisted = await (await fetch('/api/wishlist/' + figure.id)).json();
	});

	async function toggleWishlist() {
		wishlisted = await (
			await fetch('/api/wishlist/' + figure.id, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
		).json();
	}
</script>

<input on:click={toggleWishlist} bind:value={wishlisted} type="checkbox" class="input checkbox" />
