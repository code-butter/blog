import { getArticle } from '$lib/articles';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;
	const article = await getArticle(slug);
	if (!article) {
		throw error(404, 'Article not found');
	}
	return {
		article
	}
}