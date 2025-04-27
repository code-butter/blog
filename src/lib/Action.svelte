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
		<Icon icon={icon} width="32" height="32" class="action-icon" />
	{/if}
	<span>{ label }</span>
</button>

<style lang="scss">
	:global(.action-icon) {
		display: block;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
		color: inherit;
	}
	span {
		font-size: 80%;
	}
</style>