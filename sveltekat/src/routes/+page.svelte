<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	console.log(data.figureCount);
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
		<p class="text-3xl mt-8">
			Aktuell über <span class="font-bold">{data.figureCount}</span> Figuren auf
			<span class="underline decoration-[0.5px] underline-offset-4">euro-kat.de</span>!
		</p>
		<p class="mt-4 text-2xl text-center">
			Der <span class="font-bold">Euro-Katalog</span> dient als die umfangreichste Informationssammlung
			zu den Ü-Ei-Inhalten der vergangenen Jahre,
		</p>

		<div class="card p-2 mx-4 mt-8 max-w-[1166px]">
			<img
				height="116px"
				width="101px"
				class="sm:h-36 sm:w-auto w-40 float-left mr-4"
				alt="helmut"
				src="images/helmut.jpg"
			/>

			<p class="sm:ml-4 sm:mt-0 mt-1">
				Die Sammlerseiten leben von der Unterstützung durch Sammlerinnen und Sammler aus der ganzen
				Welt. Es ist mir wichtig, mich für jede zugesendete Information, jedes zugesendete Bild zu
				bedanken indem ich Name und Vorname der Zusenderin/des Zusenders auf der jeweiligen Seite
				angebe. Dieses wende ich jetzt über 10 Jahre an und ist für alle Besucherinnen und Besucher
				meiner Seiten sichtbar.
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
