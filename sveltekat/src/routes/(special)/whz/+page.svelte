<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="md:mt-8 mt-4 w-full lg:px-[25%] sm:px-[15%] px-[10%] cursor-default">
	<h1 class="h1 text-center md:mb-4 mb-1 break-all">Warnhinweiszettel</h1>
	<p>
		1989 begann Ferrero neben dem Beipackzettel einen zusätzlichen Warnhinweiszettel den
		Ü-Ei-Inhalten beizufügen mit dem Hinweis, dass das Spielzeug für Kinder unter 3(5) Jahren nicht
		geeignet ist, da Kleinteile verschluckt bzw. eingeatmet werden können. Der genaue Text wechselte
		im Lauf der Jahre, blieb vom Sinn her jedoch immer gleich.
	</p>
	<p class="my-4">
		Da diese zusätzlichen Zettel in der Vergangenheit (nicht nur von mir) kurz nach dem Öffnen des
		Ü-Ei's meist entsorgt wurden, ist es heute nicht ganz einfach die verschiedenen WHZ einem
		Zeitraum oder auch einer regionalen Verbreitung zuzuordnen. So stellen die dokumentierten
		(wann/wo gefunden) Warnhinweis-zettel immer eine Momentaufnahme da.<br /> Dies spiegelt sich in manchen
		Katalogangaben wie z.B. gefunden bei C-118 wieder. Dies meint nicht, dass dieser Zettel NUR bei dieser
		Nummer enthalten war. Sondern es sagt nur, dass dieses die einzige dokumentierte Erscheinung ist.
	</p>
	<p>In diesem Katalogteil geht es ausschließlich um die zusätzlichen Warnhinweiszettel!</p>

	<div class="mt-6 mb-10">
		{#each data.warnings as warning (warning.id)}
			<a href="/whz/{warning.id}" data-sveltekit-preload-data>
				<div class="card card-hover cursor-pointer p-1 px-2 my-1 flex">
					<p class="w-36 flex-shrink-0">{warning.name}</p>
					<p class="opacity-60 whitespace-nowrap overflow-hidden">
						{warning.general.substring(0, 30)}...
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
