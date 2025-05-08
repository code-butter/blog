import type { Author, Tag } from './types';
import { makeIdMap } from '$lib/utils';

/****
 Edit the data here when modifying authors and tags
 ****/
const authorsList: Author[] = [
	{
		id: 'jeremy.nicoll',
		displayName: 'Jeremy Nicoll',
		description: ''
	}
];

const tagsList: Tag[] = [
	{
		id: 'test',
		displayName: 'Test'
	}
];

/****
 This munges the above data for easier access. Do not modify unless fixing issues with the code.
 ****/
export const authors = makeIdMap(authorsList);
export const tags = makeIdMap(tagsList);
