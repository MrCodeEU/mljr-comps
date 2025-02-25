<script lang="ts">
  import { cn } from '$lib/utility.js';
  import Icon from '@iconify/svelte';

  let {
    total = 0,
    perPage = $bindable(10),
    currentPage = $bindable(1),
    variant = 'primary',
    siblingCount = 1,
    showPerPage = false,
    boundaryCount = 1,
    showEllipsis = true,
    class: className = ''
  }: {
    total: number;
    perPage?: number;
    currentPage?: number;
    variant?: Variant;
    siblingCount?: number;
    boundaryCount?: number;
    showEllipsis?: boolean;
    showPerPage?: boolean;
    class?: string;
  } = $props();

  const pageOptions = [5, 10, 25, 50, 100];
  let totalPages = $derived(Math.ceil(total / perPage));

  // Generate page numbers array with dots for pagination
  let pages = $derived.by(() => {
    if (totalPages <= 7 || !showEllipsis) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const startPages = Array.from({ length: boundaryCount }, (_, i) => i + 1);
    const endPages = Array.from({ length: boundaryCount }, (_, i) => totalPages - i).reverse();

    const siblingStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        totalPages - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );

    const siblingEnd = Math.min(
      Math.max(currentPage + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
    );

    const itemList = [
      ...startPages,
      ...(siblingStart > boundaryCount + 2 ? ['...'] : []),
      ...Array.from(
        { length: siblingEnd - siblingStart + 1 },
        (_, i) => siblingStart + i
      ),
      ...(siblingEnd < totalPages - boundaryCount - 1 ? ['...'] : []),
      ...endPages
    ];

    return itemList;
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
</script>

<div class="flex flex-wrap items-center gap-4">
  {#if showPerPage}
    <select
      bind:value={perPage}
      class={cn(
        'clay select h-10 px-3',
        'hover:clay-inset focus:clay-inset',
        `bg-${variant} text-black`
      )}
    >
      {#each pageOptions as option}
        <option value={option}>{option} per page</option>
      {/each}
    </select>
  {/if}

  <div class="flex items-center gap-2">
    <button
      class={cn(
        'clay flex h-10 w-10 items-center justify-center',
        'hover:clay-inset active:clay-inset disabled:opacity-50',
        `bg-${variant} text-black`
      )}
      disabled={currentPage === 1}
      onclick={() => goToPage(currentPage - 1)}
      aria-label="Previous page"
    >
      <Icon icon="mdi:chevron-left" class="size-5" />
    </button>

    {#each pages as page}
      {#if page === '...'}
        <span class="px-2">...</span>
      {:else}
        <button
          class={cn(
            'clay flex h-10 w-10 items-center justify-center',
            'hover:clay-inset active:clay-inset',
            currentPage === page && 'clay-inset',
            `bg-${variant} text-black`
          )}
          onclick={() => goToPage(page as number)}
        >
          {page}
        </button>
      {/if}
    {/each}

    <button
      class={cn(
        'clay flex h-10 w-10 items-center justify-center',
        'hover:clay-inset active:clay-inset disabled:opacity-50',
        `bg-${variant} text-black`
      )}
      disabled={currentPage === totalPages}
      onclick={() => goToPage(currentPage + 1)}
      aria-label="Next page"
    >
      <Icon icon="mdi:chevron-right" class="size-5" />
    </button>
  </div>
</div>
