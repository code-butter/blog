import authors from '$lib/authors';
import { error } from '@sveltejs/kit';
import { getAllArticles } from '$lib/articles';

export async function load({ params }) {
	const id = params.id;
	const author = authors[id];
	if (!author) {
		throw error(404, 'Author not found');
	}
	author.id = id;
	const articles = await getAllArticles();
	return {
		author,
		articles: articles.filter(a => a.author === id)
	}
}