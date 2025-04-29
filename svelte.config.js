import { mdsvex } from 'mdsvex';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: staticAdapter({ strict: false}) }, // TODO: make strict again after adding articles
	extensions: ['.svelte', '.svx'],
	prerender: { default: true }
};

export default config;
