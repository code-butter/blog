<script lang="ts">
	let { menu, contents, open = $bindable() } = $props();
	let menuElement: HTMLSpanElement;
	let contentsElement: HTMLDivElement;
	let timeoutListener: number;

	$effect(() => {
		if (open) {
			reposition();
			window.addEventListener('resize', repositionTimeout);
			window.addEventListener('scroll', repositionTimeout);
			window.addEventListener('click', checkCloseMenu);
		} else {
			window.removeEventListener('resize', repositionTimeout);
			window.removeEventListener('scroll', repositionTimeout);
			window.removeEventListener('click', checkCloseMenu);
		}
	});

	function toggleMenu(e?: MouseEvent) {
		if (e) {
			if (!checkMouseBounds(menuElement, e)) {
				return;
			}
			e.stopPropagation();
		}
		open = !open;
	}

	function checkCloseMenu(e: MouseEvent) {
		if (!checkMouseBounds(contentsElement, e)) {
			toggleMenu();
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

	function checkMouseBounds(ele: HTMLElement, e: MouseEvent) {
		const x = e.pageX;
		const y = e.pageY;
		const r = ele.getBoundingClientRect();
		return x > r.left && x < r.right && y > r.top && y < r.bottom;
	}
</script>

<span class="menu" bind:this={menuElement}>
	{@render menu(toggleMenu)}
</span>

<div class="menu-contents" bind:this={contentsElement} class:open={open}>
	{@render contents()}
</div>

<style lang="scss">
	.menu {
		display: inline-block;
	}
	.menu-contents {
		display: none;
		position: absolute;
		border: 1px solid var(--fg-color);
		border-radius: 1em;
		padding: 1em;
		background-color: var(--accent-color);
		&.open {
			display: block;
		}
	}
</style>
