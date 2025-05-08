import type { IdMap, IdObject } from '$lib/types';

export function makeIdMap<T extends IdObject>(array: T[]): IdMap<T> {
	const map: IdMap<T> = {};
	array.forEach(a => map[a.id] = a);
	return map;
}