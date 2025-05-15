<script lang="ts">
	import ArticleDate from '$lib/ArticleDate.svelte';
	import type { ArticleData } from '$lib/articles';
	import Author from '$lib/Author.svelte';
	interface Props {
		articles: ArticleData[];
		hideAuthor?: boolean
	}
	let { articles, hideAuthor }: Props = $props();
</script>

{#each articles as article (article.slug)}
	<div class="article">
		<div class="article-date-container">
			<ArticleDate date={article.published} />
		</div>
		<div class="article-content">
			<h2>
				<a href="/articles/{article.slug}">
					{ article.title }
				</a>
				{#if !hideAuthor}
					<span class="author">
						- <Author id={article.author} />
					</span>
				{/if}
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