export interface IdMap<T> {
	[key: string]: T
}

export interface IdObject {
	id: string;
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
