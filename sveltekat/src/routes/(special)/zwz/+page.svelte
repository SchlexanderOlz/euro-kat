<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="md:mt-8 mt-4 w-full lg:px-[25%] sm:px-[15%] px-[10%] cursor-default">
	<h1 class="h1 text-center md:mb-4 mb-1 break-all">Zusatzwarnzettel</h1>
	<p>
		Neben den üblichen Warnhinweiszetteln liegen, vermehrt seit 2010, einigen Serien/ Spielzeugen
		Zusatzwarnzettel bei. Bisher sind die Zusatzwarnzettel nur in der beiliegenden Form (nicht
		angehängt) bekannt.<br /> Im Gegensatz zu den üblichen Warnhinweiszetteln, die einen
		allgemeingültigen/ neutralen Warntext haben, ist der Text der Zusatzwarnzettel immer auf das
		jeweilige Spielzeug bezogen. Er gehört folglich, neben Beipackzettel und ggf. Bauanleitung etc,
		zum Inhalt!<br /> Auffällig bei den Zusatzwarnzettel ist, dass diese nicht jedem Spielzeug der Serie
		beiliegen und teilweise bei dem gleichem Spielzeug unterschiedliche Zettel verwendet werden.
	</p>
	<p class="my-4">
		Wie bei bereits den Warnhinweiszetteln gibt es auch bei den Zusatzwarnzetteln die gleichen
		Variationen zu entdecken:<br /> - dünneres oder dickeres Papier in matt oder glänzend<br /> - verschiedenen
		Schriftstärken der Warntexte<br /> - Titelzeile der Ländertexte in Farbnuancen zwischen violett und
		rot<br /> - usw.
	</p>
	<p>In diesem Katalogteil geht es ausschließlich um die zusätzlichen Warnhinweiszettel!</p>

	<div class="mt-6 mb-10">
		{#each data.extras as extra (extra.id)}
			<a href="/zwz/{extra.id}" data-sveltekit-preload-data>
				<div class="card card-hover cursor-pointer p-1 px-2 my-1 flex">
					<p class="w-28 flex-shrink-0">{extra.name}</p>
					<p class="opacity-60 whitespace-nowrap overflow-hidden">
						{extra.text.substring(0, 30)}...
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>
