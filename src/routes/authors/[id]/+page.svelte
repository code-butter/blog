<script lang="ts">
	import ArticleDate from '$lib/ArticleDate.svelte';

	let { data } = $props();
	const author = data.author;
	const articles = data.articles;
</script>

<div id="author">
	<div id="author-image">
		<img src={`/authors/${author.id}.webp`} alt={`Profile image of ${author.displayName}`} />
	</div>
	<div id="author-info">
		<h1>Author: {author.displayName}</h1>
		<p>{ author.description }</p>
	</div>
</div>

<h2>Articles</h2>

{#each articles as article (article.slug)}
	<div class="article">
		<div class="article-date-container">
			<ArticleDate date={article.date} />
		</div>
		<div class="article-content">
			<h2>
				<a href="/articles/{article.slug}">
					{ article.title }
				</a>
			</h2>
			<p>{ article.description }</p>
		</div>
	</div>
{/each}

<style lang="scss">
	#author {
		display: flex;
	}
	#author-image {
		width: 28%;
		padding: 1em;
		img {
			width: 100%;
			border-radius: 1em;
		}
	}

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

