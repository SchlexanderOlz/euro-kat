<script lang="ts">
	import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    import SignUp from 'clerk-sveltekit/client/SignUp.svelte'
    export let data: PageData;
</script>


<div class="w-full h-full flex items-center justify-center">
     <SignUp redirectUrl="/" />
</div>