<script lang="ts">
	import { categories } from '$lib/Stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Trash2, X } from 'lucide-svelte';

	const modalStore = getModalStore();

	let color = $modalStore[0]?.meta?.category?.color || '#424242';
	let name = $modalStore[0]?.meta?.category?.name || '';

	async function submitForm() {
		const res = await fetch('/my-categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $modalStore[0]?.meta?.category?.id || null, name, color })
		});

		if (res.status === 200) {
			modalStore.close();
			$categories = await (await fetch('/my-categories')).json();

			return;
		} else {
			if ($modalStore[0]?.meta?.category) {
				alert('Fehler beim Bearbeiten der Kategorie');
			} else {
				alert('Fehler beim Erstellen der Kategorie');
			}
		}
	}

	async function deleteCategory() {
		const res = await fetch('/my-categories', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: $modalStore[0]?.meta?.category?.id })
		});

		if (res.status === 200) {
			$categories = await (await fetch('/my-categories')).json();
			modalStore.close();
			return;
		} else {
			alert('Fehler beim Löschen der Kategorie');
		}
	}
</script>

<div class="card w-full max-w-96 p-4">
	<div class="w-full flex justify-between">
		{#if $modalStore[0]?.meta?.category}
			<h2 class="text-2xl font-semibold mb-2">Kategorie bearbeiten</h2>
		{:else}
			<h2 class="text-2xl font-semibold mb-2">Kategorie erstellen</h2>
		{/if}
		<button
			on:click={() => modalStore.close()}
			class="-mt-1 -mr-1 w-10 h-10 flex items-center justify-center"><X /></button
		>
	</div>
	<form on:submit={submitForm}>
		<p class="label mb-1">Name</p>
		<input
			bind:value={name}
			class="input"
			type="text"
			required
			maxlength={24}
			placeholder="Deutschland"
		/>

		<div class="flex xs:flex-row flex-col">
			<div class="w-full">
				<p class="label mb-1 mt-3">Farbe</p>
				<input bind:value={color} class="input" type="color" placeholder="Deutschland" />
			</div>
			<div class="w-full">
				<p class="label mb-1 mt-3">Vorschau</p>
				<div class="w-full h-min card p-1 px-2" style="background-color: {color}45">
					<p>{name}</p>
				</div>
			</div>
		</div>
		<div class="flex">
			{#if $modalStore[0]?.meta?.category}
				<button
					type="button"
					on:click={deleteCategory}
					class="btn variant-ghost-error mt-2 px-3 mr-2"><Trash2 /></button
				>
			{/if}
			<button type="submit" class="btn variant-ghost-primary w-full mt-2">
				{#if $modalStore[0]?.meta?.category}
					Bearbeiten
				{:else}
					Erstellen
				{/if}
			</button>
		</div>
	</form>
</div>
