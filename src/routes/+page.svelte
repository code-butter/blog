<script lang="ts">
	import type { PageProps } from './+page';
	import Articles from '$lib/Articles.svelte';
	const { data }: PageProps = $props();
</script>

<svelte:head>
	<link rel="alternate" type="application/res+xml" href="/site.rss" />
</svelte:head>

<Articles articles={data.articles} />
