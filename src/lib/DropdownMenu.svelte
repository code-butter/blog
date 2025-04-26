<script lang="ts">
	let { menu, contents, open = $bindable() } = $props();
	let menuElement: HTMLSpanElement;
	let contentsElement: HTMLDivElement;
	let timeoutListener: number;

	function toggleMenu() {
		open = !open;
		if (open) {
			reposition();
			window.addEventListener('resize', repositionTimeout);
			window.addEventListener('scroll', repositionTimeout);
		} else {
			window.removeEventListener('resize', repositionTimeout);
			window.removeEventListener('scroll', repositionTimeout);
		}
	}

	function reposition() {
		const top = menuElement.offsetTop + menuElement.offsetHeight;
		const left = menuElement.offsetLeft;
		contentsElement.style.top = `${top}px`;
		contentsElement.style.left = `${left}px`;
	}

	function repositionTimeout() {
		window.clearTimeout(timeoutListener);
		timeoutListener = window.setTimeout(reposition, 20);
	}
</script>

<span class="menu" bind:this={menuElement}>
	{@render menu(toggleMenu)}
</span>

<div class="menu-contents" bind:this={contentsElement} class:open={open}>
	{@render contents()}
</div>

<style lang="scss">
	.menu-contents {
		display: none;
		position: absolute;
		border: 1px solid var(--fg-color);
		border-radius: 1em;
		padding: 1em;
		background-color: var(--menu-bg-color);
		&.open {
			display: block;
		}
	}
</style>
