export interface IdMap<T> {
	[key: string]: T
}

export interface Author {
	id: string;
	displayName: string;
	description: string;
}

export interface Tag {
	id: string;
	displayName: string;
}

const authorsList: Author[] = [
	{
		id: 'jeremy.nicoll',
		displayName: 'Jeremy Nicoll',
		description: ''
	},
	{
		id: 'parag.ekbote',
		displayName: 'Parag Ekbote',
		description: ''
	}
];

const tagsList: Tag[] = [
	{
		id: 'test',
		displayName: 'Test'
	}
];

const authorsMap: IdMap<Author> = {};
authorsList.forEach(a => authorsMap[a.id] = a);
export const authors = authorsMap;

const tagsMap: IdMap<Tag> = {};
tagsList.forEach(t => tagsMap[t.id] = t);
export const tags = tagsMap;
