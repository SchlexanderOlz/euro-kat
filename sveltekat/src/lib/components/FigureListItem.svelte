<script lang="ts">
	import type { Figure } from "$lib/Types";

  export let figure: Figure;
</script>

<div class="card py-1 px-2 my-1.5 flex relative cursor-default">
  <div class="flex">
    <p class="w-80 flex-shrink-0">{figure.name}</p>
    {#if figure.note && figure.note != 'undefined'}
      <p class="text-surface-400 ml-4 mr-16 md:flex hidden">Notiz: {figure.note.substring(0, 30)}...</p>
    {/if}
    
  </div>
  <p class="w-max absolute right-2 text-right">#{figure.mpgNr}</p>
</div>