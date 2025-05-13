import { articlesToFeedItems, getArticlesByAuthor } from '$lib/articles';
import { rss } from '$lib/utils';
import { authors } from '$lib/data';
import host from 'virtual:server-host';

export async function GET({params}) {
	const articles = await getArticlesByAuthor(params.id);
	const author = authors[params.id];
	const items = articlesToFeedItems(articles);
	return rss({
		items,
		title: `Code Butter articles by ${author.displayName}`,
		link: `${host}/authors/${params.id}`,
		description: 'All articles on Code Butter'
	}, `code-butter-${params.id}`);
}