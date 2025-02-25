<script lang="ts">
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';

  let {
    active = false,
    href,
    class: className = '',
    onclick,
    children
  }: {
    active?: boolean;
    href?: string;
    class?: string;
    onclick?: () => void;
    children?: Snippet;
  } = $props();

  const Tag = href ? 'a' : 'div';
</script>

<svelte:element
  this={Tag}
  {href}
  onclick={onclick}
  class={cn(
    'clay flex items-center gap-2 p-2 transition-all w-fit',
    'hover:clay-inset active:clay-inset',
    active && 'clay-inset',
    className
  )}
  role="menuitem"
  tabindex="0"
>
  {@render children?.()}
</svelte:element>
