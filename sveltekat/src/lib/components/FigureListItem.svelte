<script lang="ts">
	import type { Figure } from "$lib/Types";

  export let figure: Figure;
</script>

<div class="card py-1 px-2 my-1.5 flex justify-between">
  <div class="flex">
    <p class="w-32">{figure.figureName}</p>
    <p class="opacity-50">Note: {figure.note}</p>
  </div>
  <p class="w-32 text-right"><span class="opacity-50">Nr: </span>#{figure.mpgNr}</p>
</div>