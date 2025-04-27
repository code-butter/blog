<script lang="ts">
	import icons from '$lib/icons';
	import Icon from '@iconify/svelte';

	let { checked } = $props();
</script>

{#if checked}
	<Icon icon={icons.check} />
{:else}
	<span>&nbsp</span>
{/if}

<style lang="scss">
	span {
		display: inline-block;
		width: 1em;
	}
</style>