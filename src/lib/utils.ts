import type { IdMap, IdObject, Rss } from '$lib/types';
import Handlebars from 'handlebars';
import fs from 'node:fs';

export function makeIdMap<T extends IdObject>(array: T[]): IdMap<T> {
	const map: IdMap<T> = {};
	array.forEach((a) => {
		if (a.id.match(/[\s._]/)) {
			throw `Invalid ID. Cannot contain spaces, periods, or underscores. Use dashes instead. ID: ${a.id}`;
		}
		map[a.id] = a;
	});
	return map;
}

export function rss(data: Rss, filename: string) {
	const templateText = fs.readFileSync('./src/lib/rss.xml.hbs', 'utf8');
	const template = Handlebars.compile(templateText);
	return new Response(template(data), {
		headers: {
			'Content-Type': 'application/rss+xml',
			'Content-Disposition': `attachment; filename=${filename}.rss`
		}
	});
}

export function fixUrl(url: URL) {
	url = new URL(url);
	if (!url.pathname.endsWith('/') && !url.pathname.includes(".")) {
		url.pathname += '/';
		return url;
	}
	return null;
}