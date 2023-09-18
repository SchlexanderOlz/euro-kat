<script lang="ts">
	import type { Figure } from "$lib/Types";

  export let figure: Figure;
</script>

<div class="card py-1 px-2 my-1.5 flex justify-between">
  <div class="flex">
    <p class="w-96">{figure.name}</p>
    {#if figure.note}
      <p class="text-surface-400">Notiz: {figure.note}</p>
    {/if}
    
  </div>
  <p class="w-32 text-right"><span class="">Nr: </span>#{figure.mpgNr}</p>
</div>