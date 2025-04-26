<script lang="ts">
	import type { PageProps } from './+page.server';
	const { data }: PageProps = $props();
</script>


{#each data.articles as article (article.slug)}
	<p>
		<a href="/articles/{article.slug}">
			{ article.title }
		</a>
	</p>
{/each}