<script lang="ts">
  import { onMount } from 'svelte';
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';
  import { slide } from 'svelte/transition';
  import { setContext } from 'svelte';

  let {
    variant = 'primary',
    breakpoint = 768,
    class: className = '',
    brand,
    content,
    drawer
  }: {
    variant?: Variant;
    breakpoint?: number;
    class?: string;
    brand?: Snippet;
    content?: Snippet<[isMobile?: boolean]>;
    drawer?: Snippet;
  } = $props();

  let containerRef: HTMLElement;
  let isMobile = $state(false);
  let isOpen = $state(false);

  const variantClasses = {
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
    tertiary: 'bg-tertiary text-black',
    accent: 'bg-accent text-black',
    muted: 'bg-neutral text-black dark:text-white',
    error: 'bg-error text-black',
    success: 'bg-success text-black',
    warning: 'bg-warning text-black',
    info: 'bg-info text-black'
  };

  // ResizeObserver to check container width
  onMount(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        isMobile = entry.contentRect.width < breakpoint;
      }
    });

    if (containerRef) {
      observer.observe(containerRef);
    }

    return () => observer.disconnect();
  });

  // Add context for mobile state
  setContext('navbar', {
    isMobile: () => isMobile
  });

  // Close drawer when switching to desktop
  $effect(() => {
    if (!isMobile) isOpen = false;
  });
</script>

<!-- Navbar Container -->
<nav
  bind:this={containerRef}
  class={cn(
    'clay relative flex items-center justify-between p-4',
    variantClasses[variant as keyof typeof variantClasses],
    className
  )}
>
  <!-- Brand Section -->
  {#if brand}
    <div class="flex-none">
      {@render brand()}
    </div>
  {/if}

  <!-- Mobile Menu Button -->
  {#if isMobile}
    <button
      class={cn(
        'clay ml-auto flex items-center p-2 transition-all',
        'hover:clay-inset active:clay-inset',
        isOpen && 'clay-inset'
      )}
      onclick={() => (isOpen = !isOpen)}
      aria-label="Toggle menu"
    >
      <Icon
        icon={isOpen ? 'mdi:close' : 'mdi:menu'}
        class="size-6 transition-transform duration-200"
      />
    </button>
  {/if}

  <!-- Desktop Content -->
  {#if !isMobile && content}
    <div class="flex flex-1 items-center justify-end gap-4">
      {@render content(isMobile)}
    </div>
  {/if}
</nav>

<!-- Mobile Drawer -->
{#if isMobile && isOpen}
  <div
    transition:slide={{ duration: 200 }}
    class={cn(
      'clay-inset border-t-2 p-4',
      variantClasses[variant as keyof typeof variantClasses]
    )}
  >
    {#if drawer}
      {@render drawer()}
    {:else if content}
      <div class="flex flex-col gap-2 items-end">
        {@render content(isMobile)}
      </div>
    {/if}
  </div>
{/if}
