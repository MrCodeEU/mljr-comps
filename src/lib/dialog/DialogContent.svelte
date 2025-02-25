<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import { fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		showCloseButton = true,
		preventScroll = true,
		class: className = '',
		children
	} = $props<{
		variant?: Variant;
		showCloseButton?: boolean;
		preventScroll?: boolean;
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

<Dialog.Content
	forceMount
	{preventScroll}
	class={cn(
		'fixed top-[50%] left-[50%] z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
		'clay p-6',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{#snippet child({ props, open: isOpen })}
		{#if isOpen}
			<div {...props} transition:fly={{ duration: 200, y: 20 }}>
				{@render children?.()}
				{#if showCloseButton}
					<Dialog.Close
						class="absolute top-4 right-4 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
					>
						<Icon icon="mdi:close" class="size-5" />
					</Dialog.Close>
				{/if}
			</div>
		{/if}
	{/snippet}
</Dialog.Content>
