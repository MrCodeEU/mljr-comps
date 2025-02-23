<script lang="ts">
	import { Button } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		variant = 'primary',
		active = true,
		size = 'md',
		class: className = '',
		onclick,
		children
	}: {
		variant?: Variant;
		active?: boolean;
		size?: 'sm' | 'md' | 'lg';
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children?: Snippet;
	} = $props();

	// Map variants to Tailwind classes
	const variantClasses = {
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		text: 'bg-transparent text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black dark:text-white',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};

	// Add size classes mapping
	const sizeClasses = {
		sm: 'p-1 text-xs',
		md: 'p-2 text-sm',
		lg: 'p-3 text-base'
	};
</script>

<Button.Root
	class={cn(
		'clay flex transition-all hover:translate-y-0.5 active:translate-y-0.5',
		'flex flex-row items-center justify-center',
		active ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
		active ? 'active:clay-inset hover:shadow-none' : 'active:clay bg-opacity-75',
		variantClasses[variant as keyof typeof variantClasses],
		sizeClasses[size as keyof typeof sizeClasses],
		className
	)}
	{onclick}
	disabled={!active}
>
	{@render children?.()}
</Button.Root>
