import { mdsvex } from 'mdsvex';
import staticAdapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: staticAdapter() },
	extensions: ['.svelte', '.svx'],
	prerender: { default: true }
};

export default config;
