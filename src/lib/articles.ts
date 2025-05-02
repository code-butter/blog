import type { Component } from 'svelte';

export interface ArticleData {
	title: string;
	author: string;
	description: string;
	date: string;
	updated?: string;
	slug: string;
	tags: string;
}

export interface FullArticle extends ArticleData {
	component: Component
}

export interface ExportedMarkdown {
	default: Component;
	metadata: { [key: string]: string };
}

const pathMatcher = /\/(\d{4})-(\d{2})-(\d{2})-(.+)\.svx$/;

const posts = Object.entries(import.meta.glob<ExportedMarkdown>('../articles/**/*.svx', { eager: true}));
const postsMap: {[key: string]: ExportedMarkdown} = {};
posts.forEach(p => postsMap[p[0]] = p[1]);

export async function getAllArticles() {
	const articles = posts
		.filter(([path]) => {
			if (!pathMatcher.test(path)) {
				console.error(`Invalid format for article: ${path}`);
				return false;
			}
			return true;
		})
		.map(([path, article]): ArticleData => {
			const matches = pathMatcher.exec(path);
			if (!matches) {
				console.error('Should not get here. Filter out invalid matches before map');
				return {} as ArticleData;
			}
			return {
				...article.metadata,
				date: `${matches[1]}-${matches[2]}-${matches[3]}`,
				slug: `${matches[1]}/${matches[2]}/${matches[3]}/${matches[4]}`,
			} as ArticleData;
	});
	articles.sort((a,b) => {
		if (a.slug === b.slug) return 0;
		return a.slug > b.slug ? -1 : 1;
	});
	return articles;
}

const slugMatcher = /^(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/;

export async function getArticle(slug: string) {
	slug = slug.replace(/\/$/, '');
	const matches = slugMatcher.exec(slug);
	if (!matches) {
		return null;
	}
	const key = `../articles/${matches[1]}-${matches[2]}-${matches[3]}-${matches[4]}.svx`;
	const article = postsMap[key];
	if (!article) {
		console.error(`Key not found: ${key}`);
		return null;
	}
	return {
		...article.metadata,
		slug,
		date: `${matches[1]}-${matches[2]}-${matches[3]}`,
		component: article.default,
	}	 as FullArticle;
}


