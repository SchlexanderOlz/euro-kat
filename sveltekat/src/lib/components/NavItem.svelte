<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let link: string;
	export let styles: string = '';

	$: path = $page.url.pathname || '';
</script>

<a
	data-sveltekit-preload-data
	class="btn variant-ringed mx-1 select-none {styles} {path == link ? 'variant-ghost' : ''}"
	href={link}><p>{title}</p></a
>
