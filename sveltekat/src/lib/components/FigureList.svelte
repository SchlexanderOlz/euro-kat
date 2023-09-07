<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import FilterBox from "./FilterBox.svelte";

  const updateSearchParams = (key: string, value: string) => {
		const searchParams = new URLSearchParams($page.url.searchParams);
		searchParams.set(key, value);
		goto(`?${searchParams.toString()}`, {keepFocus: true});
	};

  let inputValue = "";
  let debounceTimer: NodeJS.Timeout;

  // QUERY FRIENDLY (max. 1 request/sec to db)
  //async function updateResults() {
  //  clearTimeout(debounceTimer);
  //  debounceTimer = setTimeout(async () => {
  //    updateSearchParams("q", inputValue)
  //    // db query
  //    console.log("update");
  //    
  //  }, 500);
  //}

  // QUERY UNFRIENDLY (lots of db requests if user spams keys), but don't need "go" button
  function updateResults() {
    updateSearchParams("q", inputValue)
  }
</script>

<div>

  <div class="flex flex-col sm:flex-row mb-3">
    <div class="w-full mr-2 relative">
      <input bind:value={inputValue} on:input={updateResults} class="input w-full " placeholder="Suche">
      <button class="btn absolute right-0 variant-ringed  ring-opacity-30" on:click={updateResults}>Los</button>
    </div>
    
    <FilterBox/>
  </div>
  

  <slot/>
</div>
