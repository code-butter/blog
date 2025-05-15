import type { Author, Tag } from './types';
import { makeIdMap } from './utils.ts';

/****
 Edit the data here when modifying authors and tags
 ****/
const authorsList: Author[] = [
	{
		id: 'jeremy-nicoll',
		displayName: 'Jeremy Nicoll',
		description: ''
	},
	{
		id: 'parag-ekbote',
		displayName: 'Parag Ekbote',
		description: 'AI & Data Science undergrad. Currently passionate about open-source, machine learning and sharing practical insights through clean, reproducible code.'
	}
];

const tagsList: Tag[] = [
	{
		id: 'python',
		displayName: 'Python'
	},
	{
		id: 'virtualenv',
		displayName: 'virtualenv'
	}
];

/****
 This munges the above data for easier access. Do not modify unless fixing issues with the code.
 ****/
export const authors = makeIdMap(authorsList);
export const tags = makeIdMap(tagsList);
