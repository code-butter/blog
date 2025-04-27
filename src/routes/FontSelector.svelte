<script lang="ts">
	import icons from '$lib/icons.js';
	import Action from '$lib/Action.svelte';
	import DropdownMenu from '$lib/DropdownMenu.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import CheckOrNot from '$lib/CheckOrNot.svelte';

	let fontMenuOpen = $state(false);
	let dyslexic = $state(false);

	onMount(() => {
		dyslexic = window.localStorage.getItem('dyslexic') === "yes";
	});

	$effect(() => {
		const classList = document.getElementsByTagName('body')[0].classList;
		if (dyslexic) {
			classList.add('dyslexic');
		} else {
			classList.remove('dyslexic');
		}
	})

	function switchSans() {
		setDyslexic(false);
		fontMenuOpen = false;
	}
	function switchDyslexic() {
		setDyslexic(true);
		fontMenuOpen = false;
	}

	function setDyslexic(value: boolean) {
		localStorage.setItem('dyslexic', value ? "yes" : "no");
		dyslexic = value;
	}
</script>

<DropdownMenu bind:open={fontMenuOpen}>
	{#snippet menu(callback)}
		<Action onclick={callback} icon={icons.font} label="Font" />
	{/snippet}
	{#snippet contents()}
		<div class="menu-contents">
			<button type="button" onclick={switchSans}>
				<CheckOrNot checked={!dyslexic} />
				Sans-Serif
			</button>
			<button type="button" onclick={switchDyslexic}>
				<CheckOrNot checked={dyslexic} />
				Dyslexic
			</button>
		</div>
	{/snippet}
</DropdownMenu>


<style lang="scss">
	.menu-contents {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		width: max-content;
	}
	button {
		border: none;
		padding: 0.75em 0.5em;
		border-radius: 0.5em;
		background: transparent;
		color: inherit;
		cursor: pointer;
		text-align: left;
		&:hover {
			background-color: hsl(from var(--fg-color) h s l / 0.1);
		}
	}
</style>