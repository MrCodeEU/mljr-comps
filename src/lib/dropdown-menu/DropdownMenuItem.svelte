<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let {
		label,
		icon,
		shortcut,
		disabled = false,
		variant = 'primary',
		class: className = '',
		children
	} = $props<{
		label: string;
		icon?: string;
		shortcut?: string;
		disabled?: boolean;
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}>();

	const variantClasses = {
		primary: 'hover:bg-text/20',
		secondary: 'hover:bg-text/20',
		tertiary: 'hover:bg-text/20',
		accent: 'hover:bg-text/20',
		muted: 'hover:bg-text/20',
		error: 'hover:bg-text/20',
		success: 'hover:bg-text/20',
		warning: 'hover:bg-text/20',
		info: 'hover:bg-text/20'
	};
</script>

<DropdownMenu.Item
	{disabled}
	class={cn(
		'flex cursor-pointer items-center rounded-full px-3 py-2 text-sm transition-colors outline-none select-none',
		'hover:clay-inset',
		variantClasses[variant as keyof typeof variantClasses],
		disabled && 'pointer-events-none opacity-50',
		className
	)}
>
	<div class="flex flex-1 items-center gap-2">
		{#if icon}
			<Icon {icon} class="size-5" />
		{/if}
		{label}
	</div>
	{#if shortcut}
		<span class="ml-4 text-xs tracking-widest opacity-60">{shortcut}</span>
	{/if}
	{@render children?.()}
</DropdownMenu.Item>
