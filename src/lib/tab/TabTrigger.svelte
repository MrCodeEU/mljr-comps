<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		value,
		variant = 'primary',
		class: className = '',
		children
	}: {
		value: string;
		variant?: Variant;
		class?: string;
		children?: Snippet;
	} = $props();

	// Map variants to Tailwind classes
	const variantClasses = {
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		text: 'bg-transparent text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};
</script>

<Tabs.Trigger
	{value}
	class={cn(
		'ms-1 mt-1 px-5 py-2 transition-all',
		'clay hover:shadow-none',
		'data-[state=active]:clay-inset',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{@render children?.()}
</Tabs.Trigger>
