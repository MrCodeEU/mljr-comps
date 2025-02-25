<script lang="ts">
  import { RadioGroup } from 'bits-ui';
  import { cn } from '$lib/utility.js';
  import type { Snippet } from 'svelte';
  import Icon from '@iconify/svelte';

  let {
    id,
    value = '',
    disabled = false,
    required = false,
    variant = 'primary',
    checkedIcon = 'material-symbols:radio-button-unchecked',
    uncheckedIcon = '',
    iconClass = 'h-6 w-6',
    class: className = '',
    children
  }: {
    id?: string;
    value: string;
    disabled?: boolean;
    required?: boolean;
    variant?: Variant;
    checkedIcon?: string;
    uncheckedIcon?: string;
    iconClass?: string;
    class?: string;
    children?: Snippet<[checked: boolean]>;
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

<RadioGroup.Item
id={id}
  {value}
  {disabled}
  class={cn(
    'clay inline-flex h-8 w-8 items-center justify-center rounded-full',
    'data-[state=checked]:clay-inset transition-all duration-200',
    disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:translate-y-0.5 active:clay-inset hover:shadow-none',
    variantClasses[variant as keyof typeof variantClasses],
    className
  )}
>
  {#snippet children({ checked })}
    <div class="text-current">
      <Icon 
        icon={checked ? checkedIcon : uncheckedIcon} 
        class={iconClass} 
      />
    </div>
  {/snippet}
</RadioGroup.Item>
