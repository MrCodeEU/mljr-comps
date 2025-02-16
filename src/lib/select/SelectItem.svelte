<script lang="ts">
  import { Select } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import Icon from '@iconify/svelte';
  import type { Snippet } from 'svelte';

  let {
    value,
    label,
    icon = '',
    disabled = false,
    class: className = '',
    children
  }: {
    value: string;
    label: string;
    icon?: string;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  } = $props();
</script>

<Select.Item
  {value}
  {label}
  {disabled}
  class={cn(
    'flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2',
    'transition-colors outline-none',
    'data-[highlighted]:clay-inset data-[highlighted]:bg-black/5',
    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    className
  )}
>
  {#snippet children({ selected })}
    {#if icon}
      <Icon {icon} class="size-5" />
    {/if}
    <span class="flex-1">{label}</span>
    {#if selected}
      <Icon icon="mdi:check" class="size-5" />
    {/if}
  {/snippet}
</Select.Item>
