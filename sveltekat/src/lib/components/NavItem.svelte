<script lang="ts">
	import type { Item } from "$lib/NavItems";

  export let title: string;
  export let link: string;
  export let styles: string = "";
</script>

<a data-sveltekit-preload-data class="btn variant-ringed mx-1 select-none {styles}" href={link}><p>{title}</p></a>