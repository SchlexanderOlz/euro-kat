<script lang="ts">
	import { type Category, type FigureData } from "$lib/Types";
	import { Minus, Plus } from "lucide-svelte";

  export let mappedData: { [category_id: string]: FigureData };
  export let category_id: string;
  export let increaseCount: (category_id: string) => void;
  export let decreaseCount: (category_id: string) => void;
</script>

{#if mappedData[category_id] !== undefined && mappedData[category_id].count > 0}
  <button class="btn h-6 w-6 p-0.5" on:click={() => {decreaseCount(category_id)}}><Minus /></button>
{:else}
  <button disabled class="btn h-6 w-6 p-0.5"><Minus /></button>
{/if}
{#if mappedData[category_id] !== undefined}
  <button class="btn h-6 w-6 p-0.5">{mappedData[category_id].count}</button>
{:else}
  <button class="btn h-6 w-6 p-0.5">0</button>
{/if}
<button class="btn h-6 w-6 p-0.5" on:click={() => {increaseCount(category_id)}}><Plus /></button>