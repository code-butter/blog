import { getAllArticles } from '$lib/articles';
import { tags } from '$lib/data';
import { error } from '@sveltejs/kit';

export async function load({params}) {
	const { id } = params;
	const tag = tags[id];
	if (!tag) {
		throw error(404, 'Tag not found');
	}
	let articles = await getAllArticles();
	articles = articles.filter(a => a.tags?.includes(id));
	return {
		tag,
		articles
	};
}