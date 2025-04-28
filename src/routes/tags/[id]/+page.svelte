<script lang="ts">
	import Articles from '$lib/Articles.svelte';
	let { data } = $props();
</script>

<h1>Tag: {data.tag.displayName}</h1>

<Articles articles={data.articles} />