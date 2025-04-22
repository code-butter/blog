<script lang="ts">

	import {onMount} from 'svelte';
	import Action from '$lib/Action.svelte';
	import icons from "$lib/icons";

	let { children } = $props();
	let show = $state(false);
	let viewMode = $state('light');
	let freezeContent = $state(false);
	let contentWidth = $state('');
	let innerContentDiv: HTMLDivElement;

	onMount(() => {
		viewMode = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light'
	});
	function showMenu() {
		show = true;
		contentWidth = `width: ${innerContentDiv.offsetWidth}px;`
	}

	function hideMenu() {
		show = false;
	}

	function toggleViewMode() {
		viewMode = viewMode == 'dark' ? 'light' : 'dark';
	}

	function contentAnimateStart() {
		freezeContent = true;
	}

	function contentAnimateEnd() {
		freezeContent = show;
		contentWidth = '';
	}

</script>

<div id="page-container" class:show-menu={show} class={`view-${viewMode}`}>
	<header class:show={show}>
		<Action icon={icons.menuOpen} onclick={hideMenu} className="close-menu"/>
	</header>
	<div id="page-content" class:freeze={freezeContent} on:transitionend={contentAnimateEnd} on:transitionstart={contentAnimateStart}>
		<div style={contentWidth} bind:this={innerContentDiv}>
			<nav>
				<Action icon={icons.menu} onclick={showMenu} />
				<Action icon={icons.lightMode} onclick={toggleViewMode} />
			</nav>
			{@render children?.()}
		</div>
	</div>
</div>


<style lang="scss">
	$content-transition-time: .3s;
  header {
    background-color: #c8dbf0;
    background-image: url("/background.webp");
    background-size: cover;
    background-position: center;
    width: 25%;
		transition: width $content-transition-time ease-in-out;
		position: relative;

		:global(.close-menu) {
			transition: opacity $content-transition-time;
			pointer-events: none;
			opacity: 0;
			position: absolute;
			top: 1em;
			right: 1em;
			color: #111;
		}
  }
  #page-container {
    display: flex;
    height: 100vh;
		transition: background-color 0.25s, color 0.25s;
		&.show-menu {
      header {
        width: 100%;
				:global(.close-menu) {
					opacity: 1;
					pointer-events: auto;
				}
      }
      #page-content {
        width: 1px;
				opacity: 0;
				flex: 0 0 0;
				padding: 0;
      }
		}
		&.view-light {
			background-color: #eee;
			color: #111;
		}
		&.view-dark {
			background-color: #111;
			color: #ddd;
		}
  }
  #page-content {
    flex: 1;
    padding: 1em;
		transition: width $content-transition-time ease-in-out, opacity $content-transition-time;
		&.freeze {
			overflow: hidden;
		}
  }
  @media screen and (max-width: 1000px) {
    header {
      width: 0;
      overflow: hidden;
      background-image: url("/background-sm.webp");
    }
  }
</style>

