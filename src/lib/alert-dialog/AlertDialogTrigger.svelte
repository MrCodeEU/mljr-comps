<script lang="ts">
	import { AlertDialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		class: className = '',
		children
	}: {
		variant?: Variant;
		class?: string;
		children?: Snippet;
	} = $props();

	const variantClasses = {
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

<AlertDialog.Trigger
	class={cn(
		'clay active:clay-inset transition-all hover:shadow-none',
		'px-4 py-2',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{@render children?.()}
</AlertDialog.Trigger>
