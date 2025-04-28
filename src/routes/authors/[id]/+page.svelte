<script lang="ts">
	import Articles from '$lib/Articles.svelte';

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

<Articles articles={articles} hideAuthor={true} />

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
</style>

