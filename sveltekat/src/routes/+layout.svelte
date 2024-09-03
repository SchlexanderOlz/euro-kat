<script lang="ts">
	import '../app.postcss';
	import { AppShell, initializeStores, Modal } from '@skeletonlabs/skeleton';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { browser, dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { onMount } from 'svelte';
	import { firstVisit, subscription, userId } from '$lib/Stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	export let data;

	// update on navigation
	$: if (browser && $page.url.href) {
		$subscription = data.subscription;
		$userId = data.userId;
	}

	$: if ($firstVisit && browser) {
		goto('/sign-up?firstVisit=true');
		$firstVisit = false;
	}

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

	:global(.cl-otpCodeFieldInput) {
		@apply input text-surface-800-100-token;
	}

	:global(.cl-button) {
		@apply btn variant-filled-surface text-surface-600-300-token;
	}

	:global(.cl-identityPreviewEditButton) {
		@apply btn;
	}

	:global(.cl-formButtonPrimary) {
		@apply btn variant-filled-primary;
	}

	:global(.cl-formButtonPrimary:hover) {
		@apply btn variant-ghost-primary;
	}

	:global(.cl-card) {
		@apply card rounded-b-none z-0;
	}

	:global(.cl-headerTitle) {
		@apply text-surface-800-100-token text-3xl;
	}

	:global(.cl-footerAction) {
		@apply card w-full rounded-t-none;
	}

	:global(.cl-internal-1dauvpw) {
		@apply hidden;
	}

	:global(.cl-headerSubtitle) {
		@apply text-surface-800-100-token text-xl mt-1;
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

	:global(.cl-formFieldAction) {
		@apply text-surface-800-100-token;
	}

	:global(.cl-formFieldInput) {
		@apply input text-surface-800-100-token;
	}

	:global(.cl-formFieldInfoText) {
		@apply text-surface-800-100-token;
	}

	:global(.cl-formFieldInputShowPasswordButton) {
		@apply text-surface-800-100-token mr-0;
	}

	:global(.cl-footerActionText) {
		@apply text-surface-800-100-token h5 font-token;
	}
	:global(.cl-footerActionText + a) {
		@apply text-surface-800-100-token underline underline-offset-1 h5 font-token font-semibold;
	}

	:global(.cl-backLink) {
		@apply text-lg text-surface-800-100-token;
	}

	:global(.cl-footerActionLink) {
		@apply text-surface-800-100-token underline underline-offset-1 h5 font-token font-semibold;
	}
</style>
