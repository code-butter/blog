<script lang="ts">
	import Articles from '$lib/Articles.svelte';
	import Icon from '@iconify/svelte';
	import icons from '$lib/icons';

	let { data } = $props();
	const author = data.author;
	const articles = data.articles;
</script>

<svelte:head>
	<link rel="alternate" type="application/res+xml" href="/rss/authors/{author.id}/" />
</svelte:head>

<div id="author">
	<div id="author-image">
		<img src={`/authors/${author.id}.webp`} alt={`Profile image of ${author.displayName}`} />
	</div>
	<div id="author-info">
		<a href={`/rss/authors/${author.id}/`} class="rss">
			<Icon icon={icons.rss} />
			Subscribe to this author via RSS
		</a>
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
	.rss {
		float: right;
		margin: 2em 0;
	}
</style>

