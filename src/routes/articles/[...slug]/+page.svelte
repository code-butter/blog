<script lang="ts">
	const { data } = $props();
	const article = data.article;
	const ArticleComponent = article.component;
</script>

<h1>{ article.title }</h1>

<ArticleComponent />


