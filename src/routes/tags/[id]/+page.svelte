<script lang="ts">
	import Articles from '$lib/Articles.svelte';
	import icons from '$lib/icons';
	import Icon from '@iconify/svelte';
	let { data } = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/res+xml" href="/tags/{data.tag.id}.rss" />
</svelte:head>


<h1>Tag: {data.tag.displayName}</h1>

<p>
	<a href={`/tags/${data.tag.id}.rss`} class="rss">
		<Icon icon={icons.rss} />
		Subscribe to this tag via RSS
	</a>
</p>

<Articles articles={data.articles} />