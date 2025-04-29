import { getAllArticles, type ArticleData } from '$lib/articles';

export interface PageData {
	articles: ArticleData[];
}

export interface PageProps {
	data: PageData;
}

export async function load() {
	const articles = await getAllArticles();
	return {
		articles
	};
}