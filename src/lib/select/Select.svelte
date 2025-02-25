<script lang="ts">
  import { Select } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';
  import SelectContent from './SelectContent.svelte';

  type Item = { 
    value: string; 
    label: string; 
    disabled?: boolean;
    icon?: string;
  };

  let {
    value = $bindable(''),
    items,
    variant = 'primary',
    placeholder = 'Select an option...',
    icon = '',
    type = 'single',
    disabled = false,
    required = false,
    class: className = '',
    children,
    trigger,
    triggerClass = ''
  }: {
    value?: string | string[];
    items: Item[];
    variant?: Variant;
    placeholder?: string;
    icon?: string;
    type?: 'single' | 'multiple';
    disabled?: boolean;
    required?: boolean;
    class?: string;
    children?: Snippet;
    trigger?: Snippet;
    triggerClass?: string;
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

  const selectedLabel = $derived(() => {
    if (type === 'multiple' && Array.isArray(value)) {
      return value.length 
        ? items.filter(item => value.includes(item.value))
            .map(item => item.label)
            .join(', ')
        : placeholder;
    }
    return items.find(item => item.value === value)?.label ?? placeholder;
  });

  const displayText = $derived(type === 'multiple' 
    ? (Array.isArray(value) && value.length 
        ? items
            .filter(item => value.includes(item.value))
            .map(item => item.label)
            .join(', ')
        : placeholder)
    : items.find(item => item.value === value)?.label ?? placeholder);
</script>

<Select.Root {type} bind:value {items} {disabled} {required}>
  <Select.Trigger
    class={cn(
      'clay flex w-full items-center gap-2 p-3 transition-all',
      'active:clay-inset hover:translate-y-0.5 hover:shadow-none',
      disabled && 'opacity-50 cursor-not-allowed',
      variantClasses[variant as keyof typeof variantClasses],
      triggerClass
    )}
  >
    {#if icon}
      <Icon {icon} class="size-5" />
    {/if}
    <span class="flex-1 text-start">{displayText}</span>
    <Icon icon="mdi:chevron-down" class="size-5" />
    {@render trigger?.()}
  </Select.Trigger>

  <Select.Portal>
    {@render children?.()}
  </Select.Portal>
</Select.Root>
