import { articlesToFeedItems, getAllArticles } from '$lib/articles';
import { rss } from '$lib/utils';
import host from 'virtual:server-host';

export const prerender = true;
export async function  GET() {
	const articles = await getAllArticles();
	const items = articlesToFeedItems(articles);
	return rss({
		items,
		title: 'Code Butter Articles',
		link: host,
		description: 'All articles on Code Butter'
	}, 'code-butter');
}