<script lang="ts">
  import { Select } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';
  import { slide } from 'svelte/transition';

  let {
    variant = 'primary',
    sideOffset = 8,
    class: className = '',
    children
  }: {
    variant?: Variant;
    sideOffset?: number;
    class?: string;
    children?: Snippet;
  } = $props();

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
</script>

<Select.Content
  {sideOffset}
  class={cn(
    'clay z-50 min-w-[8rem] p-2',
    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1',
    'data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
    variantClasses[variant as keyof typeof variantClasses],
    className
  )}
  forceMount
>
  {#snippet child({ wrapperProps, props, open })}
    {#if open}
      <div {...wrapperProps}>
        <div {...props} transition:slide={{ duration: 150 }}>
          <Select.ScrollUpButton class="flex w-full justify-center p-2">
            <Icon icon="mdi:chevron-up" class="size-5" />
          </Select.ScrollUpButton>

          <Select.Viewport class="p-2">
            {@render children?.()}
          </Select.Viewport>

          <Select.ScrollDownButton class="flex w-full justify-center p-2">
            <Icon icon="mdi:chevron-down" class="size-5" />
          </Select.ScrollDownButton>
        </div>
      </div>
    {/if}
  {/snippet}
</Select.Content>
