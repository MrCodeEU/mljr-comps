<script lang="ts">
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';

  let {
    href = '/',
    class: className = '',
    children
  }: {
    href?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<a {href} class={cn('flex items-center gap-2 text-xl font-bold', className)}>
  {@render children?.()}
</a>
