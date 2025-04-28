<script lang="ts">
	import type { PageProps } from './+page.server';
	import Articles from '$lib/Articles.svelte';
	const { data }: PageProps = $props();
</script>

<Articles articles={data.articles} />
