import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// 3. Append the path to the Skeleton package
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		screens: {
			'xxs': '320px',
			'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
		extend: {},
	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		forms,typography,
		skeleton({
			themes: {
				preset: ["vintage"]
			}
		})
	]
} satisfies Config;

export default config;