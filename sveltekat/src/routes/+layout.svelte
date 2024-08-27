<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores, Modal } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
 
  inject({ mode: dev ? 'development' : 'production' });

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<NavBar />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>

<style>
  :global(.cl-internal-b3fm6y) {
    display: none;
  }

  :global(.cl-card) {
    @apply card;
  }

  :global(.cl-headerTitle) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-headerSubtitle) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-socialButtonsBlockButton) {
    @apply text-surface-800-100-token border-2 border-surface-300-600-token;
  }

  :global(.cl-socialButtonsBlockButton:hover) {
    @apply bg-surface-300-600-token;
  }

  :global(.cl-dividerLine) {
    @apply bg-surface-600-300-token;
  }

  :global(.cl-dividerText) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-formFieldLabel) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-formFieldInput) {
    @apply  input text-surface-800-100-token;;
  }

  :global(.cl-formFieldInfoText ) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-formFieldInputShowPasswordButton) {
    @apply text-surface-800-100-token;
  }

  :global(.cl-footerActionText) {
    @apply text-surface-800-100-token;
  }
  :global(.cl-footerActionText + a) {
    @apply text-surface-800-100-token underline underline-offset-1;
  }
</style> 
