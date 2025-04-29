<script lang="ts">

	import "../app.scss"
	import {onMount} from 'svelte';
	import Action from '$lib/Action.svelte';
	import icons from "$lib/icons";
	import FontSelector from './FontSelector.svelte';
	import { tags } from '$lib/data';

	let { children } = $props();
	let show = $state(false);
	let viewMode = $state('');
	let freezeContent = $state(false);
	let contentWidth = $state('');
	let innerContentDiv: HTMLDivElement;

	onMount(() => {
		const storedMode = localStorage.getItem('viewMode');
		if (storedMode) {
			viewMode = storedMode
		} else {
			viewMode = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light'
		}
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
		localStorage.setItem('viewMode', viewMode);
	}

	function contentAnimateStart() {
		freezeContent = true;
	}

	function contentAnimateEnd() {
		freezeContent = show;
		contentWidth = '';
	}
</script>

<svelte:head>
	<title>Code Butter</title>
</svelte:head>

<div id="page-container" class:show-menu={show} class={`view-${viewMode}`}>
	<header class:show={show}>
		<Action icon={icons.menuOpen} onclick={hideMenu} className="close-menu" label="Close"/>
		<div>
			<p class="title">
				<img src="/butter.webp" alt=""/>
				Code Butter
			</p>
			<p>
				Making programming a buttery smooth experience. Musings on code, infrastructure, and process.
			</p>

			<div class="subsection">
				<p class="subheader">Topics:</p>
				{#each Object.values(tags) as tag (tag.id)}
					<a href={`/tags/${tag.id}`} class="topic" onclick={hideMenu}>{tag.displayName}</a>
				{/each}
			</div>
		</div>
	</header>
	<div id="page" class:freeze={freezeContent} ontransitionend={contentAnimateEnd} ontransitionstart={contentAnimateStart}>
		<div style={contentWidth} bind:this={innerContentDiv}>
			<nav>
				<div class="controls">
					<Action icon={icons.menu} onclick={showMenu} className="expand-menu" label="Nav" />
					<Action icon={icons.lightMode} onclick={toggleViewMode} label={ viewMode === 'dark' ? 'Light' : 'Dark' } />
					<FontSelector />
				</div>
				<a class="title" href="/">
					<img src="/butter.webp" alt="" />
					Code Butter
				</a>
			</nav>
			<div class="page-content">
				{@render children?.()}
			</div>
		</div>
	</div>
	<div id="page-filler">
	</div>
</div>


<style lang="scss">
	$content-transition-time: .3s;

	.subsection {
		margin-top: 1em;
	}
	.subheader {
		font-weight: bold;
		border-bottom: 1px solid var(--fg-color);
		padding-bottom: 5px;
	}
	a.topic {
		text-decoration: none;
		display: inline-block;
		text-wrap: nowrap;
		border: 1px solid var(--fg-color);
		border-radius: 5px;
		padding: 2px 5px;
		margin: 10px;
    color: var(--fg-color) !important;
		background-color: var(--accent-color);
	}
  header {
    background-color: #c8dbf0;
    background-image: url("/background.webp");
    background-size: cover;
    background-position: center;
    width: calc((100vw - 1200px) / 2);
		min-width: 400px;
		transition: width $content-transition-time ease-in-out;
		position: relative;
		color: inherit;
		display: flex;
		align-items: center;
		justify-content: center;

		> div {
			text-align: center;
			border-radius: 0.5em;
			background-color: hsl(from var(--bg-color) h s l / 0.6);
      backdrop-filter: blur(5px);
			width: 80%;
			padding: 10px;
			p {
				margin: 0.25em 0;
			}
			.title {
        font-size: 32px;
			}
			img {
				height: 48px;
				vertical-align: middle;
			}
		}
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
      #page {
        width: 0;
				opacity: 0;
				flex: 0 0 0;
				padding: 0;
      }
		}
    background-color: var(--bg-color);
    color: var(--fg-color);
  }
  #page {
    padding: 1em 2em;
		width: 100%;
		max-width: 1200px;
    transition: width $content-transition-time ease-in-out, opacity $content-transition-time;
		&.freeze {
			overflow: hidden;
		}

    > div {
      display: flex;
      flex-direction: column;
    }

		nav {
			display: flex;
			align-items: center;
      border-bottom: 1px solid var(--fg-color);
			padding-bottom: 12px;
			:global(.expand-menu) {
        display: none;
      }
			.controls {
				flex: 1 1;
			}
			.title {
				color: inherit;
				text-decoration: none;
				img {
					height: 32px;
					vertical-align: middle;
				}
			}
		}
  }

	#page-filler {
		background-image: url("/background.webp");
		background-size: cover;
		flex: 1 1;
		opacity: 0.8;
	}

	@media screen and (max-width: 1200px) {
    header {
      width: 0;
			min-width: 0;
      overflow: hidden;
    }

		#page-filler {
			display: none;
		}

    #page-container nav {
			.title {
				display: inline-block;
			}
      :global(.expand-menu) {
        display: inline;
      }
		}
  }

	@media screen and (max-height: 600px) {
		header {
      background-image: url("/background-sm.webp");
		}
	}

</style>

