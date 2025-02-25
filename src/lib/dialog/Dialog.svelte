<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import { fade } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		variant = 'primary',
		triggerText = 'Open',
		closeOnEscape = true,
		closeOnOutsideClick = true,
		class: className = '',
		children
	} = $props<{
		open?: boolean;
		variant?: Variant;
		triggerText?: string;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
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

<Dialog.Root bind:open>
	<Dialog.Trigger
		class={cn(
			'clay  p-3 transition-all',
			'active:clay-inset hover:translate-y-0.5 hover:shadow-none',
			variantClasses[variant as keyof typeof variantClasses],
			className
		)}
	>
		{triggerText}
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay forceMount class="fixed inset-0 z-50">
			{#snippet child({ props, open: isOpen })}
				{#if isOpen}
					<div
						{...props}
						transition:fade={{ duration: 200 }}
						class="h-full w-full bg-black/50 backdrop-blur-sm"
					></div>
				{/if}
			{/snippet}
		</Dialog.Overlay>

		{@render children?.()}
	</Dialog.Portal>
</Dialog.Root>
