import { sveltekit } from '@sveltejs/kit/vite';
import compression from 'compression';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [sveltekit()], // , purgeCss()
});
