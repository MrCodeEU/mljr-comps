<script lang="ts">
  import { Label } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';

  let {
    htmlFor,
    class: className = '',
    children
  }: {
    htmlFor?: string;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<Label.Root
  for={htmlFor}
  class={cn(
    'text-sm leading-none font-medium',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className
  )}
>
  {@render children?.()}
</Label.Root>
