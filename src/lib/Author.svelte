<script lang="ts">

	import authors from './authors';
	let { id } = $props();
	const author = authors[id];
</script>

<a href={`/authors/${id}`}>{author.displayName}</a>