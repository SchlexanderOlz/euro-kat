<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Euro-Kat | Hauptseite</title>
	<meta
		name="description"
		content="Der Euro-Katalog als die umfangreichste Informationssammlung zu den Ü-Ei-Inhalten der vergangenen Jahre."
	/>
</svelte:head>

<div class="w-full flex flex-col items-center mb-8">
	<div class="text-xl mt-3 opacity-60 text-center">
		<p>Willkommen! Welcome! Accueillir! Bienvenido! приветствие!</p>
	</div>
	<div class="flex items-center flex-col cursor-default lg:w-[75%] w-[90%]">
		<h1 class="h1 md:text-8xl text-5xl h-full flex mt-5 cursor-default text-center">
			Euro-Katalog
		</h1>
		<p class="text-3xl mt-8 text-center">
			Aktuell über <span class="font-bold">{data.figureCount}</span> Figuren auf
			<span class="underline decoration-[0.5px] underline-offset-4">euro-kat.de</span>!
		</p>
		<p class="mt-4 text-2xl text-center">
			Der <span class="font-bold">Euro-Katalog</span> dient als die umfangreichste Informationssammlung
			zu den Ü-Ei-Inhalten der vergangenen Jahre,
		</p>

		<div class="card p-2 pt-1 mx-4 mt-8 max-w-[1166px]">
			<img
				height="116px"
				width="101px"
				class="w-40 xs:float-left xs:mb-0 mb-2 mr-4 mt-1"
				alt="helmut"
				src="images/daniel.jpg"
			/>

			<p class="mt-1">
				Herzlich Willkommen beim Euro-Katalog. Auf dieser Seite befindet sich die umfangreichste
				Informationssammlung zu den Ü-Ei Inhalten. Ich bin Daniel und seit dem Jahr 2017 ist das
				Sammeln von Ü-Eiern für mich nicht nur zu einem Hobby geworden, sondern hat sich auch zu
				einer Leidenschaft entwickelt. Da der Euro-Katalog ein sehr wichtiger Bestandteil für
				Sammler/innen ist, ist es mir eine Ehre, den von Helmut erstellten und sorgfältig geführten
				Euro-Katalog zu übernehmen. Ich werde mein Bestes geben und diese Homepage mit der gleichen
				Qualität und Sorgfalt weiterführen. Wie euch wahrscheinlich schon aufgefallen ist, haben
				sich das Design und der Aufbau der Homepage stark verändert. Mich würde es sehr freuen, wenn
				ihr mir Verbesserungsvorschläge und Ideen per <a class="underline underline-offset-2" href="mailto:daniel.hrastnik@gmx.at" target="_blank">E-Mail</a> entgegenbringt.
				Auch Kritik nehme ich gerne entgegen. Ich wünsche euch weiterhin viel Spaß beim Sammeln und
				Stöbern auf der Homepage!
			</p>
		</div>

		<p class="mt-8 text-center">
			Weitere Informationen und die DSGVO konforme Datenschutzerklärung finden Sie unter <a
				class="underline"
				href="/data-protection">Datenschutz.</a
			>
		</p>
	</div>
</div>
