import host from 'virtual:server-host';
import type { ArticleData, ExportedMarkdown, FullArticle } from '$lib/types';

const posts = Object.entries(import.meta.glob<ExportedMarkdown>('../articles/**/*.svx', { eager: true}));
const postsMap: {[key: string]: ExportedMarkdown} = {};
posts.forEach(p => postsMap[p[0]] = p[1]);
const fileMatcher = /([^/]+)\.svx$/;


export async function getAllArticles() {
	const articles = posts
		.map(([path, article]): ArticleData => {
			const matches = fileMatcher.exec(path);
			return processArticle(article, matches![1]);
	});
	articles.sort((a,b) => {
		if (a.published === b.published) {
			return a.slug > b.slug ? -1 : 1;
		}
		return a.published > b.published ? -1 : 1;
	});
	return articles;
}

export async function getArticle(slug: string) {
	slug = slug.replace(/\/$/, '');
	const key = `../articles/${slug}.svx`;
	const article = postsMap[key];
	if (!article) {
		console.error(`Key not found: ${key}`);
		return null;
	}
	return processArticle(article, slug, true);
}

function processArticle(article: ExportedMarkdown, slug: string, includeComponent = false) {
	const fullArticle: FullArticle = {
		...article.metadata,
		slug,
		published: new Date(article.metadata.published),
		updated: article.metadata.updated ? new Date(article.metadata.updated) : undefined
	} as FullArticle;
	if (includeComponent) {
		fullArticle.component = article.default;
	}
	return fullArticle;
}

export async function getArticlesByTag(id: string) {
	const articles = await getAllArticles();
	return articles.filter(a => a.tags?.includes(id));
}

export async function getArticlesByAuthor(id: string) {
	const articles = await getAllArticles();
	return articles.filter(a => a.author === id);
}

export function articlesToFeedItems(articles: ArticleData[]) {
	return articles.map((article) => ({
		title: article.title,
		description: article.description,
		link: `${host}/articles/${article.slug}`,
		pubDate: article.published.toUTCString()
	}))
}


