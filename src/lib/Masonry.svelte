<script lang="ts">
  import { onMount, onDestroy, tick, type Snippet } from 'svelte';

  type Grid = {
    _el: HTMLElement;
    gap: number;
    items: HTMLElement[];
    ncol: number;
    mod: number;
  }

  let { 
    stretchFirst = false,
    gridGap = '0.5em',
    padding = '0px',
    colWidth = 'minmax(Min(20em, 100%), 1fr)',
    items = [],
    reset = false,
    children
  } : {
    stretchFirst?: boolean;
    gridGap?: string;
    padding?: string;
    colWidth?: string;
    items?: any[];
    reset?: boolean;
    children?: Snippet;
  } = $props();

  let grids = $state<Grid[]>([]);
  let masonryElement: HTMLElement;
  let isBrowser = $state(typeof window !== 'undefined');

  const refreshLayout = async () => {
    if (!isBrowser) return;
    grids.forEach(async grid => {
      let ncol = getComputedStyle(grid._el).gridTemplateColumns.split(' ').length;
      
      grid.items.forEach(c => {
        let new_h = c.getBoundingClientRect().height;
        if(new_h !== +c.dataset.h!) {
          c.dataset.h = new_h.toString();
          grid.mod++;
        }
      });
      
      if(grid.ncol !== ncol || grid.mod) {
        grid.ncol = ncol;
        grid.items.forEach(c => c.style.removeProperty('margin-top'));
        if(grid.ncol > 1) {
          grid.items.slice(ncol).forEach((c, i) => {
            let prev_fin = grid.items[i].getBoundingClientRect().bottom,
                curr_ini = c.getBoundingClientRect().top;
            c.style.marginTop = `${prev_fin + grid.gap - curr_ini}px`;
          });
        }
        grid.mod = 0;
      }
    });
  }

  const calcGrid = async (_masonryArr: HTMLElement[]) => {
    if (!isBrowser) return;
    await tick();
    if(_masonryArr.length && getComputedStyle(_masonryArr[0]).gridTemplateRows !== 'masonry') {
      grids = _masonryArr.map(grid => ({
        _el: grid,
        gap: parseFloat(getComputedStyle(grid).gridRowGap),
        items: [...grid.childNodes].filter(c => 
          c.nodeType === 1 && +getComputedStyle(c as HTMLElement).gridColumnEnd !== -1
        ) as HTMLElement[],
        ncol: 0,
        mod: 0
      }));
      refreshLayout();
    }
  }

  $effect(() => {
    if (masonryElement && isBrowser) {
      calcGrid([masonryElement]);
    }
  });

  $effect(() => {
    if ((items || reset) && isBrowser) {
      masonryElement = masonryElement;
    }
  });

  onMount(() => {
    if (isBrowser) {
      const handleResize = () => refreshLayout();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  });
</script>

<div bind:this={masonryElement} 
     class={`__grid--masonry ${stretchFirst ? '__stretch-first' : ''}`}
     style={`
      --masonry-grid-gap: ${gridGap}; 
      --masonry-padding: ${padding};
      --masonry-col-width: ${colWidth};
     `}
     >
     {@render children?.()}
</div>

<style>
  :global(.__grid--masonry) {
    display: grid;
    grid-template-columns: repeat(auto-fit, var(--masonry-col-width));
    justify-content: center;
    grid-gap: var(--masonry-grid-gap);
    padding: var(--masonry-padding);
  }
  :global(.__grid--masonry > *) {
    align-self: start;
  }
  :global(.__grid--masonry.__stretch-first > *:first-child) {
    grid-column: 1/ -1;
  }
</style>
