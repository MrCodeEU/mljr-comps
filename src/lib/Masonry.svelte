<script lang="ts">
	import { onMount, tick, type Snippet } from 'svelte';

	let {
		stretchFirst = false,
		gridGap = '0.5em',
		padding = '0px',
		colWidth = 'minmax(Min(20em, 100%), 1fr)',
		items = [],
		reset = false,
		children
	} = $props();

	let masonryElement: HTMLElement;
	let resizeObserver: ResizeObserver;

	const refreshLayout = async () => {
		if (!masonryElement) return;

		const grid = {
			_el: masonryElement,
			gap: parseFloat(getComputedStyle(masonryElement).gridRowGap),
			items: [...masonryElement.childNodes].filter(
				(c) => c.nodeType === 1 && +getComputedStyle(c as HTMLElement).gridColumnEnd !== -1
			) as HTMLElement[],
			ncol: getComputedStyle(masonryElement).gridTemplateColumns.split(' ').length,
			mod: 0
		};

		// Track height changes
		grid.items.forEach((c) => {
			let new_h = c.getBoundingClientRect().height;
			if (new_h !== +c.dataset.h!) {
				c.dataset.h = new_h.toString();
				grid.mod++;
			}
		});

		// Only update if columns changed or heights modified
		if (grid.ncol !== grid.ncol || grid.mod) {
			// Reset all margins
			grid.items.forEach((c) => c.style.removeProperty('margin-top'));

			// Skip if single column
			if (grid.ncol > 1) {
				grid.items.slice(grid.ncol).forEach((c, i) => {
					let prev_fin = grid.items[i].getBoundingClientRect().bottom;
					let curr_ini = c.getBoundingClientRect().top;
					c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
				});
			}

			grid.mod = 0;
		}
	};

	const debouncedRefresh = (() => {
		let frame: number;
		return () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(refreshLayout);
		};
	})();

	onMount(() => {
		if (!masonryElement) return;

		// Only apply JS layout if native masonry not supported
		if (getComputedStyle(masonryElement).gridTemplateRows !== 'masonry') {
			resizeObserver = new ResizeObserver(debouncedRefresh);

			// Observe the container
			resizeObserver.observe(masonryElement);

			// Observe all children
			Array.from(masonryElement.children).forEach((child) => {
				resizeObserver.observe(child);
			});

			// Initial layout
			refreshLayout();
		}

		return () => resizeObserver?.disconnect();
	});

	// Add a function to update observers when children change
	const updateObservers = () => {
		if (resizeObserver && masonryElement) {
			// Disconnect all existing observations
			resizeObserver.disconnect();

			// Reconnect to container and all current children
			resizeObserver.observe(masonryElement);
			Array.from(masonryElement.children).forEach((child) => {
				resizeObserver.observe(child);
			});
		}
	};

	// Watch for DOM changes to add/remove observers as needed
	onMount(() => {
		if (!masonryElement) return;

		const observer = new MutationObserver(updateObservers);
		observer.observe(masonryElement, { childList: true });

		return () => observer.disconnect();
	});

	$effect(() => {
		if (items.length || reset) {
			tick().then(refreshLayout);
		}
	});
</script>

<div
	bind:this={masonryElement}
	class={`grid--masonry ${stretchFirst ? '__stretch-first' : ''}`}
	style={`
    --masonry-grid-gap: ${gridGap}; 
    --masonry-padding: ${padding};
    --masonry-col-width: ${colWidth};
  `}
>
	{@render children?.()}
</div>

<style>
	.grid--masonry {
		display: grid;
		grid-template-columns: repeat(auto-fit, var(--masonry-col-width));
		grid-template-rows: masonry; /* For native support */
		justify-content: center;
		grid-gap: var(--masonry-grid-gap);
		padding: var(--masonry-padding);
	}

	:global(.grid--masonry > *) {
		align-self: start;
	}

	:global(.grid--masonry.__stretch-first > *:first-child) {
		grid-column: 1/ -1;
	}
</style>
