<script lang="ts">
	import { ScrollArea, type WithoutChild } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	type ScrollAreaType = 'hover' | 'scroll' | 'auto' | 'always';

	type Props = WithoutChild<ScrollArea.RootProps> & {
		type?: ScrollAreaType;
		variant?: Variant;
		orientation?: 'vertical' | 'horizontal' | 'both';
		scrollHideDelay?: number;
		viewportClass?: string;
		class?: string;
		children?: Snippet;
	};

	let {
		type = 'hover',
		variant = 'primary',
		orientation = 'vertical',
		scrollHideDelay = 600,
		viewportClass = '',
		class: className = '',
		children,
		...restProps
	}: Props = $props();

	const variantBg = {
		primary: 'bg-primary/10',
		secondary: 'bg-secondary/10',
		tertiary: 'bg-tertiary/10',
		accent: 'bg-accent/10',
		muted: 'bg-neutral/10',
		error: 'bg-error/10',
		success: 'bg-success/10',
		warning: 'bg-warning/10',
		info: 'bg-info/10'
	};

	const variantThumb = {
		primary: 'bg-primary clay',
		secondary: 'bg-secondary clay',
		tertiary: 'bg-tertiary clay',
		accent: 'bg-accent clay',
		muted: 'bg-neutral clay',
		error: 'bg-error clay',
		success: 'bg-success clay',
		warning: 'bg-warning clay',
		info: 'bg-info clay'
	};
</script>

{#snippet Scrollbar({ orientation }: { orientation: 'vertical' | 'horizontal' })}
	<ScrollArea.Scrollbar
		{orientation}
		class={cn(
			orientation === 'vertical'
				? 'flex w-3 touch-none p-[1px] transition-all duration-200 select-none hover:w-4'
				: 'flex h-3 touch-none p-[1px] transition-all duration-200 select-none hover:h-4',
			'clay-inset rounded-full',
			variantBg[variant as keyof typeof variantBg],
			'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
			'data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0'
		)}
	>
		<ScrollArea.Thumb
			class={cn(
				'clay flex-1 rounded-full transition-colors duration-200',
				variantThumb[variant as keyof typeof variantThumb]
			)}
		/>
	</ScrollArea.Scrollbar>
{/snippet}

<ScrollArea.Root
	{type}
	{scrollHideDelay}
	{...restProps}
	class={cn(
		'clay-inset relative overflow-hidden rounded-[10px]', // Added overflow-hidden
		variantBg[variant as keyof typeof variantBg],
		className
	)}
>
	<ScrollArea.Viewport
		class={cn(
			'h-full w-full', // Removed p-4
			viewportClass
		)}
	>
		<div class="p-4">
			<!-- Moved padding to wrapper -->
			{@render children?.()}
		</div>
	</ScrollArea.Viewport>

	{#if orientation === 'vertical' || orientation === 'both'}
		{@render Scrollbar({ orientation: 'vertical' })}
	{/if}
	{#if orientation === 'horizontal' || orientation === 'both'}
		{@render Scrollbar({ orientation: 'horizontal' })}
	{/if}

	<ScrollArea.Corner />
</ScrollArea.Root>
