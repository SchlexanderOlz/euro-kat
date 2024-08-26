<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    import SignIn from 'clerk-sveltekit/client/SignIn.svelte'
    export let data: PageData;
</script>

<div class="w-full h-full flex items-center justify-center">
	<SignIn redirectUrl="/"  />
</div>