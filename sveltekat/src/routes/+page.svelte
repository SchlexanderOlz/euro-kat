<script lang="ts">
	import type { PageData } from './$types';
	import { history, subscription } from '$lib/Stores';
	import FigureListItem from '$lib/components/FigureListItem.svelte';
	import { Sparkles } from 'lucide-svelte';
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
			zu den Ü-Ei-Inhalten der vergangenen Jahre
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
				ihr mir Verbesserungsvorschläge und Ideen per <a
					class="underline underline-offset-2"
					href="mailto:daniel.hrastnik@gmx.at"
					target="_blank">E-Mail</a
				> entgegenbringt. Auch Kritik nehme ich gerne entgegen. Ich wünsche euch weiterhin viel Spaß
				beim Sammeln und Stöbern auf der Homepage!
			</p>
		</div>

		<p class=" text-center h2 mt-5 mb-3">Weiterstöbern...</p>
    {#if $subscription === 'premium'}
       {#each $history?.figures || [] as figure}
         <FigureListItem {figure} />
       {:else}
         <p>Du hast keine Figuren in letzter Zeit angesehen.</p>
       {/each}
       {#if $history?.figures.length > 3}
       <a href="/history" class="w-full md:max-w-[40.5rem] max-w-[19.5rem]">
         <button class="btn w-full md:max-w-[40.5rem] max-w-[19.5rem] variant-ghost-surface mt-1 h-8">Mehr laden</button>
       </a>
       {/if}
    {:else}
    <a href="/premium">
      <button class="btn variant-ghost-primary  w-full h-10 mt-2 max-w-[90%] mx-2 px-6 break-all">
        Premium-Feature <Sparkles class="ml-2 shrink-0"/>
      </button>
    </a>
    {/if}

		<p class="text-5xl text-center h1 mt-8">News</p>
		<div class="card p-2 pt-1 mx-4 mt-8 max-w-[1166px] w-full">
			{#if data.article?.created}
				<p class="mt-1 left opacity-60">
					{new Intl.DateTimeFormat('de-DE', {
						year: 'numeric',
						month: 'long',
						day: '2-digit'
					}).format(new Date(data.article?.created))}
				</p>
			{/if}

			{#if data.article?.content}
				<div class="latest-article">
					{@html data.article?.content}
				</div>
			{:else}
				<p class="mt-1 text-center opacity-60 text-xl">
					Dieser Artikel ist Momentan nicht verfügbar
				</p>
			{/if}
		</div>

		<p class="mt-8 text-center">
			Weitere Informationen und die DSGVO konforme Datenschutzerklärung finden Sie unter <a
				class="underline"
				href="/data-protection">Datenschutz.</a
			>
		</p>
	</div>
</div>

<style>
	:global(.latest-article > p) {
		display: flex;
	}
	:global(.latest-article > h1) {
		@apply h1 mb-2;
	}

	:global(.latest-article > h2) {
		@apply h2 mb-2;
	}

	:global(.latest-article > h3) {
		@apply h3 mb-2;
	}

	:global(.latest-article > h4) {
		@apply h4 mb-2;
	}
</style>
