export interface Author {
	id?: string;
	displayName: string;
	description: string;
}

const authors: { [key: string]: Author } = {
	'jeremy.nicoll': {
		displayName: 'Jeremy Nicoll',
		description: 'This is my description! Yay!'
	}
}

export default authors;