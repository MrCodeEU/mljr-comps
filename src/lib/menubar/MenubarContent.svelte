<script lang="ts">
	import { Menubar } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		variant = 'default',
		class: className = '',
		sideOffset = 8,
		children
	}: {
		variant?: Variant;
		class?: string;
		sideOffset?: number;
		children?: Snippet;
	} = $props();

	const variantClasses = {
		default: 'bg-background text-black dark:text-white',
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};
</script>

<Menubar.Content
	{sideOffset}
	class={cn(
		'clay z-50 min-w-[12rem] p-2',
		'data-[state=open]:animate-in data-[state=closed]:animate-out',
		'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
		'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{@render children?.()}
</Menubar.Content>
