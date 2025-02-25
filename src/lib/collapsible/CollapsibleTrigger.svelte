<script lang="ts">
	import { Collapsible } from 'bits-ui';
	import Icon from '@iconify/svelte';
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

<Collapsible.Trigger
	class={cn(
		'flex w-full items-center justify-between p-4',
		'clay transition-all hover:shadow-none',
		'data-[state=open]:clay-inset',
		'[&>span:last-child]:transition-transform [&[data-state=open]>span:last-child]:rotate-180',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	<span class="flex-1">
		{@render children?.()}
	</span>
	<span class="flex items-center justify-center">
		<Icon icon="iconamoon:arrow-down-2-duotone" height="auto" />
	</span>
</Collapsible.Trigger>
