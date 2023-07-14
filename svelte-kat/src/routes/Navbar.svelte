<script lang="ts">
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
import Nav from './Nav.svelte';

  const navitems = [
    {
      "title": "D + Welt Aktuell",
      "options": [
        "August 2023 - Juli 2024"
      ]
    },
    {
      "title": "D + Welt ab 2004",
      "options": [
        "Inhalte nach MPG-Kennung",
        "Dies und Das"
      ]
    },
    {
      "title": "D + Welt",
      "options": [
        "Jahrgänge D",
        "Jahrgänge Welt",
        "Index von A - Z"
      ]
    },
    {
      "title": "Spezialthemen",
      "options": [
        "Kinder Joy D",
        "Kinder Joy US",
        "Kinder Joy Ice",
        "Maxi-Inhalte",
        "HP+BPZ",
        "Rubriken",
        "Warnhinweisz.",
        "Zusatzwarnz.",
        "Berichte"
      ]
    }
  ]
</script>

<AppBar>
  <svelte:fragment slot="lead">
    <img class="h-14" src="src/logo_klein.png" alt="">
  </svelte:fragment>
  <div class="w-max content-center">
  {#each navitems as navitem}
    <Nav title={navitem.title} options={navitem.options}/>
  {/each}
  </div>
  <svelte:fragment slot="trail">
    <LightSwitch/>
  </svelte:fragment>
</AppBar>

