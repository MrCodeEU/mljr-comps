<script lang="ts">
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		variant = 'primary',
		open = $bindable(false),
		delayDuration = 200,
		sideOffset = 4,
		children,
		trigger
	}: {
		variant?: Variant;
		open?: boolean;
		delayDuration?: number;
		sideOffset?: number;
		children?: Snippet;
		trigger: Snippet;
	} = $props();

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

<Tooltip.Provider>
	<Tooltip.Root bind:open {delayDuration}>
		<Tooltip.Trigger>
			{@render trigger()}
		</Tooltip.Trigger>
		<Tooltip.Content
			{sideOffset}
			class={cn(
				'clay z-50 rounded-lg px-3 py-1.5 text-sm',
				'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
				'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
				variantClasses[variant as keyof typeof variantClasses]
			)}
		>
			{@render children?.()}
			<Tooltip.Arrow />
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
