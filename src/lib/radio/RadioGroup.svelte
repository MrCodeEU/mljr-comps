<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';

  let {
    value = $bindable(''),
    disabled = false,
    required = false,
    name,
    orientation = 'vertical',
    loop = false,
    class: className = '',
    children
  }: {
    value?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'vertical' | 'horizontal';
    loop?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<RadioGroup.Root
  bind:value
  {disabled}
  {required}
  {name}
  {orientation}
  {loop}
  class={cn(
    'flex gap-2',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
    className
  )}
>
  {@render children?.()}
</RadioGroup.Root>
