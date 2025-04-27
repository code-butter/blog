<script lang="ts">
	import type { PageProps } from './+page.server';
	import Author from '$lib/Author.svelte';
	import ArticleDate from '$lib/ArticleDate.svelte';
	const { data }: PageProps = $props();

</script>

{#each data.articles as article (article.slug)}
	<div class="article">
		<div class="article-date-container">
			<ArticleDate date={article.date} />
		</div>
		<div class="article-content">
			<h2>
				<a href="/articles/{article.slug}">
					{ article.title }
				</a>
				<span class="author">
					- <Author id={article.author} />
				</span>
			</h2>
			<p>{ article.description }</p>
		</div>
	</div>
{/each}

<style lang="scss">
	.article {
		display: flex;
		clear: both;
		margin: 1em 0;
	}
	.author {
		font-size: 60%;
	}
	.article-content {
		flex: 1 1;
		h2 { margin: 0 0 0.2em 0; }
		p { margin: 0.2em; }
	}
</style>