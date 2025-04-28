import { getArticle } from '$lib/articles';
import { error } from '@sveltejs/kit';
import type { Tag } from '$lib/data';
import {tags as tagData} from '$lib/data';

export async function load({ params }) {
	const { slug } = params;
	const article = await getArticle(slug);
	if (!article) {
		throw error(404, 'Article not found');
	}
	let tags: Tag[] | undefined;
	if (article.tags) {
		tags = article.tags.split(',').map(t => tagData[t])
	}
	return { article, tags };

}