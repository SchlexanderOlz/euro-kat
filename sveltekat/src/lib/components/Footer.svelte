<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';

	const options = [
		{
			title: 'Quellen',
			link: '/sources'
		},
		{
			title: 'Links',
			link: '/links'
		},
		{
			title: 'Das Team',
			link: '/team'
		},
		{
			title: 'Email',
			link: 'mailto:test@gmail.com'
		},
		{
			title: 'Impressum',
			link: '/imprint'
		},
		{
			title: 'Datenschutzerklärung',
			link: '/data-protection'
		}
	];
</script>

<AppBar>
  <div class="flex flex-row flex-wrap w-screen justify-evenly pr-8">
		{#each options as option}
			<a href={option.link} class="mx-2 underline">{option.title}</a>
		{/each}
	</div>
</AppBar>
