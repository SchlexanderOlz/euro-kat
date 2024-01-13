<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
 
  inject({ mode: dev ? 'development' : 'production' });

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();  
</script>

<AppShell>
	<svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
