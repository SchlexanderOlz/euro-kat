<script lang="ts">
	import type { Item } from "$lib/NavItems";

  export let item: Item;
</script>

<a class="btn variant-ringed mx-1 select-none" href={item.references['']}>{item.title}</a>