<script lang="ts">
	import { Menubar } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		variant = 'default',
		class: className = '',
		children
	}: {
		variant?: Variant;
		class?: string;
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

<Menubar.Root 
	class={cn('clay flex gap-1 p-2 items-center', variantClasses[variant as keyof typeof variantClasses], className)}
>
	{@render children?.()}
</Menubar.Root>
