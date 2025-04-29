<script lang="ts">
	import type { PageProps } from './+page';
	import Articles from '$lib/Articles.svelte';
	const { data }: PageProps = $props();
</script>

<Articles articles={data.articles} />
