import type { Handle } from '@sveltejs/kit';
import { fixUrl } from '$lib/utils';

// There's a companion function in `./src/routes/layout.svelte` that does the same thing client-side
export const handle: Handle = ({event, resolve}) => {
	const url = new URL(event.request.url);
	const newUrl = fixUrl(url);
	if (newUrl) {
		return Response.redirect(newUrl.toString(), 301);
	}
	return resolve(event);
}