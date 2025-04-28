<script lang="ts">
	import Author from '$lib/Author.svelte';
	import ArticleDate from '$lib/ArticleDate.svelte';

	const { data } = $props();
	const article = data.article;
	const tags = data.tags;
	const ArticleComponent = article.component;
</script>


<header>
	<div id="date-container">
		<ArticleDate date={article.date} />
	</div>
	<div id="header-content">
		<h1>
			{ article.title }
		</h1>
		<p>Published: { article.date }</p>
		{#if article.updated }
			<p>Last Updated: { article.updated }</p>
		{/if}
		<p>By <Author id={article.author} /></p>
	</div>
</header>

<ArticleComponent />

{#if tags?.length}
	<p>
		Explore related:
		{#each tags as tag, idx (tag.id)}
			<a href={`/tags/${tag.id}`}>{tag.displayName}</a>{#if idx !== tags.length - 1 },{/if}
		{/each}
	</p>

{/if}

<style lang="scss">
	 header {
		 #date-container {
			 margin-right: 0.5em;
			 padding-top: 0.5em;
		 }
		 display: flex;
		 padding: 1em 0;
		 h1 { margin: 0; }
		 p { margin: 0; }
	 }
</style>


