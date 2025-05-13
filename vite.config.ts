import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'node:path';
import * as fs from 'node:fs';
import type { AddressInfo } from 'node:net';

const serverHostId = 'virtual:server-host';
let address: string = "";

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
		},
		{
			name: 'server-info',
			enforce: 'pre',
			resolveId(id) {
				if (id === serverHostId) {
					return `${id}`;
				}
			},
			load(id) {
				if (id !== serverHostId)
					return;
				return process.env.SERVER_HOST || address;
			},
			configureServer(server) {
				server.httpServer?.once('listening', () => {
					const addressInfo = server.httpServer?.address() as AddressInfo;
					const host = addressInfo.address === "::1" ? "localhost" : addressInfo.address;
					address = `export default 'http://${host}:${addressInfo.port}';`;
				});
			}
		}
	],
	server: {
		fs: {
			allow: [".."]
		}
	}
});
