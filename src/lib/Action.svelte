<script lang="ts">

	import Icon from '@iconify/svelte';
	interface Props {
		icon?: string;
		label?: string;
		onclick: () => void;
		className?: string;
	}

	let { icon, label, onclick, className }: Props = $props();
</script>


<button onclick={onclick} type="button" class={className}>
	{#if icon}
		<Icon icon={icon} width="32" height="32" />
	{/if}
	{ label }
</button>

<style lang="scss">
	button {
		border: none;
		background: none;
		cursor: pointer;
		color: inherit;
	}
</style>