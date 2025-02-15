<script lang="ts">
	import { Checkbox } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';
	import Icon from '@iconify/svelte';

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		required = false,
		name,
		value,
		variant = 'primary',
		checkedIcon = 'material-symbols:check',
		uncheckedIcon = '',
		indeterminateIcon = 'ic:baseline-minus',
		iconClass = 'h-5 w-5',
		class: className = '',
		children
	}: {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		value?: string;
		variant?: Variant;
		checkedIcon?: string;
		uncheckedIcon?: string;
		indeterminateIcon?: string;
		iconClass?: string;
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

<Checkbox.Root
	{checked}
	{indeterminate}
	{disabled}
	{required}
	{name}
	{value}
	class={cn(
		'clay inline-flex h-8 w-8 items-center justify-center rounded-xl',
		'data-[state=checked]:clay-inset transition-all duration-200 data-[state=checked]:translate-y-0.5 data-[state=checked]:rounded-xl',
		'hover:translate-y-0.5',
		disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
		!disabled && 'active:clay-inset hover:shadow-none',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{#snippet children({ checked, indeterminate })}
		<div class="text-current">
			{#if indeterminate && indeterminateIcon}
				<Icon icon={indeterminateIcon} class={iconClass} />
			{:else if checked && checkedIcon}
				<Icon icon={checkedIcon} class={iconClass} />
			{:else if uncheckedIcon}
				<Icon icon={uncheckedIcon} class={iconClass} />
			{/if}
		</div>
	{/snippet}
</Checkbox.Root>
