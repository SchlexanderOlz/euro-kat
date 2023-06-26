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
			link: '/email'
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
  <div class="flex flex-row w-screen">
		{#each options as option}
			<a href={option.link} class="m-auto underline">{option.title}</a>
		{/each}
	</div>
</AppBar>
