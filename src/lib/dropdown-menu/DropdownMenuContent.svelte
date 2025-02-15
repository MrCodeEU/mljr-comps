<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import { fade, fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		sideOffset = 8,
		variant = 'primary',
		class: className = '',
		children
	} = $props<{
		sideOffset?: number;
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}>();

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

<DropdownMenu.Content
	{sideOffset}
	class={cn(
		'clay z-50 min-w-[12rem] p-2',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
	forceMount
>
	{#snippet child({ wrapperProps, props, open })}
		{#if open}
			<div {...wrapperProps}>
				<div {...props} transition:fly={{ duration: 150, y: 5 }}>
					{@render children?.()}
				</div>
			</div>
		{/if}
	{/snippet}
</DropdownMenu.Content>
