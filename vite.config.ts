import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import * as fs from 'node:fs';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'watch-markdown',
			configureServer(server) {
				const dir = path.resolve('src/articles');
				fs.watch(dir, {recursive: true}, () => {
					server.moduleGraph.invalidateAll();
					server.ws.send({ type: 'full-reload' });
				})
			}
		}
	],
	server: {
		fs: {
			allow: [".."]
		}
	}
});
