import { articlesToFeedItems, getArticlesByTag } from '$lib/articles';
import { rss } from '$lib/utils';
import { tags } from '$lib/data';
import host from 'virtual:server-host';

export const prerender = true;
export async function GET({params}) {
	const articles = await getArticlesByTag(params.id);
	const tag = tags[params.id];
	const items = articlesToFeedItems(articles);
	return rss({
		items,
		title: `Code Butter articles tagged ${tag.displayName}`,
		link: `${host}/tags/${params.id}}/`,
		description: ''
	}, `code-butter-${tag.id}`);
}