import type { Component } from 'svelte';

export interface IdMap<T> {
	[key: string]: T
}

export interface IdObject {
	id: string;
}

export interface ArticleData {
	title: string;
	author: string;
	description: string;
	published: Date;
	updated?: Date;
	slug: string;
	tags: string;
}

export interface FullArticle extends ArticleData {
	component?: Component
}

export interface ExportedMarkdown {
	default: Component;
	metadata: { [key: string]: string };
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

export interface Rss {
	title: string;
	link: string;
	description: string;
	items: RssItem[];
}

export interface RssItem {
	title: string;
	link: string;
	pubDate: string;
	description: string;
}
