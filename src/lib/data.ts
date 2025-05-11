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

const authorsMap: IdMap<Author> = {};
authorsList.forEach(a => authorsMap[a.id] = a);
export const authors = authorsMap;

const tagsMap: IdMap<Tag> = {};
tagsList.forEach(t => tagsMap[t.id] = t);
export const tags = tagsMap;
